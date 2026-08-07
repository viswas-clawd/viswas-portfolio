import type { MetadataRoute } from "next";
import { SITE_ROUTES } from "@/lib/routes";
import { absoluteUrl, getSeoRuntimeConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const { canonicalBase } = getSeoRuntimeConfig();

  return SITE_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path, canonicalBase),
    changeFrequency,
    priority,
  }));
}
