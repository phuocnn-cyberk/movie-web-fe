import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { SubscriptionHero } from "@/components/subscription-hero/subscription-hero";
import { SubscriptionCards } from "@/components/subscription-cards/subscription-cards";
import { PlanComparison } from "@/components/plan-comparison/plan-comparison";

export default function SubscriptionsPage() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <main className="w-full dark:bg-[#0F0F0F] pt-[120px]">
        <div className="w-full px-20 py-20">
          <div className="max-w-[1596px] mx-auto">
            <SubscriptionHero />
            <SubscriptionCards />
            <PlanComparison />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 