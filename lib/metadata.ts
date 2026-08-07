import type { Metadata } from "next";
import type { PageSeo } from "./types";
import { ROUTE_SEO, type SiteRoute } from "./routes";
import {
  canonicalUrl,
  getSeoRuntimeConfig,
  SITE_NAME,
} from "./site-config";

export interface BuildMetadataOptions extends PageSeo {
  type?: "website" | "article" | "profile";
  includeDescription?: boolean;
}

/**
 * Shared metadata builder. Every route opts into a unique title, description,
 * and path while inheriting the global private-preview indexing safeguard.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  includeDescription = true,
}: BuildMetadataOptions): Metadata {
  const config = getSeoRuntimeConfig();
  const canonical = canonicalUrl(path);
  const images = image ? [new URL(image, config.canonicalBase).toString()] : undefined;
  const openGraphType = type === "article" ? "article" : "website";

  return {
    title,
    ...(includeDescription ? { description } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    robots: {
      index: config.indexingEnabled,
      follow: config.indexingEnabled,
      googleBot: {
        index: config.indexingEnabled,
        follow: config.indexingEnabled,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: openGraphType,
      siteName: SITE_NAME,
      title,
      ...(includeDescription ? { description } : {}),
      ...(canonical ? { url: canonical } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      ...(includeDescription ? { description } : {}),
      ...(images ? { images } : {}),
    },
  };
}

export function buildRouteMetadata(
  route: SiteRoute,
  options?: Pick<BuildMetadataOptions, "image" | "type" | "includeDescription">,
): Metadata {
  return buildMetadata({ ...ROUTE_SEO[route], ...options });
}
