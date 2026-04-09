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
  title: "Parenting Community & Free Child Counseling | Kheelona",
  description:
    "Join the Kheelona WhatsApp community for smart parenting tips, child development support, and free expert counseling for your child's emotional health.",
  keywords: [
    "parenting help",
    "child counseling",
    "toddler development",
    "smart parenting",
    "kids mental health",
    "parenting group",
    "reduce screen time",
    "child psychology",
  ],
  path: "/community",
  ogType: "website",
});

export default async function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <h1 className="sr-only">Kheelona Parenting Community: Free Counseling &amp; Support.</h1>
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
