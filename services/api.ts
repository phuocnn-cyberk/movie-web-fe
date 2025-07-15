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

export { api };