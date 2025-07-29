import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
});

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
  // Giả sử userId được lưu trong localStorage
  const userId = localStorage.getItem("userId");

  const response = await api.post("/api/supports/send", {
    ...data,
    userId: userId ? parseInt(userId) : null,
  });

  return response.data;
};


export { api };