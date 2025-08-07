import { getNotifications } from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";

export const useNotification = () => {
  const { user } = useAuthStore();
  const userId = user?.userID || 0;

  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getNotifications(userId),
    enabled: !!userId,
  });

  return { data, isLoading, error, };
};