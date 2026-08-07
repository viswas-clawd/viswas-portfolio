export const SITE_NAME = "Viswas Vuppala";
export const SITE_TITLE = "Viswas Vuppala | AI Product Leader";
export const SITE_DESCRIPTION =
  "Viswas Vuppala is a GenAI product leader turning customer and developer needs into useful, trustworthy products through technical judgment and cross-functional execution.";

/**
 * This deliberately non-resolving origin is used only for deterministic local
 * and private-preview output. It never claims ownership of a real domain.
 */
export const SAFE_PREVIEW_ORIGIN = "https://private-preview.invalid";

const PUBLIC_INDEXING_VALUE = "true";

function configuredOrigin(): string | undefined {
  return process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
}

function parseHttpOrigin(value: string): URL | undefined {
  try {
    const parsed = new URL(value);

    if (
      (parsed.protocol !== "https:" && parsed.protocol !== "http:") ||
      parsed.username ||
      parsed.password
    ) {
      return undefined;
    }

    parsed.pathname = "/";
    parsed.search = "";
    parsed.hash = "";
    return parsed;
  } catch {
    return undefined;
  }
}

function isRealPublicOrigin(origin: URL): boolean {
  const hostname = origin.hostname.toLowerCase();
  const nonPublicHost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname === "[::1]" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".invalid") ||
    hostname.endsWith(".test");

  return (
    origin.protocol === "https:" &&
    !nonPublicHost
  );
}

export interface SeoRuntimeConfig {
  canonicalBase: URL;
  hasConfiguredCanonical: boolean;
  indexingRequested: boolean;
  indexingEnabled: boolean;
}

/**
 * Indexing requires both an explicit opt-in and a configured public HTTPS
 * origin. A private preview therefore stays noindex even if one variable is
 * accidentally set.
 */
export function getSeoRuntimeConfig(): SeoRuntimeConfig {
  const candidate = configuredOrigin();
  const parsed = candidate ? parseHttpOrigin(candidate) : undefined;
  const canonicalBase = parsed ?? new URL(SAFE_PREVIEW_ORIGIN);
  const hasConfiguredCanonical = Boolean(parsed && isRealPublicOrigin(parsed));
  const indexingRequested =
    process.env.SITE_ALLOW_INDEXING?.toLowerCase() === PUBLIC_INDEXING_VALUE;

  return {
    canonicalBase,
    hasConfiguredCanonical,
    indexingRequested,
    indexingEnabled: indexingRequested && hasConfiguredCanonical,
  };
}

export function absoluteUrl(path: string, base?: URL): string {
  const canonicalBase = base ?? getSeoRuntimeConfig().canonicalBase;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, canonicalBase).toString();
}

/** Returns no canonical URL until a real public origin is configured. */
export function canonicalUrl(path: string): string | undefined {
  const config = getSeoRuntimeConfig();
  return config.hasConfiguredCanonical
    ? absoluteUrl(path, config.canonicalBase)
    : undefined;
}

/** Keep text-first profile resources private alongside the HTML preview. */
export function buildMachineResourceHeaders(contentType?: string): Record<string, string> {
  const { indexingEnabled } = getSeoRuntimeConfig();
  const headers: Record<string, string> = {
    "Cache-Control": indexingEnabled
      ? "public, max-age=0, must-revalidate"
      : "private, no-store",
  };

  if (contentType) headers["Content-Type"] = contentType;
  if (!indexingEnabled) headers["X-Robots-Tag"] = "noindex, nofollow";

  return headers;
}
