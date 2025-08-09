import { useQuery } from "@tanstack/react-query";
import { getPricingPlans } from "@/services/api";

export const useGetAllPlans = () => {
  return useQuery({
    queryKey: ["all-plans"],
    queryFn: getPricingPlans,
  });
};