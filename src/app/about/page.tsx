import { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { generatePageMetadata, generateBreadcrumbs } from "@/lib/metadata";
import AboutHeroSection from "@/components/sections/AboutHeroSection";
import TrustBadges from "@/components/sections/TrustBadges";
import Team from "@/components/sections/Team";
import OurMission from "@/components/sections/OurMission";
import { getProducts } from "@/lib/wix/services/products";
import ProductCards from "@/components/sections/ProductCards2";
import Testimonials from "@/components/sections/Testimonials2";
import WhatsAppCommunity from "@/components/sections/WhatsAppCommunity2";

// SEO Metadata for About page
export const metadata: Metadata = generatePageMetadata({
  title: "Our Story | Kheelona - Safe & Smart Toys Made in India",
  description:
    "Discover Kheelona. Backed by NASSCOM, we build safe, screen-free AI educational toys designed by experts to be your child’s smartest friend.",
  keywords: [
    "safe ai toys",
    "indian toy brand",
    "kheelona",
    "safe kids tech",
    "toy startup india",
    "trusted learning toys",
    "nasscom startup toys",
    "child safe ai",
  ],
  path: "/about",
  ogType: "website",
});

// JSON-LD for About page
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    generateBreadcrumbs([
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
    ]),
    {
      "@type": "AboutPage",
      "@id": "https://kheelona.com/about#webpage",
      url: "https://kheelona.com/about",
      name: "About Kheelona - Our Mission & Story",
      description:
        "Learn about Kheelona Robotics and our mission to create AI-powered educational toys.",
      isPartOf: { "@id": "https://kheelona.com/#website" },
      about: { "@id": "https://kheelona.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": "https://kheelona.com/#organization-detail",
      name: "Kheelona Robotics",
      alternateName: "Kheelona",
      url: "https://kheelona.com",
      logo: "https://kheelona.com/images/logo.png",
      description:
        "Kheelona Robotics is an Indian EdTech company creating AI-powered educational toys that help children learn through play while reducing screen time.",
      foundingDate: "2023",
      founders: [
        {
          "@type": "Person",
          name: "Kheelona Team",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "India",
      },
      sameAs: [
        "https://www.instagram.com/kheelona_robotics/",
        "https://www.linkedin.com/company/kheelona/",
        "https://www.facebook.com/kheelona/",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Educational Toys",
        "Child Development",
        "Screen-Free Learning",
        "Multilingual Education",
      ],
      slogan: "Smartest Playmates for Brightest Minds",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 10,
        maxValue: 50,
      },
    },
  ],
};

export default async function AboutPage() {
  const products = await getProducts();
  return (
    <>
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main id="main-content" className="flex-1 pt-24 md:pt-28">
          <h1 className="sr-only">Building Safe, Smart Friends for Growing Minds.</h1>
          {/* Hero Section */}
          <AboutHeroSection />
          <TrustBadges bg="bg-tangerine" />
          <Team />
          <OurMission />
          <ProductCards wixProducts={products} />
          <Testimonials />
          <WhatsAppCommunity />
        </main>

        <Footer />
      </div>
    </>
  );
}
