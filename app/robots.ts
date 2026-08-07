import type { MetadataRoute } from "next";
import { absoluteUrl, getSeoRuntimeConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const config = getSeoRuntimeConfig();

  if (!config.indexingEnabled) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml", config.canonicalBase),
    host: config.canonicalBase.origin,
  };
}
