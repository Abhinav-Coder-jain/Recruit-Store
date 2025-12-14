import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';

// --- API FUNCTIONS ---
const fetchReviewsFn = async (productId) => {
  const q = query(collection(db, "reviews"), where("productId", "==", productId));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Sort by newest
  return data.sort((a, b) => {
    const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.clientDate);
    const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.clientDate);
    return dateB - dateA;
  });
};

const postReviewFn = async ({ productId, user, rating, comment }) => {
  const newReview = {
    productId,
    userId: user.uid,
    userName: user.displayName || "Anonymous",
    rating,
    comment,
    createdAt: serverTimestamp(),
    clientDate: new Date().toLocaleDateString()
  };
  return await addDoc(collection(db, "reviews"), newReview);
};

// --- CUSTOM HOOK ---
export const useProductReviews = (productId, user) => {
  const queryClient = useQueryClient();

  // 1. GET Reviews (Auto-runs and caches)
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => fetchReviewsFn(productId),
    enabled: !!productId, // Only run if ID exists
  });

  // 2. POST Review (Mutation)
  const mutation = useMutation({
    mutationFn: postReviewFn,
    onSuccess: () => {
      toast.success("Review posted successfully!");
      // Automatically refresh the reviews list without reloading page
      queryClient.invalidateQueries(['reviews', productId]);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to post review");
    }
  });

  // Helper: Has current user reviewed?
  const userHasReviewed = user && reviews.some(r => r.userId === user.uid);

  return { 
    reviews, 
    isLoadingReviews: isLoading, 
    submitReview: mutation.mutateAsync, // Expose mutate as submit function
    isSubmitting: mutation.isPending,
    userHasReviewed
  };
};