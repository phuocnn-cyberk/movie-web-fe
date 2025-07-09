import { HeroSection } from "@/components/hero-section/hero-section";
import { DevicesSection } from "../components/devices-section/devices-section";
import { Header } from "../components/common/header";
import { SpotlightSection } from "@/components/spotlight-section/spotlight-section";
import { FAQSection } from "@/components/faq-section/faq-section";
import { CategoriesSection } from "@/components/categories-section/categories-section";
import { Footer } from "../components/common/footer";
import { FreeTrial } from "@/components/common/free-trial";

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <main className="w-full dark:bg-[#202020]">
        <HeroSection />
        <CategoriesSection />
        <DevicesSection />
        <FAQSection />
        <SpotlightSection />
        <FreeTrial />
      </main>
      <Footer />
    </div>
  );
}
