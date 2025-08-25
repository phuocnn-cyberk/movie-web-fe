import { signUp } from "@/services/api";
import { SignUpData } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpData) => signUp(data),
    onError: (error: any) => {
      const message = error.response?.data?.message || "Sign up failed. Please try again.";
      toast.error(message);
    },
  });
};