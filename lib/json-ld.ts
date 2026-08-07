import type {
  ArticleStructuredDataInput,
  BreadcrumbItem,
  SiteProfile,
} from "./types";
import {
  absoluteUrl,
  getSeoRuntimeConfig,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "./site-config";

export type JsonLdPrimitive = string | number | boolean | null;
export type JsonLdValue =
  | JsonLdPrimitive
  | JsonLdObject
  | readonly JsonLdValue[];
export interface JsonLdObject {
  [key: string]: JsonLdValue | undefined;
}

const context = "https://schema.org";

function ids() {
  return {
    website: absoluteUrl("/#website"),
    person: absoluteUrl("/#person"),
  };
}

export function buildWebSiteJsonLd(): JsonLdObject {
  const { canonicalBase } = getSeoRuntimeConfig();
  const { website, person } = ids();

  return {
    "@context": context,
    "@type": "WebSite",
    "@id": website,
    url: canonicalBase.toString(),
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    publisher: { "@id": person },
  };
}

export function buildPersonJsonLd(profile: SiteProfile): JsonLdObject {
  const { person } = ids();
  const affiliations = profile.affiliations?.map((affiliation) => ({
    "@type": "Organization",
    name: affiliation.name,
    url: affiliation.url,
    description: affiliation.description ?? affiliation.role,
  }));

  return {
    "@context": context,
    "@type": "Person",
    "@id": person,
    name: profile.name,
    url: absoluteUrl("/career"),
    jobTitle: profile.title,
    description: profile.description,
    sameAs: [profile.linkedIn],
    knowsAbout: profile.capabilities,
    ...(affiliations?.length ? { memberOf: affiliations, affiliation: affiliations } : {}),
  };
}

export function buildProfilePageJsonLd(profile: SiteProfile): JsonLdObject {
  const { website, person } = ids();

  return {
    "@context": context,
    "@type": "ProfilePage",
    "@id": absoluteUrl("/career#profile-page"),
    url: absoluteUrl("/career"),
    name: `${profile.name} Career Profile`,
    description: profile.description,
    inLanguage: "en-US",
    isPartOf: { "@id": website },
    mainEntity: {
      ...buildPersonJsonLd(profile),
      "@context": undefined,
      "@id": person,
    },
  };
}

export function buildArticleJsonLd(
  article: ArticleStructuredDataInput,
): JsonLdObject {
  const { website, person } = ids();
  const url = absoluteUrl(article.path);

  return {
    "@context": context,
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.headline,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: "en-US",
    mainEntityOfPage: url,
    author: { "@id": person, name: SITE_NAME },
    publisher: { "@id": person, name: SITE_NAME },
    isPartOf: { "@id": website },
    ...(article.image ? { image: absoluteUrl(article.image) } : {}),
  };
}

export function buildBreadcrumbJsonLd(
  breadcrumbs: readonly BreadcrumbItem[],
): JsonLdObject {
  return {
    "@context": context,
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: absoluteUrl(breadcrumb.path),
    })),
  };
}

/**
 * Safe for embedding in a JSON-LD script tag: characters that can terminate a
 * script or change HTML parsing are escaped without altering the JSON value.
 */
export function serializeJsonLd(value: JsonLdObject): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
