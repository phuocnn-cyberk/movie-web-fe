import { useMutation } from "@tanstack/react-query";

import { signIn } from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";

export const useSignIn = () => {
  const { actions } = useAuthStore();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => signIn(email, password),
    onSuccess: async (data, variables) => {
      const accessToken = data.token;
      actions.setTokens({ accessToken, refreshToken: data.refreshToken });

      if (data.user) {
        actions.setUser(data.user);
      } else {
        const fallbackUser = {
          id: "temp",
          email: variables.email,
          name: variables.email.split("@")[0], // Use email prefix as name
        };
        actions.setUser(fallbackUser);
      }
    },
  });
};