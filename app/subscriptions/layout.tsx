import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Suspense } from "react";

export default function SubscriptionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
        <Suspense>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}
