export type DisclosureClassification =
  | "public"
  | "abstracted"
  | "comingSoon"
  | "doNotPublish";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface SeoMetadata {
  title: string;
  description: string;
  pathname: string;
  keywords: readonly string[];
}

export interface PublicLink {
  label: string;
  href: string;
  external: boolean;
}

export interface SiteProfile {
  name: string;
  role: string;
  disclosure: DisclosureClassification;
  eyebrow: string;
  headline: string;
  introduction: string;
  shortBio: string;
  about: readonly string[];
  capabilities: readonly string[];
  principles: readonly {
    title: string;
    description: string;
  }[];
  proofSignals: readonly string[];
  glyphVocabulary: readonly string[];
  signalResolution: readonly string[];
  primaryCta: PublicLink;
  secondaryCta: PublicLink;
  contact: PublicLink;
  socialLinks: readonly PublicLink[];
  closingStatement: string;
  seo: SeoMetadata;
}

export interface ProjectCta {
  label: string;
  href?: string;
  external?: boolean;
  availability: "available" | "comingSoon" | "unverified";
}

export type ProjectVisualKey =
  | "helios"
  | "fedai"
  | "awardlens"
  | "chatter"
  | "zyner-treaty";

export type SoftwareProjectVisualKey = Exclude<ProjectVisualKey, "zyner-treaty">;

export interface DiagramProjectMedia {
  kind: "diagram";
  visual: ProjectVisualKey;
  alt: string;
}

export interface ConceptImageProjectMedia {
  kind: "conceptImage";
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export type ProjectMedia = DiagramProjectMedia | ConceptImageProjectMedia;

export type VerificationStatus =
  | "public"
  | "public-narrative"
  | "private-build"
  | "local-prototype";

export interface ProjectProof {
  label: "Status" | "What exists" | "Demonstrates";
  detail: string;
  verification: VerificationStatus;
}

export interface ProjectCaseStudy {
  slug: SoftwareProjectVisualKey;
  title: string;
  category: string;
  stage: string;
  disclosure: DisclosureClassification;
  summary: string;
  thesis: string;
  problem: string;
  role: string;
  approach: readonly string[];
  proof: readonly ProjectProof[];
  principles: readonly string[];
  boundaryNote: string;
  media: DiagramProjectMedia;
  cta: ProjectCta;
  seo: SeoMetadata;
}

export interface HardwareCaseStudy {
  slug: "zyner-treaty";
  title: string;
  stage: "Concept";
  disclosure: DisclosureClassification;
  summary: string;
  thesis: string;
  role: string;
  modules: readonly {
    name: string;
    purpose: string;
    safetyBoundary: string;
  }[];
  systemDesign: readonly string[];
  boundaryNote: string;
  media: ConceptImageProjectMedia;
  seo: SeoMetadata;
}

export interface CareerRole extends ExperienceRole {
  focus: readonly string[];
}

export interface KnowledgeEntry extends WritingEntry {
  kind: "Essay" | "Operating method";
}

export interface BeyondWorkInterest {
  slug: "kova" | "golf" | "poker" | "ai-ready-rva";
  title: string;
  shortLabel: string;
  summary: string;
  reflection: string;
  externalLink?: string;
}

export interface ExperienceRole {
  organization: string;
  title: string;
  period: string;
  disclosure: DisclosureClassification;
  summary: string;
  themes: readonly string[];
}

export interface EducationEntry {
  institution: string;
  credential: string;
  disclosure: DisclosureClassification;
}

export interface SystemStage {
  id: "intent" | "context" | "plan" | "build" | "evaluate" | "learn";
  label: string;
  question: string;
  description: string;
  artifact: string;
}

export interface SystemsContent {
  disclosure: DisclosureClassification;
  eyebrow: string;
  headline: string;
  introduction: readonly string[];
  flow: readonly SystemStage[];
  operatingRules: readonly {
    title: string;
    description: string;
  }[];
  boundaryNote: string;
  seo: SeoMetadata;
}

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  list?: readonly string[];
  pullQuote?: string;
}

export interface WritingEntry {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  dek: string;
  readingTime: string;
  publishedLabel: string;
  disclosure: DisclosureClassification;
  sections: readonly ArticleSection[];
  closing: readonly string[];
  seo: SeoMetadata;
}

export interface ClaimRecord {
  id: string;
  routes: readonly string[];
  category:
    | "identity"
    | "experience"
    | "project"
    | "practice"
    | "contact"
    | "exclusion";
  source: string;
  proposedPublicCopy: string;
  disclosure: DisclosureClassification;
  approval: ApprovalStatus;
  evidenceNote: string;
  reviewNote: string;
}
