import type { ReactNode } from "react";

/**
 * Publication is deny-by-default: content must be explicitly classified before
 * it can become an active public link or claim.
 */
export type DisclosureStatus =
  | "public"
  | "abstracted"
  | "comingSoon"
  | "doNotPublish";

export type ProjectStage =
  | "concept"
  | "prototype"
  | "inDevelopment"
  | "live";

export interface SiteLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteProfile {
  name: string;
  shortName: string;
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  location?: string;
  email?: string;
  linkedIn: string;
  capabilities: readonly string[];
  affiliations?: readonly {
    name: string;
    url: string;
    role: string;
    description?: string;
  }[];
}

export interface PublicProjectCallToAction {
  label: string;
  status: "public";
  href: string;
  external?: boolean;
}

export interface InactiveProjectCallToAction {
  label: string;
  status: Exclude<DisclosureStatus, "public">;
  /** Inactive and unapproved CTAs cannot accidentally become links. */
  href?: never;
  external?: never;
}

export type ProjectCallToAction =
  | PublicProjectCallToAction
  | InactiveProjectCallToAction;

export interface ProjectCaseStudy {
  slug: string;
  path: `/software/${string}`;
  title: string;
  eyebrow: string;
  stage: ProjectStage;
  disclosure: DisclosureStatus;
  thesis: string;
  problem: string;
  role: string;
  approach: readonly string[];
  outcomes: readonly string[];
  principles: readonly string[];
  cta: ProjectCallToAction;
  seo: PageSeo;
}

export interface WritingEntry {
  slug: string;
  path: `/knowledge/${string}`;
  title: string;
  description: string;
  dek?: string;
  publishedAt: string;
  updatedAt?: string;
  disclosure: DisclosureStatus;
  body: ReactNode;
  relatedLinks?: readonly SiteLink[];
  seo: PageSeo;
}

export type ClaimSourceType =
  | "resume"
  | "publicWebsite"
  | "publicRepository"
  | "projectArtifact"
  | "firstPerson"
  | "other";

export interface ClaimRecord {
  id: string;
  sourceType: ClaimSourceType;
  sourceLabel: string;
  proposedWording: string;
  publicEvidence?: string;
  disclosure: DisclosureStatus;
  approved: boolean;
  approvedAt?: string;
  notes?: string;
}

export interface PageSeo {
  title: string;
  description: string;
  /** Route-local path used for canonical and Open Graph URLs. */
  path: `/${string}` | "/";
  image?: string;
}

export interface BreadcrumbItem {
  name: string;
  path: `/${string}` | "/";
}

export interface ArticleStructuredDataInput {
  headline: string;
  description: string;
  path: `/knowledge/${string}`;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}
