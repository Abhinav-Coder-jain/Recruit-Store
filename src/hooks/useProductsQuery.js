import { useQuery } from '@tanstack/react-query';
import { getFilteredProducts } from '../utils/productData';

export const useProductsQuery = ({ searchTerm, category, filters, page }) => {
  return useQuery({
    queryKey: ['products', searchTerm, category, filters.maxPrice, filters.minRating, page],
    queryFn: () => getFilteredProducts({
      search: searchTerm,
      category: category,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
      page: page 
    }),
    keepPreviousData: true 
  });
};