"use client";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { PlanComparison } from "@/components/plan-comparison/plan-comparison";
import { PricingSection } from "@/components/pricing-section/pricing-section";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SubscriptionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessingCallback, setIsProcessingCallback] = useState(false);

  useEffect(() => {
    const payment = searchParams.get("payment");
    const subscriptionId = searchParams.get("subscriptionId");
    const message = searchParams.get("message");

    if (payment && !isProcessingCallback) {
      setIsProcessingCallback(true);

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
        setIsProcessingCallback(false);
      }, 1000);
    }
  }, [searchParams, router, isProcessingCallback]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
        <PricingSection />
        <PlanComparison />
      </main>
      <Footer />
    </div>
  );
}
