import { useAuthStore } from "@/stores/auth.store";
import { CreatePaypalOrderData, SignInData, SignUpData, SendSupportData, PaypalOrderResponse, UpdateUserData, ChangePasswordData, UploadAvatarResponse, PaymentHistory, Notification, Favorite, PricingPlansResponse, Movie, Genre } from "@/types/api";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
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

export const sendSupport = async (data: SendSupportData) => {
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
    const err: any = error;
    throw error;
  }
};

export const updateProfile = async (data: UpdateUserData): Promise<UpdateUserData> => {
  const response = await api.put("/api/auth/update-profile", data);
  return response.data;
};

export const changePassword = async (data: ChangePasswordData): Promise<ChangePasswordData> => {
  const response = await api.put("/api/user/change-password", data);
  return response.data;
};

export const getSupportsByUser = async (userId: number) => {
  const response = await api.get(`/api/supports/user/${userId}`);
  return response.data;
};

export const uploadAvatar = async (file: File): Promise<UploadAvatarResponse> => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);
    
    const uploadApi = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    });
    
    const authState = useAuthStore.getState();
    if (authState.accessToken) {
      uploadApi.defaults.headers.Authorization = `Bearer ${authState.accessToken}`;
    }
    
    const response = await uploadApi.put("/api/auth/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Upload avatar failed");
  }
};

export const getPaymentsByUser = async (): Promise<PaymentHistory[]> => {
  const response = await api.get(`/api/payments/me`);
  return response.data;
};

export const getNotifications = async (userId: number): Promise<Notification[]> => {
  const response = await api.get(`/notifications/${userId}`);
  return response.data;
};

export const markNotificationAsRead = async (notificationId: number) => {
  const response = await api.put(`/notifications/${notificationId}/read`);
  return response.data;
};

export const addFavorite = async (movieId: number, userId: number) => {
  const response = await api.post(`/favorites`, { movieId, userId });
  return response.data;
};

export const getFavorites = async (userId: number): Promise<Favorite[]> => {
  const response = await api.get(`/favorites/${userId}`);
  return response.data;
};

export const removeFavorite = async (movieId: number, userId: number) => {
  const response = await api.delete(`/favorites`, { data: { movieId, userId } });
  return response.data;
};

export const getPricingPlans = async (): Promise<PricingPlansResponse> => {
  const response = await api.get(`/api/plans/pricing`);
  return response.data;
};

export const getMovies = async (): Promise<Movie[]> => {
  const response = await api.get(`/api/movies`);
  return response.data;
};

export const getGenres = async (): Promise<Genre[]> => {
  const response = await api.get(`/api/genres`);
  return response.data;
};

export const getMovieById = async (movieId: number): Promise<Movie> => {
  const response = await api.get(`/api/movies/${movieId}`);
  return response.data;
};

export { api };