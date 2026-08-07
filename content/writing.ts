import { agentsAreCustomers } from "./essays/agents-are-customers";
import { chatterAdaptiveAgentCoordination } from "./essays/chatter-adaptive-agent-coordination";
import { contextIsProductArchitecture } from "./essays/context-is-product-architecture";
import { physicalAiHardwareSoftwareCodesign } from "./essays/physical-ai-hardware-software-codesign";

export const writingEntries = [
  contextIsProductArchitecture,
  chatterAdaptiveAgentCoordination,
  agentsAreCustomers,
  physicalAiHardwareSoftwareCodesign,
] as const;

export const writingIndexIntro = {
  eyebrow: "Field notes",
  headline: "Ideas for building creative, useful, and accountable GenAI products.",
  description:
    "First-person product thinking on living context, adaptive coordination, agent experience, and physical AI.",
} as const;

export const writingIndexSeo = {
  title: "Writing on AI Product Systems | Viswas Vuppala",
  description:
    "Original frameworks from Viswas Vuppala on context engineering, grounded AI products, agentic systems, evaluation, and AI governance.",
  pathname: "/knowledge",
  keywords: [
    "AI product writing",
    "context engineering",
    "agentic systems",
    "AI governance",
    "AI product management",
  ],
} as const;

export function getWritingEntry(slug: string) {
  return writingEntries.find((entry) => entry.slug === slug);
}
