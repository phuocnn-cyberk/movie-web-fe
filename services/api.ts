// src/services/api.ts
import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

// ================== Cấu hình Axios ==================
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
});

// Interceptor: Tự động gắn token cho mọi request
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================== AUTH ==================
export const signIn = async (email: string, password: string) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
};

export const signUp = async (name: string, email: string, password: string) => {
  const response = await api.post("/api/auth/register", { name, email, password });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

export const updateProfile = async (data: { name: string; phone?: string }) => {
  const response = await api.put("/api/auth/update-profile", data);
  return response.data;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const response = await api.put("/api/auth/upload-avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (response.data?.avatar && !response.data.avatar.startsWith("http")) {
    response.data.avatar = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/uploads/avatars/${response.data.avatar}`;
  }
  return response.data;
};

export const changePassword = async (data: { oldPassword: string; newPassword: string }) => {
  const response = await api.put("/api/user/change-password", data);
  return response.data;
};

// ================== PAYMENT ==================
export const getMyPayments = async () => {
  const response = await api.get("/api/payments/me");
  return response.data;
};

export const createPaypalOrder = async (planId: number, userId: number, paymentMethod: string) => {
  const response = await api.post("/api/paypal/create-order", {
    planId,
    userId,
    paymentMethod,
  });
  return response.data;
};

// ================== SUPPORT ==================
export const getSupportsByUser = async (userId: number) => {
  const response = await api.get(`/api/supports/user/${userId}`);
  return response.data;
};

export const sendSupport = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}) => {
  const userId = useAuthStore.getState().user?.userID || null;
  const response = await api.post("/api/supports/send", { ...data, userId });
  return response.data;
};

// ================== FAVORITE ==================
export const getFavorites = async (userId: number) => {
  const response = await api.get(`/favorites/${userId}`);
  return response.data || [];
};

export const addFavorite = async (userId: number, movieId: number) => {
  const response = await api.post(`/favorites`, null, {
    params: { userId, movieId },
  });
  return response.data;
};

export const removeFavorite = async (userId: number, movieId: number) => {
  const response = await api.delete(`/favorites`, {
    params: { userId, movieId },
  });
  return response.data;
};

// ================== HISTORY ==================
export const getMyWatchHistory = async () => {
  const response = await api.get(`/api/history/my`);
  return response.data || [];
};

// ================== NOTIFICATIONS ==================
export interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const getNotifications = async (userId: number) => {
  const response = await api.get<Notification[]>(`/notifications/${userId}`);
  return response.data;
};

export const markNotificationAsRead = async (id: number) => {
  await api.put(`/notifications/${id}/read`);
};

export { api };
