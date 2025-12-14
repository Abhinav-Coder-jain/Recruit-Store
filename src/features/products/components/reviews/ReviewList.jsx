
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
        <p className="text-slate-400 dark:text-slate-500 font-medium">
          No reviews yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((rev) => (
        <ReviewItem key={rev.id} review={rev} />
      ))}
    </div>
  );
};

export default ReviewList;