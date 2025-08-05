import { useMutation } from "@tanstack/react-query";

import { signIn, getCurrentUser } from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";
import { SignInData } from "@/types/api";

export const useSignIn = () => {
  const { actions } = useAuthStore();

  return useMutation({
    mutationFn: (data: SignInData) => signIn(data),
    onSuccess: async (data) => {
      const accessToken = data.token;
      actions.setTokens({ accessToken });

      try {
        const userData = await getCurrentUser();
        const user = {
          id: userData.userID?.toString() || userData.userID,
          userID: userData.userID,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          avatar: userData.avatar,
          phone: userData.phone,
        };
        actions.setUser(user);
      } catch (error) {
        console.error("Failed to get user data:", error);
        // Nếu không lấy được user data, vẫn set token nhưng không set user
        // User sẽ được lấy khi cần thiết
      }
    },
  });
};