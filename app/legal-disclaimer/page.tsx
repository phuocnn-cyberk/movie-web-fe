import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { LegalHeader } from "@/components/legal/legal-header";
import {
  LegalSidebar,
  disclaimerNavItems,
} from "@/components/legal/legal-sidebar";
import { DisclaimerContent } from "@/components/legal/disclaimer-content";

export default function LegalDisclaimer() {
  return (
    <div
      className="w-full dark:bg-helix-black"
      style={{ scrollBehavior: "smooth" }}
    >
      <Header />
      <FloatingNav />
      <main className="w-full dark:bg-helix-black flex flex-col">
        <LegalHeader title="Legal Disclaimer" />
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row">
          <LegalSidebar navigationItems={disclaimerNavItems} />
          <DisclaimerContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
