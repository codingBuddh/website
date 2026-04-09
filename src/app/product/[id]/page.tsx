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

  const nameLower = product.name.toLowerCase();
  const color =
    nameLower.includes("pink")
      ? "Pink"
      : nameLower.includes("green")
        ? "Green"
        : nameLower.includes("blue")
          ? "Blue"
          : "Color";

  return generatePageMetadata({
    title: `Buy LUMI ${color} | Interactive Talking Toy & Brain Builder`,
    description:
      "Order the LUMI " +
      color +
      " smart toy for Rs 2999. A safe, voice-interactive educational friend that builds curiosity, manners, and brain power without screens.",
    keywords: [
      "buy ai toy",
      "talking plush",
      "smart doll",
      "kids interactive plush",
      "voice toy",
      "buy smart toy",
      "educational robot",
      "tech plush",
      "learn to talk toy",
      "ai buddy",
      `${color.toLowerCase()} smart toy`,
      `${color.toLowerCase()} learning toy`,
      `${color.toLowerCase()} talking toy`,
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
