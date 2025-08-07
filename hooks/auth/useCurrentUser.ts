import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";

export const useCurrentUser = () => {
  const { user, actions, accessToken } = useAuthStore();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const userData = await getCurrentUser();
      const updatedUser = {
        id: userData.userID?.toString() || userData.userID,
        userID: userData.userID,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar,
        phone: userData.phone,
      };
      
      // Cập nhật user trong store
      actions.setUser(updatedUser);
      
      return updatedUser;
    },
    enabled: !!accessToken, // Chỉ chạy khi có accessToken
    staleTime: 5 * 60 * 1000, // 5 phút
    refetchOnWindowFocus: false,
  });
};
