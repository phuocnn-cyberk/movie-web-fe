import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFavorite } from "@/services/api";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";

export const useRemoveFavourite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const userId = user?.userID;

  return useMutation({
    mutationFn: (movieId: number) => {
      if (!userId) {
        toast.error("Please sign in to remove favorites");
        return Promise.reject(new Error("User not authenticated"));
      }
      return removeFavorite(movieId, userId);
    },
    onSuccess: () => {
      toast.success("Removed from favorites");
    },
    onError: (error: Error) => {
      if (error.message !== "User not authenticated") {
        toast.error("Failed to remove from favorites");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favouriteList", userId] });
    },
  });
};
