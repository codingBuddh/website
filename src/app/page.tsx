import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import ProductCards from "@/components/sections/ProductCards";
import TrustBadges from "@/components/sections/TrustBadges";
import Testimonials from "@/components/sections/Testimonials";
import ParentingGrowth from "@/components/sections/ParentingGrowth";
import InteractiveLearning from "@/components/sections/InteractiveLearning";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import UsageScenarios from "@/components/sections/UsageScenarios";
import WhatsAppCommunity from "@/components/sections/WhatsAppCommunity";
import FAQSection from "@/components/sections/FAQSection";

import { getProducts } from "@/lib/wix/services/products";
import Promo from "@/components/layout/Promo";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "LUMI by Kheelona | Smart AI Learning Toy & Kids Companion",
  description:
    "Meet LUMI, the screen-free talking toy for kids. Boost brain development, learn languages, and give your child a smart, safe interactive friend.",
  keywords: [
    "brain toys",
    "smart toys",
    "ai toys",
    "learning toys",
    "educational toys",
    "talking toys",
    "kids robot",
    "interactive toys",
    "smart companion",
    "screen free toys",
    "stem toys",
    "tech toys for kids",
    "robot friend",
  ],
  path: "/",
  ogType: "website",
});

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main
      style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}
      id="main-content"
      tabIndex={-1}
    >
      <Header />
      <HeroSection />
      <Promo />
      <ProductCards wixProducts={products} />
      <TrustBadges />
      <Testimonials />
      <ParentingGrowth />
      <InteractiveLearning />
      <WhyChooseUs />
      <UsageScenarios />
      <WhatsAppCommunity />
      <FAQSection />
      <Footer />
    </main>
  );
}
