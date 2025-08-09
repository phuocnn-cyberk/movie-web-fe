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

  const handleSubscribe = async () => {
    if (comingSoon || isActive) return;
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
        toast.error("Không nhận được phản hồi hợp lệ từ máy chủ.");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Tạo đơn thanh toán thất bại";
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#262626] bg-[#1A1A1A] p-10">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl leading-tight font-bold text-white">{title}</h3>
          {isActive && <Badge className="bg-[#E50000] text-white">Active</Badge>}
        </div>
        <p className="text-lg leading-tight font-normal text-[#999999]">{description}</p>
      </div>

      <div className="flex items-end gap-1">
        <span className="text-4xl leading-tight font-semibold text-white">{price}</span>
        <span className="text-lg leading-tight font-medium text-[#999999]">{period}</span>
      </div>

      <div className="mt-auto flex w-full flex-col gap-4">
        <Button
          className="rounded-lg bg-[#E50000] p-6 text-lg font-semibold text-white hover:bg-[#E50000]/80"
          disabled={comingSoon || isPending || isActive}
          onClick={handleSubscribe}
        >
          {isActive
            ? "Active"
            : isPending
              ? "Processing..."
              : comingSoon
                ? "Coming Soon"
                : price === "Free"
                  ? "Start Free Trial"
                  : "Subscribe"}
        </Button>
      </div>
    </div>
  );
};
