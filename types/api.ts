export interface User {
  userID?: number;
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  role?: string;
}

export interface Payment {
  paymentId: number;
  planId: number;
  amount: number;
  paymentStatus: string;
  paidAt: string;
}

export interface Support {
  supportID: number;
  message: string;
  createdAt: string;
  response?: string;
}
