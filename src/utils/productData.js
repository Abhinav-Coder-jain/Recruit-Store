import productData from '../assets/Product_Data_Final.json';

// Simulate an API call behavior (Async/Await ready)
// We return Promises to maintain professional architecture compatible with Loaders/React Query.



const CATEGORY_MAPPING = {
  1: "Mobile",
  2: "Electronics",
  3: "Men's Clothing",
  4: "Women's Clothing",
  5: "Home Decor",
  6: "Books",
  7: "Sports",
  8: "Beauty",
  9: "Fitness",
  10: "Toys",
  11: "Jewelry",
  12: "Automotive",
  13: "Pet Supplies",
  14: "Groceries",
  15: "Office Supplies",
  16: "Garden",
  17: "Music",
  18: "Video Games",
  19: "Health",
  20: "Footwear"
};

// ... existing getProduct functions ...


// 3. Helper to get ID from Name (if needed for filtering later)
export const getCategoryIdByName = (name) => {
  return Object.keys(CATEGORY_MAPPING).find(key => CATEGORY_MAPPING[key] === name);
};

export const getAllProducts = async () => {
  return productData;
};

export const getProductById = async (id) => {
  // Ensure we compare strings/numbers correctly
  const product = productData.find((item) => item.id.toString() === id.toString());
  if (!product) throw new Error(`Product with ID ${id} not found`);
  return product;
};

export const getProductsByCategory = async (categoryName) => {
  // Case-insensitive comparison for robustness
  return productData.filter(
    (item) => item.category.toLowerCase() === categoryName.toLowerCase()
  );
};

export const searchProducts = async (query) => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  
  return productData.filter((item) => 
    item.title.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.category.toLowerCase().includes(lowerQuery)
  );
};

export const getAllCategories =async () => {
  return ["All", ...Object.values(CATEGORY_MAPPING)];
};

// Helper for pagination (standard practice for frontend filtering)
export const getPaginatedProducts = async (products, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return {
    data: products.slice(startIndex, endIndex),
    total: products.length,
    totalPages: Math.ceil(products.length / limit),
    currentPage: page
  };
};
export const getFilteredProducts = async ({ 
  search = "", 
  category = "All", 
  maxPrice = 10000, 
  minRating = 0,
  page = 1 
}) => {
  let results = productData;

  // Search Logic
  if (search) {
    const lowerQuery = search.toLowerCase().replace(/\s+/g, "");
    results = results.filter((item) => 
      item.title.toLowerCase().replace(/\s+/g, "").includes(lowerQuery) ||
      item.description.toLowerCase().replace(/\s+/g, "").includes(lowerQuery) ||
      item.category.toLowerCase().replace(/\s+/g, "").includes(lowerQuery)
    );
  }

  // Category Logic
  if (category !== "All") {
    results = results.filter((item) => item.category === category);
  }

  // Price & Rating
  results = results.filter((item) => item.price <= maxPrice);
  if (minRating > 0) {
    results = results.filter((item) => item.rating >= minRating);
  }

  // REUSE THE HELPER (Standardizing response format)
  return getPaginatedProducts(results, page, 9);
};