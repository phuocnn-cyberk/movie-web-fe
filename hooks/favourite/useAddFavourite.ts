import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite } from "@/services/api";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";

export const useAddFavourite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const userId = user?.userID;

  return useMutation({
    mutationFn: (movieId: number) => {
      if (!userId) {
        toast.error("Please sign in to add favorites");
        return Promise.reject(new Error("User not authenticated"));
      }
      return addFavorite(movieId, userId);
    },
    onSuccess: () => {
      toast.success("Added to favorites");
    },
    onError: (error: Error) => {
      if (error.message !== "User not authenticated") {
        toast.error("Failed to add to favorites");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favouriteList", userId] });
    },
  });
};