import { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { generatePageMetadata, generateBreadcrumbs } from "@/lib/metadata";
import { getBlogs } from "@/lib/wix/services/blogs";
import BlogsSwippable from "@/components/sections/BlogsSwippable";
import BlogsGrid from "@/components/sections/BlogsGrid";
import WhatsAppCommunity from "@/components/sections/WhatsAppCommunity";

// SEO Metadata for Blog page
export const metadata: Metadata = generatePageMetadata({
  title: "Kheelona Blog | Brain Development & Smart Parenting Tips",
  description:
    "Read expert tips on kids' brain development, reducing screen time, and how interactive, educational toys help your child learn and grow.",
  keywords: [
    "brain development",
    "toddler learning",
    "child growth",
    "parenting tips",
    "screen free play",
    "early learning",
    "kids vocabulary",
    "smart kids",
    "interactive play",
  ],
  path: "/blog",
  ogType: "website",
});

export default async function BlogPage() {
  const blogs: any = await getBlogs();
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      generateBreadcrumbs([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
      ]),
      {
        "@type": "Blog",
        "@id": "https://kheelona.com/blog#blog",
        url: "https://kheelona.com/blog",
        name: "Kheelona Blog - Parenting Tips & Child Development",
        description:
          "Expert parenting tips, child development guides, and educational insights from Kheelona.",
        publisher: { "@id": "https://kheelona.com/#organization" },
        inLanguage: "en-US",
        blogPost: (blogs ?? []).map((post: any) => ({
          "@type": "BlogPosting",
          headline: post?.title ?? "",
          description: post?.excerpt ?? "",
          image: post?.media?.wixMedia?.image
            ? `https://static.wixstatic.com/media/${post.media.wixMedia.image.split("/")[3]}`
            : undefined,
          url: `https://kheelona.com/blog/${post?._id ?? ""}`,
          datePublished: post?.firstPublishedDate,
          author: {
            "@type": "Organization",
            name: "Kheelona Robotics",
          },
          publisher: { "@id": "https://kheelona.com/#organization" },
        })),
      },
    ],
  };

  return (
    <>
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main id="main-content" className="flex-1 pt-24 md:pt-28">
          <section className="px-6 pt-6">
            <h1 className="font-heading text-3xl md:text-5xl text-stroke-tangerine text-center">
              Smart Play: Tips for Brain Development &amp; Screen-Free Kids.
            </h1>
            <p className="mt-4 text-center text-gray-600 max-w-3xl mx-auto">
              Practical, parent-friendly ideas to help kids learn, grow, and spend less time on
              screens.
            </p>
          </section>
          {/* Hero Section */}

          <BlogsSwippable blogs={blogs} />
          <BlogsGrid blogs={blogs} />
          <WhatsAppCommunity />
        </main>

        <Footer />
      </div>
    </>
  );
}
