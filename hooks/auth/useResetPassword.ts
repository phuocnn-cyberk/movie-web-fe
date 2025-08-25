import { resetPassword } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: any) => resetPassword(data),
  });
};
