import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import WhatsAppCommunity from "@/components/sections/WhatsAppCommunity2";
import Testimonials from "@/components/sections/Testimonials2";
import WhyJoinUs from "@/components/sections/WhyJoinUs";
import OnlineSession from "@/components/sections/OnlineSession";
import CommunityHeroSection from "@/components/sections/CommunityHeroSection";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Kheelona Community - Parent Stories, Tips & Support",
  description:
    "Join the Kheelona parent community for tips, shared experiences, expert guidance, and playful ideas to support your child's growth with Lumi.",
  keywords: [
    "Kheelona community",
    "parent community",
    "Lumi parents",
    "parenting support India",
    "screen-free parenting",
  ],
  path: "/community",
  ogType: "website",
});

export default async function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Header />
      <CommunityHeroSection />
      <OnlineSession />
      <WhyJoinUs />
      <Testimonials />
      <WhatsAppCommunity />
      <Footer />
    </main>
  );
}
