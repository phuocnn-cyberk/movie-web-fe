import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatar } from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  const { user, actions } = useAuthStore();

  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: async (data) => {
      if (data.success && data.avatarUrl && user) {
        // Cập nhật user với avatar mới ngay lập tức
        actions.setUser({
          ...user,
          avatar: data.avatarUrl,
        });

        // Invalidate và refetch currentUser query để đảm bảo data đồng bộ
        await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        await queryClient.refetchQueries({ queryKey: ["currentUser"] });
      }
    },
  });
}; 