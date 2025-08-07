import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "../../services/api";
import { toast } from "sonner";

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
    return useMutation({
    mutationFn: (notificationId: number) => markNotificationAsRead(notificationId),
    onSuccess: () => {
      toast.success("Marked as read");
    },
    onError: () => {
      toast.error("Marked as read failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};