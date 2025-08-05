import { useAuthStore } from "@/stores/auth.store";
import { CreatePaypalOrderData, SignInData, SignUpData, SupportData, PaypalOrderResponse, PaypalPaymentData, PaypalPaymentResponse } from "@/types/api";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const authState = useAuthStore.getState();
    if (authState.accessToken) {
      config.headers.Authorization = `Bearer ${authState.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signIn = async (data: SignInData) => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};

export const signUp = async (data: SignUpData) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

export const sendSupport = async (data: SupportData) => {
  const authState = useAuthStore.getState();
  const userId = authState.user?.userID;

  const response = await api.post("/api/supports/send", {
    ...data,
    userId: userId ? userId.toString() : null,
  });

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

export const createPaypalOrder = async (data: CreatePaypalOrderData): Promise<PaypalOrderResponse> => {
  try {
    const response = await api.post("/api/paypal/create-order", data);
    
    if (typeof response.data === 'string') {
      return {
        orderId: 'temp-order-id',
        approvalUrl: response.data,
        status: 'created'
      };
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { api };