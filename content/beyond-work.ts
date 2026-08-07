import type { BeyondWorkInterest } from "./types";

export const aiReadyRvaAffiliation = {
  name: "AI Ready RVA",
  url: "https://www.aireadyrva.com/cohorts/product-ai",
  role: "Volunteer, Product & AI Cohort",
  description:
    "I volunteer with AI Ready RVA’s Product & AI Cohort, helping product managers apply AI tools and practical best practices across the product development cycle.",
} as const;

export const beyondWork = [
  {
    slug: "kova",
    title: "Kova, my golden retriever",
    shortLabel: "Kova",
    summary: "Kova gets me outside, keeps me moving, and makes an ordinary day more fun.",
    reflection: "Most days, he is simply very good company.",
  },
  {
    slug: "golf",
    title: "Golf",
    shortLabel: "Golf",
    summary: "Golf gives me a few quiet hours outside with friends and room to think.",
    reflection: "I like the walks, the good shots, the terrible ones, and the conversations in between.",
  },
  {
    slug: "poker",
    title: "Poker",
    shortLabel: "Poker",
    summary: "Poker is one of my favorite ways to spend an evening with friends.",
    reflection: "I enjoy reading the table, living with uncertainty, and laughing when the cards have other plans.",
  },
  {
    slug: "ai-ready-rva",
    title: "AI Ready RVA",
    shortLabel: "AI Ready RVA",
    summary: aiReadyRvaAffiliation.description,
    reflection: "I value the chance to help other product managers build confidence with AI in their day-to-day work.",
    externalLink: aiReadyRvaAffiliation.url,
  },
] as const satisfies readonly BeyondWorkInterest[];
