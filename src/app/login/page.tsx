import { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import LoginPageContent from "@/components/sections/LoginPageContent";
import { generateBreadcrumbs, generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Login",
  description:
    "Sign in to your Kheelona account securely through Wix and continue where you left off.",
  keywords: ["Kheelona login", "Wix login", "customer login", "account sign in"],
  path: "/login",
  ogType: "website",
});

const loginJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    generateBreadcrumbs([
      { name: "Home", url: "/" },
      { name: "Login", url: "/login" },
    ]),
    {
      "@type": "WebPage",
      "@id": "https://kheelona.com/login#webpage",
      url: "https://kheelona.com/login",
      name: "Login",
      description: "Secure login page for Kheelona customers powered by Wix authentication.",
      isPartOf: { "@id": "https://kheelona.com/#website" },
      about: { "@id": "https://kheelona.com/#organization" },
      inLanguage: "en-US",
    },
  ],
};

export default function LoginPage() {
  return (
    <>
      <Script
        id="login-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(loginJsonLd) }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        <LoginPageContent />
        <Footer />
      </div>
    </>
  );
}
