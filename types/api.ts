export interface User {
  userID?: number;
  id?: string | number;
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

export interface PaymentHistory {
  paidAt: string;
  pricingId: string;
  amount: number;
  paymentStatus: string;
}

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
export interface Movie {
  movieID: number;
  title: string;
  description: string;
  duration: number | null;
  year: number | null;
  poster: string;
  accessLevel: string;
  trailerURL: string;
  videoURL: string;
  genres: Genre[];
}

export interface Genre {
  genreID: number;
  name: string;
}