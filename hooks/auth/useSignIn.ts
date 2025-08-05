import { useMutation } from "@tanstack/react-query";
import { signIn, getProfile } from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";
import { SignInData } from "@/types/api";

export const useSignIn = () => {
  const { actions } = useAuthStore();

  return useMutation({
    mutationFn: (data: SignInData) => signIn(data),
    onSuccess: async (data) => {
      // Lưu token vào store
      const accessToken = data.token;
      actions.setTokens({ accessToken });

      try {
        // Lấy thông tin user thực tế
        const userData = await getProfile();
        actions.setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    },
    onError: (error) => {
      console.error("Sign in failed:", error);
    },
  });
};
