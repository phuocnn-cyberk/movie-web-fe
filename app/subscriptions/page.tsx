"use client";

import { PlanComparison } from "@/components/plan-comparison/plan-comparison";
import { PricingSection } from "@/components/pricing-section/pricing-section";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

function SubscriptionHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isProcessingCallback = useRef(false);

  useEffect(() => {
    const payment = searchParams.get("payment");
    const subscriptionId = searchParams.get("subscriptionId");
    const message = searchParams.get("message");

    if (payment && !isProcessingCallback.current) {
      isProcessingCallback.current = true;

      switch (payment) {
        case "success":
          toast.success(
            subscriptionId ? `Payment successful! Subscription ID: ${subscriptionId}` : "Payment successful!",
            {
              duration: 5000,
            }
          );
          break;

        case "error":
          toast.error(message || "An error occurred while processing the payment", {
            duration: 5000,
          });
          break;

        case "failed":
          toast.warning(message || "Payment failed", {
            duration: 5000,
          });
          break;
      }

      setTimeout(() => {
        router.replace("/subscriptions");
      }, 1000);
    }
  }, [searchParams, router]);

  return null;
}

export default function SubscriptionsPage() {
  return (
    <>
      <SubscriptionHandler />
      <PricingSection />
      <PlanComparison />
    </>
  );
}
