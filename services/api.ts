import { useAuthStore } from "@/stores/auth.store";
import {
  CreatePaypalOrderData,
  SignInData,
  SignUpData,
  SendSupportData,
  PaypalOrderResponse,
  UpdateUserData,
  ChangePasswordData,
  UploadAvatarResponse,
  PaymentHistory,
  Notification,
  Favorite,
  PricingPlansResponse,
  MovieDTO,
  GenreDTO,
  RatingRequest,
  Rating
} from "@/types/api";
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
  (error) => Promise.reject(error)
);

// ===================== AUTH =====================
export const signIn = async (data: SignInData) => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};

export const signUp = async (data: SignUpData) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

export const updateProfile = async (
  data: UpdateUserData
): Promise<UpdateUserData> => {
  const response = await api.put("/api/auth/update-profile", data);
  return response.data;
};

export const changePassword = async (
  data: ChangePasswordData
): Promise<ChangePasswordData> => {
  const response = await api.put("/api/user/change-password", data);
  return response.data;
};

export const uploadAvatar = async (
  file: File
): Promise<UploadAvatarResponse> => {
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
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Upload avatar error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Upload avatar failed"
    );
  }
};

// ===================== SUPPORT =====================
export const sendSupport = async (data: SendSupportData) => {
  const authState = useAuthStore.getState();
  const userId = authState.user?.userID;

  const response = await api.post("/api/supports/send", {
    ...data,
    userId: userId ? userId.toString() : null,
  });

  return response.data;
};

export const getSupportsByUser = async (userId: number) => {
  const response = await api.get(`/api/supports/user/${userId}`);
  return response.data;
};

// ===================== PAYPAL =====================
export const createPaypalOrder = async (
  data: CreatePaypalOrderData
): Promise<PaypalOrderResponse> => {
  try {
    console.log("[FE] createPaypalOrder -> payload:", data);
    const response = await api.post("/api/paypal/create-order", data);
    console.log("[FE] createPaypalOrder -> raw response.data:", response.data);

    if (typeof response.data === "string") {
      console.log(
        "[FE] createPaypalOrder -> normalized string response to object with approvalUrl"
      );
      return {
        orderId: "temp-order-id",
        approvalUrl: response.data,
        status: "created",
      };
    }

    return response.data;
  } catch (error: any) {
    console.error("[FE] createPaypalOrder -> error:", {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
    });
    throw error;
  }
};

// ===================== MOVIES =====================
export const getAllMovies = async (): Promise<MovieDTO[]> => {
  const response = await api.get("/api/movies");
  return response.data;
};

export const getAllGenres = async (): Promise<GenreDTO[]> => {
  const response = await api.get("/api/genres");
  return response.data;
};

export const getMovieById = async (id: string | number): Promise<MovieDTO> => {
  const res = await api.get(`/api/movies/${id}`);
  return res.data;
};

export const playMovie = async (id: string | number) => {
  try {
    const res = await api.get(`/api/movies/video/${id}`, {
      responseType: "blob", // 👈 để nhận stream video dạng blob
    });

    // Tạo URL object cho video
    const videoUrl = URL.createObjectURL(res.data);

    console.log("[FE] playMovie -> created video URL:", videoUrl);

    return videoUrl;
  } catch (err: any) {
    console.error("[FE] playMovie -> error:", {
      status: err?.response?.status,
      data: err?.response?.data,
    });
    throw err;
  }
};



// ===================== RATINGS =====================
export const getRatingsByMovie = async (movieId: string | number): Promise<Rating[]> => {
  const res = await api.get(`/ratings/${movieId}`);
  return res.data;
};

export const addRating = async (payload: RatingRequest): Promise<Rating> => {
  const res = await api.post(`/ratings`, payload);
  return res.data;
};
// ===================== OTHER =====================
export const getPaymentsByUser = async (): Promise<PaymentHistory[]> => {
  const response = await api.get(`/api/payments/me`);
  return response.data;
};

export const getNotifications = async (
  userId: number
): Promise<Notification[]> => {
  const response = await api.get(`/notifications/${userId}`);
  return response.data;
};

export const markNotificationAsRead = async (notificationId: number) => {
  const response = await api.put(`/notifications/${notificationId}/read`);
  return response.data;
};

export const getFavorites = async (userId: number): Promise<Favorite[]> => {
  const response = await api.get(`/favorites/${userId}`);
  return response.data;
};

export const getPricingPlans = async (): Promise<PricingPlansResponse> => {
  const response = await api.get(`/api/plans/pricing`);
  return response.data;
};


export { api };
