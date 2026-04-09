import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import FAQSection from "@/components/sections/FAQSection";
import { generatePageMetadata, generateBreadcrumbs } from "@/lib/metadata";
import Script from "next/script";

export const metadata: Metadata = generatePageMetadata({
  title: "FAQs | LUMI AI Toy Safety, Privacy & Features | Kheelona",
  description:
    "Got questions about LUMI? Find quick answers about our strict data privacy, child safety features, age ranges, and fast shipping.",
  keywords: [
    "ai toy safety",
    "toy privacy",
    "child data safety",
    "lumi age range",
    "kheelona shipping",
    "toy warranty",
    "safe kids tech",
    "emotion recognition toys",
  ],
  path: "/faq",
  ogType: "website",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    generateBreadcrumbs([
      { name: "Home", url: "/" },
      { name: "FAQs", url: "/faq" },
    ]),
    {
      "@type": "FAQPage",
      "@id": "https://kheelona.com/faq#faq",
      url: "https://kheelona.com/faq",
      name: "LUMI FAQs: Safety, Privacy, and Features Explained",
      description:
        "Quick answers about LUMI AI toy safety, privacy, warranty, age range, and shipping.",
      isPartOf: { "@id": "https://kheelona.com/#website" },
      about: { "@id": "https://kheelona.com/#organization" },
      inLanguage: "en-US",
    },
  ],
};

export default function FaqPage() {
  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1 pt-24 md:pt-28">
          <h1 className="sr-only">LUMI FAQs: Safety, Privacy, and Features Explained.</h1>
          <FAQSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

