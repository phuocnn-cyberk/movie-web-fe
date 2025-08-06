import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatar } from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  const { actions } = useAuthStore();

  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: (data) => {
      if (data.success && data.avatarUrl) {
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          actions.setUser({
            ...currentUser,
            avatar: data.avatarUrl,
          });
        }

        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      }
    },
  });
}; 