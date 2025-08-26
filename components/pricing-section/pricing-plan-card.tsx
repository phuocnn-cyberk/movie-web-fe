import { useCreatePaypalOrder } from "@/hooks/subcriptions/useCreatePaypalOrder";
import { ROUTES } from "@/lib/routes";
import { useAuthStore } from "@/stores/auth.store";
import { PricingPlan } from "@/types/api";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type PricingPlanCardProps = PricingPlan & { isActive?: boolean };

export const PricingPlanCard: React.FC<PricingPlanCardProps> = ({
  id,
  title,
  description,
  price,
  period = "/month",
  comingSoon = false,
  isActive = false,
}) => {
  const router = useRouter();
  const authState = useAuthStore();
  const { mutateAsync, isPending } = useCreatePaypalOrder();
  const queryClient = useQueryClient();

  const isFreePlan = price === "Free";
  const isPlanActive = isActive && !isFreePlan;

  const handleSubscribe = async () => {
    if (isFreePlan) {
      router.push(ROUTES.moviesShows);
      return;
    }

    if (comingSoon || isPlanActive) return;
    const userId = authState.user?.userID;
    if (!userId) {
      router.push(ROUTES.signIn);
      return;
    }
    try {
      const res = await mutateAsync({ userId, paymentMethod: "paypal", pricingId: id });
      const urlOrMessage = res.approvalUrl;
      if (urlOrMessage && urlOrMessage.startsWith("http")) {
        queryClient.invalidateQueries({ queryKey: ["payments"] });
        window.location.href = urlOrMessage;
      } else if (urlOrMessage) {
        toast.success(urlOrMessage);
        queryClient.invalidateQueries({ queryKey: ["payments"] });
      } else {
        toast.error("Invalid response from server.");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to create payment order";
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#262626] bg-[#1A1A1A] p-10">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl leading-tight font-bold text-white">{title}</h3>
          {isPlanActive && <Badge className="bg-[#E50000] text-white">Current Plan</Badge>}
        </div>
        <p className="text-lg leading-tight font-normal text-[#999999]">{description}</p>
      </div>

      <div className="flex items-end gap-1">
        <span className="text-4xl leading-tight font-semibold text-white">{price}</span>
        <span className="text-lg leading-tight font-medium text-[#999999]">{period}</span>
      </div>

      <div className="mt-auto flex w-full flex-col gap-4">
        <Button
          className="cursor-pointer rounded-lg bg-[#E50000] p-6 text-lg font-semibold text-white hover:bg-[#E50000]/80"
          disabled={comingSoon || isPending || isPlanActive}
          onClick={handleSubscribe}
        >
          {comingSoon
            ? "Coming Soon"
            : isPending
              ? "Processing..."
              : isFreePlan
                ? "Start Free Trial"
                : isPlanActive
                  ? "Active"
                  : "Subscribe"}
        </Button>
      </div>
    </div>
  );
};
