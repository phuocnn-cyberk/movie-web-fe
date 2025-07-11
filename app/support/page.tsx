import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { SupportHero } from "@/components/support-hero/support-hero";
import { ContactForm } from "@/components/contact-form/contact-form";

export default function SupportPage() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <main className="w-full dark:bg-[#0F0F0F] pt-[120px]">
        <div className="w-full px-20 py-20">
          <div className="max-w-[1589px] mx-auto">
            <div className="flex gap-20">
              <SupportHero />
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 