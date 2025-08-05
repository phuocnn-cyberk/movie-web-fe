"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { createPaypalOrder } from "@/services/api";
import { useAuthStore } from "@/stores/auth.store";

interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 1,
    name: "FREE PLAN",
    description: "Free plan only watches public movies.",
    price: 0,
    period: "",
    features: [
      "Watch free movies",
      "Only available on 1 device",
      "No download feature",
      "SD quality",
    ],
  },
  {
    id: 2,
    name: "PREMIUM PLAN",
    description: "VIP package 1 month unlimited movie viewing.",
    price: 7.99,
    period: "30 days",
    features: [
      "Watch all movies, including Premium",
      "Watch on multiple devices",
      "HD/FullHD quality",
      "No ads",
    ],
    isPopular: true,
  },
];

export const SubscriptionCards: React.FC = () => {
  const { user } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribeClick = (plan: SubscriptionPlan) => {
    if (!user?.userID) {
      alert("Please log in to subscribe.");
      return;
    }
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePayment = async (method: string) => {
    if (!selectedPlan || !user?.userID) return;

    try {
      setLoading(true);
      if (method === "PAYPAL") {
        const approvalLink = await createPaypalOrder(
          selectedPlan.id,
          Number(user.userID),
          "PAYPAL"
        );
        if (approvalLink) {
          window.location.href = approvalLink;
        } else {
          alert("Failed to create PayPal order");
        }
      } else if (method === "MOMO") {
        alert("Momo payment not implemented yet");
      }
    } catch (error) {
      console.error(error);
      alert("Error processing payment");
    } finally {
      setLoading(false);
      setShowPaymentModal(false);
    }
  };

  return (
    <section className="w-full">
      <div className="flex gap-[30px] w-full">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className="flex-1 bg-[#1A1A1A] border border-[#262626] rounded-xl p-[50px] flex flex-col gap-[50px] relative"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-[24px] font-bold text-white font-[Manrope]">
                {plan.name}
              </h3>
              <p className="text-[16px] text-[#999999] leading-relaxed font-[Manrope]">
                {plan.description}
              </p>
            </div>

            <div className="flex justify-center items-end gap-1">
              <span className="text-[48px] font-bold text-white font-[Manrope]">
                {plan.price === 0 ? "Free" : `${plan.price.toLocaleString()}₫`}
              </span>
              {plan.period && (
                <span className="text-[20px] text-[#999999] font-[Manrope] mb-2">
                  / {plan.period}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#E50000] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[14px] text-[#999999] leading-relaxed font-[Manrope]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-5 w-full">
              {plan.price === 0 ? (
                <Button className="flex-1 py-4 text-[16px] font-semibold font-[Manrope] bg-[#262626] hover:bg-[#3A3A3A] text-white">
                  Use Now
                </Button>
              ) : (
                <Button
                  onClick={() => handleSubscribeClick(plan)}
                  className="flex-1 py-4 text-[16px] font-semibold font-[Manrope] bg-[#E50000] hover:bg-[#CC0000] text-white"
                >
                  Subscribe
                </Button>
              )}
            </div>

            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#E50000] text-white px-4 py-2 rounded-lg text-[14px] font-semibold font-[Manrope]">
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
            <h2 className="text-lg font-bold mb-4 text-center">
              Chọn phương thức thanh toán
            </h2>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => handlePayment("PAYPAL")}
                disabled={loading}
                className="bg-[#E50000] hover:bg-[#CC0000]"
              >
                {loading ? "Processing..." : "Pay with PayPal"}
              </Button>
              <Button
                onClick={() => handlePayment("MOMO")}
                disabled={loading}
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
