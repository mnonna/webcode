import type { MetadataRoute } from "next";
import { getArticles } from "@/src/data/blog/articles";
import {
  offerPageSlugs,
  SITE_URL,
} from "@/src/data/offer/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/oferta`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const offerPages: MetadataRoute.Sitemap = offerPageSlugs.map((slug) => ({
    url: `${SITE_URL}/oferta/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getArticles().map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.dateModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...offerPages, ...blogPages];
}