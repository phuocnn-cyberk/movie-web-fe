  // types/api.ts

  // ===== User & Auth =====
  export interface User {
  userID: number;   // 👈 giống DB & BE
  id?: string | number;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  avatar?: string | null;
  phone?: string | null;
  password?: string | null;
  resetToken?: string | null;
}
export interface User {
  userID: number;   // 👈 giống DB & BE
  name?: string | null;
  email?: string | null;
  role?: string | null;
  avatar?: string | null;
  phone?: string | null;
  password?: string | null;
  resetToken?: string | null;
}


  export interface SignInData {
    email: string;
    password: string;
  }

  export interface SignUpData {
    name: string;
    email: string;
    password: string;
  }

  export interface UpdateUserData {
    name?: string;
    phone?: string;
  }

  export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
  }

  export interface UploadAvatarResponse {
    success: boolean;
    message: string;
    avatarUrl?: string;
  }

  // ===== Support =====
  export interface SupportData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
    createdAt: string;
    response: string | null;
    supportID: number;
  }

  export interface SendSupportData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
  }

  // ===== Payment & Plans =====
  export interface CreatePaypalOrderData {
    userId: number;
    paymentMethod: string;
    pricingId: string;
  }

  export interface PaypalOrderResponse {
    orderId: string;
    approvalUrl: string;
    status: string;
    token?: string;
  }

  export interface PaymentHistory {
    paidAt: string;
    pricingId: string;
    amount: number;
    paymentStatus: string;
  }

  export interface PricingPlan {
    id: string;
    title: string;
    description: string;
    price: string;
    period?: string;
    comingSoon?: boolean;
  }

  export interface PricingPlansResponse {
    monthly: PricingPlan[];
    yearly: PricingPlan[];
  }

  // ===== Notifications & Favorites =====
  export interface Notification {
    notificationId: number;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
  }

  export interface Favorite {
    favoriteId: number;
    movieId: number;
    userId: number;
  }

  // ===== Movie & Genre =====
  export interface GenreDTO {
    genreID: number;
    name: string;
  }

  export interface MovieDTO {
  movieID: number;
  title: string;
  description: string;
  duration: number | null;
  year: number | null;
  poster: string;
  accessLevel: string;
  trailerURL: string;
  videoURL: string;
  genres: GenreDTO[];
  averageRating?: number;
  // 👇 thêm alias cho FE
  streamUrl?: string;
}


  // Rating (Review)
  export interface Rating {
    ratingId: number;
    userId: number;
    movieId: number;
    rating: number; // 1-5 stars
    comment: string;
    createdAt: string;
  }

  export interface RatingRequest {
    userId: number;
    movieId: number;
    rating: number;
    comment: string;
  }