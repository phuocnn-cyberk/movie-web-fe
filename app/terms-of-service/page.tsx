import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { LegalHeader } from "@/components/legal/legal-header";
import {
  LegalSidebar,
  termsOfServiceNavItems,
} from "@/components/legal/legal-sidebar";
import { TermsContent } from "@/components/legal/terms-content";

export default function TermsOfService() {
  return (
    <div
      className="w-full dark:bg-helix-black"
      style={{ scrollBehavior: "smooth" }}
    >
      <Header />
      <FloatingNav />
      <main className="w-full dark:bg-helix-black flex flex-col">
        <LegalHeader title="Terms of Service" />
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row">
          <LegalSidebar navigationItems={termsOfServiceNavItems} />
          <TermsContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
