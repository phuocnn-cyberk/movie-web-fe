import { sendSupport } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSupport = () => {
  return useMutation({
    mutationFn: sendSupport,
    onSuccess: () => toast.success("Support sent successfully"),
    onError: () => toast.error("Failed to send support"),
  });
};