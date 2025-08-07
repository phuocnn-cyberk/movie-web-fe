"use client";

import { useCreatePaypalOrder } from "@/hooks/subcriptions/useCreatePaypalOrder";
import { useAuthStore } from "@/stores/auth.store";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

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

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!isAuthenticated) {
      toast.error("Please login to subscribe");
      return;
    }

    if (!user?.userID) {
      toast.error("User not found");
      return;
    }

    if (plan.planId === 1) {
      toast.success("You are using the FREE plan");
      return;
    }

    try {
      const orderData = {
        planId: plan.planId,
        userId: user.userID,
        paymentMethod: "paypal",
      };

      const result = await createPaypalOrderMutation.mutateAsync(orderData);

      if (result && result.approvalUrl) {
        window.location.href = result.approvalUrl;
      } else {
        toast.error("Failed to create PayPal order");
      }
    } catch {
      toast.error("An error occurred while creating the PayPal order");
    }
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
                onClick={() => handleSubscribe(plan)}
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
    </section>
  );
};
