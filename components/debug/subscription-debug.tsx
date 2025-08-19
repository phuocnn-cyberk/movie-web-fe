"use client";

import { useGetAllPlans } from "@/hooks/subcriptions/useGetAllPlan";
import { useGetPaymentsByUser } from "@/hooks/subcriptions/useGetPaymentsByUser";
import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";

export const SubscriptionDebug: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const { data: payments, isLoading: paymentsLoading } = useGetPaymentsByUser();
  const { data: plans } = useGetAllPlans();

  const allPlans = [...(plans?.monthly ?? []), ...(plans?.yearly ?? [])];
  const pricingIdToPlan = new Map(allPlans.map((p) => [p.id, p]));

  const activePayments = payments?.filter((p) => p.paymentStatus === "SUCCESS") ?? [];
  const hasActiveSubscription = activePayments.some(
    (payment) => payment.pricingId !== "free" && pricingIdToPlan.get(payment.pricingId)?.price !== "Free"
  );

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-blue-500 p-3 text-white shadow-lg hover:bg-blue-600"
        title="Debug Subscription Info"
      >
        🐛
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-12 w-96 rounded-lg border border-gray-300 bg-white p-4 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">🔍 Subscription Debug</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <strong>User ID:</strong> {user?.userID || "N/A"}
            </div>

            <div>
              <strong>Has Active Subscription:</strong>{" "}
              <span className={hasActiveSubscription ? "text-green-600" : "text-red-600"}>
                {hasActiveSubscription ? "✅ YES" : "❌ NO"}
              </span>
            </div>

            <div>
              <strong>Payments Loading:</strong> {paymentsLoading ? "Yes" : "No"}
            </div>

            <div>
              <strong>Total Payments:</strong> {payments?.length || 0}
            </div>

            <div>
              <strong>Active Payments:</strong> {activePayments.length}
            </div>

            {activePayments.length > 0 && (
              <div>
                <strong>Active Plans:</strong>
                <ul className="mt-1 ml-4">
                  {activePayments.map((payment, idx) => {
                    const plan = pricingIdToPlan.get(payment.pricingId);
                    return (
                      <li key={idx} className="text-xs">
                        • {payment.pricingId} ({plan?.title || "Unknown"}) - {plan?.price || "N/A"}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {payments && payments.length > 0 && (
              <details className="mt-2">
                <summary className="cursor-pointer font-medium text-gray-700">All Payments ({payments.length})</summary>
                <div className="mt-1 max-h-32 overflow-y-auto">
                  {payments.map((payment, idx) => (
                    <div key={idx} className="text-xs text-gray-600">
                      {payment.pricingId}: {payment.paymentStatus} (${payment.amount})
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
