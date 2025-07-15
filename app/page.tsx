import { ProtectedRoute } from "@/components/auth/protected-route";
import { CategoriesSection } from "@/components/categories-section/categories-section";
import { FreeTrial } from "@/components/common/free-trial";
import { FAQSection } from "@/components/faq-section/faq-section";
import { HeroSection } from "@/components/hero-section/hero-section";
import { PricingSection } from "@/components/pricing-section/pricing-section";
import { Footer } from "../components/common/footer";
import { Header } from "../components/common/header";
import { DevicesSection } from "../components/devices-section/devices-section";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
        <Header />
        <main className="w-full dark:bg-[#0F0F0F]">
          <HeroSection />
          <CategoriesSection />
          <DevicesSection />
          <FAQSection />
          <PricingSection />
          <FreeTrial />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
