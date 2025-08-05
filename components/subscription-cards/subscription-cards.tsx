"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useCreatePaypalOrder } from "@/hooks/subcriptions/useCreatePaypalOrder";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

interface SubscriptionPlan {
  planId: number;
  name: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    planId: 1,
    name: "FREE PLAN",
    description: "Free plan only watches public movies.",
    price: 0,
    period: "",
    features: ["Watch free movies", "Only available on 1 device", "No download feature", "SD quality"],
  },
  {
    planId: 2,
    name: "PREMIUM PLAN",
    description: "VIP package 1 month unlimited movie viewing.",
    price: 7.99,
    period: "30 days",
    features: ["Watch all movies, including Premium", "Watch on multiple devices", "HD/FullHD quality", "No ads"],
    isPopular: true,
  },
];

export const SubscriptionCards: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const createPaypalOrderMutation = useCreatePaypalOrder();

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSubscribeClick = (plan: SubscriptionPlan) => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để đăng ký gói");
      return;
    }
    if (plan.planId === 1) {
      toast.success("Bạn đã sử dụng gói FREE");
      return;
    }
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePayment = async (method: string) => {
    if (!selectedPlan || !user?.userID) return;

    if (method === "PAYPAL") {
      try {
        const result = await createPaypalOrderMutation.mutateAsync({
          planId: selectedPlan.planId,
          userId: user.userID,
          paymentMethod: "paypal",
        });

        if (result && result.approvalUrl) {
          window.location.href = result.approvalUrl;
        } else {
          toast.error("Không thể tạo đơn hàng PayPal");
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi tạo đơn hàng PayPal");
        console.error(error);
      }
    } else if (method === "MOMO") {
      toast.info("Momo payment chưa được triển khai");
    }

    setShowPaymentModal(false);
  };

  return (
    <section className="w-full">
      <div className="flex w-full gap-[30px]">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.planId}
            className="relative flex flex-1 flex-col gap-[50px] rounded-xl border border-[#262626] bg-[#1A1A1A] p-[50px]"
          >
            <div className="flex flex-col gap-4">
              <h3 className="font-[Manrope] text-[24px] font-bold text-white">{plan.name}</h3>
              <p className="font-[Manrope] text-[16px] leading-relaxed text-[#999999]">{plan.description}</p>
            </div>

            <div className="flex items-end justify-center gap-1">
              <span className="font-[Manrope] text-[48px] font-bold text-white">
                {plan.price === 0 ? "Free" : `${plan.price.toLocaleString()} $`}
              </span>
              {plan.period && <span className="mb-2 font-[Manrope] text-[20px] text-[#999999]">/ {plan.period}</span>}
            </div>

            <div className="flex flex-col gap-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#E50000]"></div>
                  <span className="font-[Manrope] text-[14px] leading-relaxed text-[#999999]">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex w-full gap-5">
              <Button
                onClick={() => handleSubscribeClick(plan)}
                disabled={createPaypalOrderMutation.isPending}
                className={`flex-1 py-4 font-[Manrope] text-[16px] font-semibold text-white ${
                  plan.planId === 1
                    ? "bg-[#262626] hover:bg-[#3A3A3A]"
                    : "bg-[#E50000] hover:bg-[#CC0000] disabled:opacity-50"
                }`}
              >
                {createPaypalOrderMutation.isPending ? "Processing..." : plan.planId === 1 ? "Use Now" : "Subscribe"}
              </Button>
            </div>

            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                <div className="rounded-lg bg-[#E50000] px-4 py-2 font-[Manrope] text-[14px] font-semibold text-white">
                  Most Popular
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal chọn phương thức thanh toán */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] p-6 rounded-lg w-[300px] text-white shadow-xl border border-[#333]">
            <h2 className="text-lg font-bold mb-4 text-center">Chọn phương thức thanh toán</h2>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => handlePayment("PAYPAL")}
                disabled={createPaypalOrderMutation.isPending}
                className="bg-[#E50000] hover:bg-[#CC0000]"
              >
                {createPaypalOrderMutation.isPending ? "Processing..." : "Pay with PayPal"}
              </Button>
              <Button
                onClick={() => handlePayment("MOMO")}
                disabled={createPaypalOrderMutation.isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Pay with Momo
              </Button>
              <Button
                onClick={() => setShowPaymentModal(false)}
                className="bg-gray-600 hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
