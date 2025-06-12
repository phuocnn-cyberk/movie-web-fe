import { HeroSection } from "@/components/hero-section/hero-section";
import { ProductSection } from "../components/products-section/products-section";
import { MilestonesSection } from "../components/milestones-section/milestones-section";
import { Header } from "../components/common/header";
import { SpotlightSection } from "@/components/spotlight-section/spotlight-section";
import { ConfidenceSection } from "@/components/confidence-section/confidence-section";
import { FAQSection } from "@/components/faq-section/faq-section";
import { RWASection } from "@/components/rwa-section/rwa-section";
import { PartnersSection } from "@/components/partners-section/partners-section";
import { DefiPartnersSection } from "@/components/partners-section/defi-partners-section";
import { Footer } from "../components/common/footer";
import { WhySection } from "@/components/why-section/why-section";
import { FloatingNav } from "@/components/ui/floating-navbar";

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden dark:bg-helix-black">
      <Header />
      <FloatingNav />
      <main className="w-full dark:bg-helix-black">
        <HeroSection />
        <PartnersSection />
        <MilestonesSection />
        <ConfidenceSection />
        <ProductSection />
        <RWASection />
        <DefiPartnersSection />
        <FAQSection />
        <SpotlightSection />
        <WhySection />
      </main>
      <Footer />
    </div>
  );
}
