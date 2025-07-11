import { apiRequest } from "./queryClient";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = {
  // Categories
  getCategories: async () => {
    const response = await apiRequest("GET", "/api/categories");
    return response.json();
  },

  getCategory: async (id: number) => {
    const response = await apiRequest("GET", `/api/categories/${id}`);
    return response.json();
  },

  // Products
  getProducts: async (params?: { category?: number; featured?: boolean }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append("category", params.category.toString());
    if (params?.featured) searchParams.append("featured", "true");
    
    const response = await apiRequest("GET", `/api/products?${searchParams}`);
    return response.json();
  },

  getProduct: async (id: number) => {
    const response = await apiRequest("GET", `/api/products/${id}`);
    return response.json();
  },

  getProductReviews: async (productId: number) => {
    const response = await apiRequest("GET", `/api/products/${productId}/reviews`);
    return response.json();
  },

  createProductReview: async (productId: number, review: { rating: number; comment: string; userId: number }) => {
    const response = await apiRequest("POST", `/api/products/${productId}/reviews`, review);
    return response.json();
  },

  // Authentication
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiRequest("POST", "/api/auth/login", credentials);
    return response.json();
  },

  register: async (userData: { 
    username: string; 
    email: string; 
    password: string; 
    firstName?: string; 
    lastName?: string; 
  }) => {
    const response = await apiRequest("POST", "/api/auth/register", userData);
    return response.json();
  },

  // Cart
  getCartItems: async (userId: number) => {
    const response = await apiRequest("GET", `/api/cart/${userId}`);
    return response.json();
  },

  addToCart: async (item: { userId: number; productId: number; quantity: number; customization?: any }) => {
    const response = await apiRequest("POST", "/api/cart", item);
    return response.json();
  },

  updateCartItem: async (id: number, quantity: number) => {
    const response = await apiRequest("PUT", `/api/cart/${id}`, { quantity });
    return response.json();
  },

  removeFromCart: async (id: number) => {
    const response = await apiRequest("DELETE", `/api/cart/${id}`);
    return response.json();
  },

  // Orders
  getOrders: async (userId: number) => {
    const response = await apiRequest("GET", `/api/orders/${userId}`);
    return response.json();
  },

  createOrder: async (order: {
    userId: number;
    status: string;
    totalAmount: string;
    shippingAddress: any;
    orderItems: any;
  }) => {
    const response = await apiRequest("POST", "/api/orders", order);
    return response.json();
  },

  // Community
  getCommunityPosts: async () => {
    const response = await apiRequest("GET", "/api/community/posts");
    return response.json();
  },

  createCommunityPost: async (post: {
    userId: number;
    title: string;
    description?: string;
    imageUrl: string;
    productId?: number;
  }) => {
    const response = await apiRequest("POST", "/api/community/posts", post);
    return response.json();
  },

  likeCommunityPost: async (id: number) => {
    const response = await apiRequest("POST", `/api/community/posts/${id}/like`);
    return response.json();
  },

  getCommunityComments: async (postId: number) => {
    const response = await apiRequest("GET", `/api/community/posts/${postId}/comments`);
    return response.json();
  },

  createCommunityComment: async (postId: number, comment: {
    userId: number;
    comment: string;
  }) => {
    const response = await apiRequest("POST", `/api/community/posts/${postId}/comments`, comment);
    return response.json();
  },
};
