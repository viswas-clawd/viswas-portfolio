import { agentsAreCustomers } from "./essays/agents-are-customers";
import { chatterAdaptiveAgentCoordination } from "./essays/chatter-adaptive-agent-coordination";
import { contextIsProductArchitecture } from "./essays/context-is-product-architecture";
import { physicalAiHardwareSoftwareCodesign } from "./essays/physical-ai-hardware-software-codesign";
import type { KnowledgeEntry } from "./types";

export const knowledgeEntries = [
  { ...contextIsProductArchitecture, kind: "Essay" },
  { ...chatterAdaptiveAgentCoordination, kind: "Essay" },
  { ...agentsAreCustomers, kind: "Essay" },
  { ...physicalAiHardwareSoftwareCodesign, kind: "Essay" },
] as const satisfies readonly KnowledgeEntry[];

export function getKnowledgeEntry(slug: string) {
  return knowledgeEntries.find((entry) => entry.slug === slug);
}
