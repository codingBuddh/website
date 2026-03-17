import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Testimonials from "@/components/sections/Testimonials";
import ParentingGrowth from "@/components/sections/ParentingGrowth";
import InteractiveLearning from "@/components/sections/InteractiveLearning";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import UsageScenarios from "@/components/sections/UsageScenarios";
import WhatsAppCommunity from "@/components/sections/WhatsAppCommunity";
import ProductHero from "@/components/sections/ProductHeroSection";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/wix/services/productById";
import Promo from "@/components/layout/Promo";
import { generatePageMetadata } from "@/lib/metadata";

type WixImage = {
  image?: {
    url?: string;
  };
};

type WixProduct = {
  _id?: string;
  name: string;
  description?: string;
  seoData?: {
    description?: string;
  };
  media?: {
    items?: WixImage[];
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = (await getProductById(id)) as WixProduct;

  if (!product) {
    return generatePageMetadata({
      title: "Product",
      description: "Explore Lumi by Kheelona, the AI-powered educational toy for curious kids.",
      path: `/product/${id}`,
      ogType: "website",
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: `${product.name} | Lumi by Kheelona`,
    description:
      product.seoData?.description ||
      product.description ||
      `${product.name} by Kheelona. Discover a screen-free AI-powered educational toy designed to help children learn through play.`,
    keywords: [
      product.name,
      "Lumi toy",
      "AI educational toy",
      "screen-free toy India",
      "talking toy for kids",
    ],
    path: `/product/${id}`,
    ogType: "website",
    ogImage: product.media?.items?.[0]?.image?.url || "/images/og-image.jpg",
  });
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (await getProductById(id)) as WixProduct;

  if (!product) notFound();

  return (
    <main style={{ minHeight: "100vh", overflowX: "hidden" }} id="main-content" tabIndex={-1}>
      <Header />
      <ProductHero product={product} />
      <Promo />
      <UsageScenarios />
      <Testimonials />
      <ParentingGrowth />
      <InteractiveLearning />
      <WhyChooseUs />
      <WhatsAppCommunity />
      <Footer />
    </main>
  );
}
