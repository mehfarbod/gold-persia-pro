// ─── Product ───────────────────────────────────────────
export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  weight: number; // grams
  purity: number; // e.g. 18, 24
  makingCharge: number; // percent or fixed amount in Toman
  makingChargeType: "percent" | "fixed";
  profitPercentage: number;
  taxPercentage: number;
  goldPriceAtCreation: number;
  finalPrice: number;
  stock: number;
  sku: string;
  isNew: boolean;
  isFeatured: boolean;
  availability: "in_stock" | "out_of_stock" | "pre_order";
  createdAt: string;
  updatedAt: string;
}

// ─── Category ──────────────────────────────────────────
export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

// ─── Gold Price ────────────────────────────────────────
export interface GoldPrice {
  id: string;
  gold18K: number; // price per gram in Toman
  gold24K: number;
  gramPrice: number;
  change: number; // percentage change
  changeAmount: number; // absolute change
  currency: string;
  updatedAt: string;
}

// ─── Cart ──────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
  priceAtAddition: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// ─── User ──────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  title: string;
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  isDefault: boolean;
}

// ─── Order ─────────────────────────────────────────────
export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed" | "refunded";

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  weight: number;
  quantity: number;
  priceAtPurchase: number;
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentRef?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Payment ───────────────────────────────────────────
export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message: string;
}

export interface PaymentProvider {
  createPayment(amount: number, orderId: string, callbackUrl: string): Promise<PaymentResult>;
  verifyPayment(transactionId: string): Promise<PaymentResult>;
}

// ─── Wishlist ──────────────────────────────────────────
export interface WishlistItem {
  productId: string;
  addedAt: string;
}
