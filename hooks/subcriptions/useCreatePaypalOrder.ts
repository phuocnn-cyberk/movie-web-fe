import { useMutation } from "@tanstack/react-query";
import { createPaypalOrder } from "../../services/api";
import { CreatePaypalOrderData, PaypalOrderResponse, PaypalPaymentData, PaypalPaymentResponse } from "@/types/api";

export const useCreatePaypalOrder = () => {
  return useMutation({
    mutationFn: (data: CreatePaypalOrderData): Promise<PaypalOrderResponse> => createPaypalOrder(data),
  });
};