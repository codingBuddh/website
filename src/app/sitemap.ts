import { MetadataRoute } from "next";
import { getBlogs } from "@/lib/wix/services/blogs";
import { getProducts } from "@/lib/wix/services/products";

const BASE_URL = "https://kheelona.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/community`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/refund`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/shipping`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const [products, blogs] = await Promise.allSettled([getProducts(), getBlogs()]);

  const productPages: MetadataRoute.Sitemap =
    products.status === "fulfilled"
      ? (products.value ?? [])
          .filter((product: any) => Boolean(product?.id))
          .map((product: any) => ({
            url: `${BASE_URL}/product/${product.id}`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.8,
          }))
      : [];

  const blogPages: MetadataRoute.Sitemap =
    blogs.status === "fulfilled"
      ? (blogs.value ?? [])
          .filter((post: any) => Boolean(post?._id))
          .map((post: any) => ({
            url: `${BASE_URL}/blog/${post._id}`,
            lastModified: post?.firstPublishedDate
              ? new Date(post.firstPublishedDate)
              : lastModified,
            changeFrequency: "monthly",
            priority: 0.7,
          }))
      : [];

  return [...mainPages, ...productPages, ...blogPages];
}
