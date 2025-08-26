"use client";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { PlanComparison } from "@/components/plan-comparison/plan-comparison";
import { PricingSection } from "@/components/pricing-section/pricing-section";

export default function SubscriptionsPage() {
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
