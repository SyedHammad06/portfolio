import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Add entries here as routes are added (e.g. project detail pages).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.url }];
}
