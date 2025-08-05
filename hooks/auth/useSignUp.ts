import { signUp } from "@/services/api";
import { SignUpData } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpData) => signUp(data),
  });
};