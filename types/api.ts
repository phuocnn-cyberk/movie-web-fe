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
}

export interface CreatePaypalOrderData {
  planId: number;
  userId: number;
  paymentMethod: string;
}

export interface PaypalOrderResponse {
  orderId: string;
  approvalUrl: string;
  status: string;
  token?: string;
}

export interface PaypalPaymentData {
  token: string;
  transactionRef: string;
}

export interface PaypalPaymentResponse {
  success: boolean;
  message: string;
  orderId?: string;
}