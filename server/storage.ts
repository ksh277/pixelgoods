import { 
  users, categories, products, productReviews, cartItems, orders, communityPosts, communityComments,
  type User, type InsertUser, type Category, type InsertCategory, type Product, type InsertProduct,
  type ProductReview, type InsertProductReview, type CartItem, type InsertCartItem,
  type Order, type InsertOrder, type CommunityPost, type InsertCommunityPost,
  type CommunityComment, type InsertCommunityComment
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Review methods
  getProductReviews(productId: number): Promise<ProductReview[]>;
  createProductReview(review: InsertProductReview): Promise<ProductReview>;
  
  // Cart methods
  getCartItems(userId: number): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(userId: number): Promise<boolean>;
  
  // Order methods
  getOrders(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Community methods
  getCommunityPosts(): Promise<CommunityPost[]>;
  getCommunityPost(id: number): Promise<CommunityPost | undefined>;
  createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost>;
  likeCommunityPost(id: number): Promise<CommunityPost | undefined>;
  getCommunityComments(postId: number): Promise<CommunityComment[]>;
  createCommunityComment(comment: InsertCommunityComment): Promise<CommunityComment>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private productReviews: Map<number, ProductReview>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private communityPosts: Map<number, CommunityPost>;
  private communityComments: Map<number, CommunityComment>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.productReviews = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.communityPosts = new Map();
    this.communityComments = new Map();
    this.currentId = 1;
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoriesData = [
      { id: 1, name: "T-Shirts", nameKo: "티셔츠", description: "Custom printed t-shirts", descriptionKo: "커스텀 프린팅 티셔츠", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", isActive: true },
      { id: 2, name: "Mugs", nameKo: "머그컵", description: "Custom printed mugs", descriptionKo: "커스텀 프린팅 머그컵", imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400", isActive: true },
      { id: 3, name: "Stickers", nameKo: "스티커", description: "Custom stickers", descriptionKo: "커스텀 스티커", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", isActive: true },
      { id: 4, name: "Acrylic Keychains", nameKo: "아크릴 키링", description: "Custom acrylic keychains", descriptionKo: "커스텀 아크릴 키링", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", isActive: true },
      { id: 5, name: "Phone Cases", nameKo: "폰케이스", description: "Custom phone cases", descriptionKo: "커스텀 폰케이스", imageUrl: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400", isActive: true },
      { id: 6, name: "Tote Bags", nameKo: "에코백", description: "Custom tote bags", descriptionKo: "커스텀 에코백", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", isActive: true },
    ];

    categoriesData.forEach(cat => {
      this.categories.set(cat.id, cat as Category);
    });

    // Initialize products
    const productsData = [
      { id: 1, name: "Acrylic Keychain", nameKo: "아크릴 키링", description: "High-quality acrylic keychain", descriptionKo: "고품질 아크릴 키링", basePrice: "8900", categoryId: 4, imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", isActive: true, isFeatured: true, customizationOptions: { sizes: ["Small", "Medium"], colors: ["Clear", "White"] }, createdAt: new Date() },
      { id: 2, name: "Custom Phone Case", nameKo: "커스텀 폰케이스", description: "Personalized phone case", descriptionKo: "개인화된 폰케이스", basePrice: "15900", categoryId: 5, imageUrl: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400", isActive: true, isFeatured: true, customizationOptions: { sizes: ["iPhone 14", "iPhone 15", "Galaxy S23"], colors: ["Clear", "Black", "White"] }, createdAt: new Date() },
      { id: 3, name: "Custom Tote Bag", nameKo: "커스텀 에코백", description: "Eco-friendly tote bag", descriptionKo: "친환경 에코백", basePrice: "12900", categoryId: 6, imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", isActive: true, isFeatured: true, customizationOptions: { sizes: ["Small", "Large"], colors: ["Natural", "Black", "Navy"] }, createdAt: new Date() },
      { id: 4, name: "Custom Pin Badge", nameKo: "커스텀 뱃지", description: "Custom pin badge", descriptionKo: "커스텀 뱃지", basePrice: "3900", categoryId: 3, imageUrl: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=400", isActive: true, isFeatured: true, customizationOptions: { sizes: ["25mm", "32mm"], colors: ["Any"] }, createdAt: new Date() },
      { id: 5, name: "Custom Tumbler", nameKo: "커스텀 텀블러", description: "Insulated tumbler", descriptionKo: "보온 텀블러", basePrice: "18900", categoryId: 2, imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400", isActive: true, isFeatured: true, customizationOptions: { sizes: ["350ml", "500ml"], colors: ["White", "Black", "Silver"] }, createdAt: new Date() },
      { id: 6, name: "Custom Notebook", nameKo: "커스텀 노트북", description: "Custom printed notebook", descriptionKo: "커스텀 프린팅 노트북", basePrice: "11900", categoryId: 3, imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400", isActive: true, isFeatured: true, customizationOptions: { sizes: ["A5", "A4"], colors: ["Any"] }, createdAt: new Date() },
    ];

    productsData.forEach(prod => {
      this.products.set(prod.id, prod as Product);
    });

    this.currentId = 10;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      isAdmin: false,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).filter(cat => cat.isActive);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(prod => prod.isActive);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(prod => prod.categoryId === categoryId && prod.isActive);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(prod => prod.isFeatured && prod.isActive);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentId++;
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  // Review methods
  async getProductReviews(productId: number): Promise<ProductReview[]> {
    return Array.from(this.productReviews.values()).filter(review => review.productId === productId);
  }

  async createProductReview(insertReview: InsertProductReview): Promise<ProductReview> {
    const id = this.currentId++;
    const review: ProductReview = {
      ...insertReview,
      id,
      createdAt: new Date(),
    };
    this.productReviews.set(id, review);
    return review;
  }

  // Cart methods
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.userId === userId);
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentId++;
    const cartItem: CartItem = {
      ...insertCartItem,
      id,
      createdAt: new Date(),
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(userId: number): Promise<boolean> {
    const userItems = Array.from(this.cartItems.entries()).filter(([_, item]) => item.userId === userId);
    userItems.forEach(([id, _]) => this.cartItems.delete(id));
    return true;
  }

  // Order methods
  async getOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentId++;
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      order.status = status;
      this.orders.set(id, order);
      return order;
    }
    return undefined;
  }

  // Community methods
  async getCommunityPosts(): Promise<CommunityPost[]> {
    return Array.from(this.communityPosts.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getCommunityPost(id: number): Promise<CommunityPost | undefined> {
    return this.communityPosts.get(id);
  }

  async createCommunityPost(insertPost: InsertCommunityPost): Promise<CommunityPost> {
    const id = this.currentId++;
    const post: CommunityPost = {
      ...insertPost,
      id,
      likes: 0,
      createdAt: new Date(),
    };
    this.communityPosts.set(id, post);
    return post;
  }

  async likeCommunityPost(id: number): Promise<CommunityPost | undefined> {
    const post = this.communityPosts.get(id);
    if (post) {
      post.likes = (post.likes || 0) + 1;
      this.communityPosts.set(id, post);
      return post;
    }
    return undefined;
  }

  async getCommunityComments(postId: number): Promise<CommunityComment[]> {
    return Array.from(this.communityComments.values()).filter(comment => comment.postId === postId);
  }

  async createCommunityComment(insertComment: InsertCommunityComment): Promise<CommunityComment> {
    const id = this.currentId++;
    const comment: CommunityComment = {
      ...insertComment,
      id,
      createdAt: new Date(),
    };
    this.communityComments.set(id, comment);
    return comment;
  }
}

export const storage = new MemStorage();
