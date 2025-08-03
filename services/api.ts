import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
});

// Add request interceptor to automatically add auth token
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

export const signIn = async (email: string, password: string) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
};

export const signUp = async (name: string, email: string, password: string) => {
  const response = await api.post("/api/auth/register", { name, email, password });
  return response.data;
};

export const sendSupport = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}) => {
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

export { api };