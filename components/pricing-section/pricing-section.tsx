"use client";

import { useGetAllPlans } from "@/hooks/subcriptions/useGetAllPlan";
import { useGetPaymentsByUser } from "@/hooks/subcriptions/useGetPaymentsByUser";
import React, { useMemo, useState } from "react";
import { PricingHeader } from "./pricing-header";
import { PricingPlanCard } from "./pricing-plan-card";

export const PricingSection: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const { data, isLoading, isError } = useGetAllPlans();
  const { data: payments } = useGetPaymentsByUser();

  const plans = data ? data[billingPeriod] : [];

  const allPlans = useMemo(() => {
    return [...(data?.monthly ?? []), ...(data?.yearly ?? [])];
  }, [data]);

  const activePricingIdSet = useMemo(() => {
    const completed = (payments ?? []).filter((p) => p.paymentStatus === "SUCCESS");
    return new Set(completed.map((p) => p.pricingId));
  }, [payments]);

  const highestPriorityActivePlanId = useMemo(() => {
    const activePaidPlans = allPlans.filter((p) => activePricingIdSet.has(p.id) && p.price !== "Free");

    if (activePaidPlans.length === 0) {
      return null;
    }

    const yearlyPlans = data?.yearly ?? [];
    const activeYearlyPlan = activePaidPlans.find((p) => yearlyPlans.some((yp) => yp.id === p.id));

    if (activeYearlyPlan) {
      return activeYearlyPlan.id;
    }

    return activePaidPlans[0].id;
  }, [allPlans, activePricingIdSet, data]);

  return (
    <section id="pricing" className="w-full dark:bg-[#0F0F0F]">
      <div className="p-20">
        <div className="mb-20 flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-25">
          <PricingHeader />

          <div className="flex rounded-[10px] border border-[#262626] bg-[#0F0F0F] p-[10px]">
            <button
              className={`rounded-[10px] px-6 py-3.5 text-lg font-medium ${billingPeriod === "monthly" ? "bg-[#1F1F1F] text-white" : "text-[#999999]"}`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </button>
            <button
              className={`rounded-[10px] px-6 py-3.5 text-lg font-medium ${billingPeriod === "yearly" ? "bg-[#1F1F1F] text-white" : "text-[#999999]"}`}
              onClick={() => setBillingPeriod("yearly")}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {isLoading && (
            <>
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[320px] animate-pulse rounded-xl border border-[#262626] bg-[#1A1A1A]" />
              ))}
            </>
          )}

          {!isLoading &&
            !isError &&
            plans.map((plan) => (
              <PricingPlanCard
                key={plan.id}
                id={plan.id}
                title={plan.title}
                description={plan.description}
                price={plan.price}
                period={plan.price === "Free" ? "" : (plan.period ?? (billingPeriod === "yearly" ? "/year" : "/month"))}
                comingSoon={plan.comingSoon || false}
                isActive={plan.id === highestPriorityActivePlanId}
              />
            ))}

          {!isLoading && !isError && plans.length === 0 && (
            <div className="col-span-full text-center text-[#999999]">No plans available</div>
          )}

          {isError && <div className="col-span-full text-center text-red-500">Failed to load plans</div>}
        </div>
      </div>
    </section>
  );
};
