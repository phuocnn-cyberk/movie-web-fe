import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { signIn } from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";
import { SignInData } from "@/types/api";

export const useSignIn = () => {
  const { actions } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignInData) => signIn(data),
    onSuccess: async (data) => {
      const accessToken = data.token;
      actions.setTokens({ accessToken });

      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      await queryClient.refetchQueries({ queryKey: ["currentUser"] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Sign in failed. Please check your credentials.";
      toast.error(message);
    },
  });
};