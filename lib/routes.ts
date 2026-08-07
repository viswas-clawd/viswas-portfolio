import type { PageSeo } from "./types";

export const ROUTES = {
  home: "/",
  software: "/software",
  helios: "/software/helios",
  fedai: "/software/fedai",
  awardLens: "/software/awardlens",
  chatter: "/software/chatter",
  hardware: "/hardware",
  zynerTreaty: "/hardware/zyner-treaty",
  career: "/career",
  knowledge: "/knowledge",
  contextIsProductArchitecture: "/knowledge/context-is-product-architecture",
  chatterAdaptiveAgentCoordination: "/knowledge/chatter-adaptive-agent-coordination",
  agentsAreCustomers: "/knowledge/agents-are-customers",
  physicalAiHardwareSoftwareCodesign: "/knowledge/physical-ai-hardware-software-codesign",
  legacyAuthenticAiSystemsExposeBoundaries: "/knowledge/authentic-ai-systems-expose-boundaries",
  legacyIntentShouldSurviveExecution: "/knowledge/intent-should-survive-execution",
  beyondWork: "/beyond-work",
  llm: "/llm.txt",
} as const;

export type SiteRoute = (typeof ROUTES)[keyof typeof ROUTES];

export const PRIMARY_NAVIGATION = [
  { label: "Software", href: ROUTES.software },
  { label: "Hardware", href: ROUTES.hardware },
  { label: "Career", href: ROUTES.career },
  { label: "Knowledge", href: ROUTES.knowledge },
  { label: "Beyond Work", href: ROUTES.beyondWork },
] as const;

export const SOFTWARE_ROUTES = [
  ROUTES.helios,
  ROUTES.fedai,
  ROUTES.awardLens,
  ROUTES.chatter,
] as const;

export const KNOWLEDGE_ROUTES = [
  ROUTES.contextIsProductArchitecture,
  ROUTES.chatterAdaptiveAgentCoordination,
  ROUTES.agentsAreCustomers,
  ROUTES.physicalAiHardwareSoftwareCodesign,
] as const;

export const LEGACY_KNOWLEDGE_REDIRECTS = {
  [ROUTES.legacyAuthenticAiSystemsExposeBoundaries]: ROUTES.chatterAdaptiveAgentCoordination,
  [ROUTES.legacyIntentShouldSurviveExecution]: ROUTES.physicalAiHardwareSoftwareCodesign,
} as const;

export interface RouteDefinition {
  path: SiteRoute;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}

export const SITE_ROUTES: readonly RouteDefinition[] = [
  { path: ROUTES.home, changeFrequency: "monthly", priority: 1 },
  { path: ROUTES.software, changeFrequency: "monthly", priority: 0.9 },
  { path: ROUTES.hardware, changeFrequency: "monthly", priority: 0.8 },
  { path: ROUTES.career, changeFrequency: "monthly", priority: 0.9 },
  { path: ROUTES.knowledge, changeFrequency: "monthly", priority: 0.8 },
  ...KNOWLEDGE_ROUTES.map((path) => ({ path, changeFrequency: "yearly" as const, priority: 0.7 })),
  { path: ROUTES.beyondWork, changeFrequency: "yearly", priority: 0.6 },
  { path: ROUTES.llm, changeFrequency: "monthly", priority: 0.8 },
] as const;

