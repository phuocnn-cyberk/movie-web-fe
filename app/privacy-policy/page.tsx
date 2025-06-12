import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { LegalHeader } from "@/components/legal/legal-header";
import {
  LegalSidebar,
  privacyPolicyNavItems,
} from "@/components/legal/legal-sidebar";
import { LegalContent } from "@/components/legal/privacy-content";

export default function PrivacyPolicy() {
  return (
    <div
      className="w-full dark:bg-helix-black"
      style={{ scrollBehavior: "smooth" }}
    >
      <Header />
      <FloatingNav />
      <main className="w-full dark:bg-helix-black flex flex-col">
        <LegalHeader title="Privacy Policy" />
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row">
          <LegalSidebar navigationItems={privacyPolicyNavItems} />
          <LegalContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
