import { useQuery } from "@tanstack/react-query";
import { getPaymentsByUser } from "@/services/api";

export const useGetPaymentsByUser = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: () => getPaymentsByUser(),
  });
};