export const ROUTE_SEO = {
  [ROUTES.home]: {
    title: "Viswas Vuppala | AI Product Leader",
    description:
      "GenAI product leader turning customer and developer needs into useful, trustworthy products through technical judgment and cross-functional execution.",
    path: ROUTES.home,
  },
  [ROUTES.software]: {
    title: "Software | Viswas Vuppala",
    description:
      "Public-safe project briefs across product context, regulated GenAI, decision support, and adaptive agent coordination. Detailed case studies are coming soon.",
    path: ROUTES.software,
  },
  [ROUTES.helios]: { title: "Helios | Viswas Vuppala", description: "A public-safe case study of an AI-native product context system carrying intent, evidence, evaluation, and decisions through delivery.", path: ROUTES.helios },
  [ROUTES.fedai]: { title: "FedAI | Viswas Vuppala", description: "A public-safe account of privacy-preserving federal GenAI workflows, retrieval, guardrails, auditability, and founder-led product work.", path: ROUTES.fedai },
  [ROUTES.awardLens]: { title: "AwardLens | Viswas Vuppala", description: "A fixture-backed decision-support prototype for reasoning about award travel options, provenance, and uncertainty.", path: ROUTES.awardLens },
  [ROUTES.chatter]: { title: "Chatter | Viswas Vuppala", description: "A local prototype exploring dependency-aware agent adaptation, scoped re-strategizing, and reconciliation receipts.", path: ROUTES.chatter },
  [ROUTES.hardware]: { title: "Hardware | Viswas Vuppala", description: "A playful pre-build physical-AI experiment pairing model capability with deterministic control, explicit authority, and hardware safety boundaries.", path: ROUTES.hardware },
  [ROUTES.zynerTreaty]: { title: "Zyner + Treaty | Viswas Vuppala", description: "A pre-build local-first rover concept with separate safety-bounded treat and adult handoff paths.", path: ROUTES.zynerTreaty },
  [ROUTES.career]: { title: "Career | Viswas Vuppala", description: "Selected career experience across enterprise GenAI, federal AI consulting, data platforms, public-sector modernization, and founder-led software.", path: ROUTES.career },
  [ROUTES.knowledge]: { title: "Knowledge | Viswas Vuppala", description: "First-person product thinking on GenAI context, adaptive agent coordination, agent experience, and physical AI.", path: ROUTES.knowledge },
  [ROUTES.contextIsProductArchitecture]: { title: "Context Is Product Architecture: How Helios Builds Living Product Memory", description: "A public-safe look at the Helios loop from research and decisions through requirements, delivery evidence, evaluation, and verified learning.", path: ROUTES.contextIsProductArchitecture },
  [ROUTES.chatterAdaptiveAgentCoordination]: { title: "Agents Should Re-strategize When the Work Changes", description: "Why agent coordination requires verified dependencies, scoped re-strategizing, and causal reconciliation receipts—not awareness alone.", path: ROUTES.chatterAdaptiveAgentCoordination },
  [ROUTES.agentsAreCustomers]: { title: "Your Next Customer Might Be an AI Agent", description: "A product-management framework for agent findability, understandability, usability, trust, and measurement.", path: ROUTES.agentsAreCustomers },
  [ROUTES.physicalAiHardwareSoftwareCodesign]: { title: "Physical AI Is a Hardware-Software Product", description: "What Zyner reveals about co-designing perception, interaction, mechanics, power, software, layered safety, and staged validation.", path: ROUTES.physicalAiHardwareSoftwareCodesign },
  [ROUTES.legacyAuthenticAiSystemsExposeBoundaries]: { title: "Agents Should Re-strategize When the Work Changes", description: "Permanent redirect to the Chatter adaptive-agent coordination essay.", path: ROUTES.legacyAuthenticAiSystemsExposeBoundaries },
  [ROUTES.legacyIntentShouldSurviveExecution]: { title: "Physical AI Is a Hardware-Software Product", description: "Permanent redirect to the physical-AI hardware-software co-design essay.", path: ROUTES.legacyIntentShouldSurviveExecution },
  [ROUTES.beyondWork]: { title: "Beyond Work | Viswas Vuppala", description: "Kova, golf, poker, and AI Ready RVA—the practices and community that keep Viswas active, reflective, and connected.", path: ROUTES.beyondWork },
  [ROUTES.llm]: { title: "Markdown Portfolio | Viswas Vuppala", description: "A one-to-one Markdown version of Viswas Vuppala's public portfolio with direct source URLs.", path: ROUTES.llm },
} as const satisfies Record<SiteRoute, PageSeo>;
