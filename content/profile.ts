import type { SiteProfile } from "./types";

export const siteProfile = {
  name: "Viswas Vuppala",
  role: "AI product leader and technical product builder",
  disclosure: "abstracted",
  eyebrow: "Generative AI · Product judgment · Cross-functional leadership",
  headline: "I turn emerging GenAI capabilities into useful, trustworthy products.",
  introduction:
    "I lead 0→1 GenAI product work by connecting customer and developer needs with technical judgment, evidence, and cross-functional execution.",
  shortBio:
    "I translate customer and developer needs into strategy, roadmaps, technical requirements, evaluation plans, and product decisions that cross-functional teams can execute.",
  about: [
    "I’m a product leader and builder focused on the judgment between an emerging model capability and a dependable product: which customer problem matters, what the system should do, how teams will know it works, and where human control belongs.",
    "My work has crossed enterprise GenAI, data and analytics platforms, federal modernization, founder-led consulting, and early-stage software. The common thread is translating messy workflows into clear product intent and making sure the resulting system can show its work.",
    "I stay close to the artifacts and the people using them. I move from customer and developer needs to grounded research, roadmap decisions, integrations, a testable build, evaluations, and an evidence-backed review. The discipline is to preserve intent, expose uncertainty, and keep a human decision point where judgment matters.",
    "This site shares the public surface of that practice. It explains the problems, product choices, and lessons without publishing proprietary implementation details, private data, or internal operating material.",
  ],
  capabilities: [
    "0→1 agent and platform product strategy",
    "Enterprise deployment, APIs, and integrations",
    "Context engineering, retrieval, and grounding",
    "Agent evaluations, safeguards, and guardrails",
    "Customer and developer discovery",
    "Cross-functional leadership across engineering, research, policy, design, and risk",
  ],
  principles: [
    {
      title: "Context before capability",
      description:
        "The quality of an AI product is bounded by the quality, ownership, and permissions of the context it can use.",
    },
    {
      title: "Determinism where trust matters",
      description:
        "I reserve model judgment for the work that needs it and use explicit rules for policy, permissions, and irreversible actions.",
    },
    {
      title: "Evidence before AI theater",
      description:
        "A polished response is not proof. I look for provenance, evaluation, failure visibility, and an accountable decision trail.",
    },
  ],
  proofSignals: ["Customer-centered GenAI", "Technical product judgment", "Trustworthy product systems", "Founder and operator"],
  glyphVocabulary: ["AGENTS", "API", "MCP", "CONTEXT", "EVALS", "SAFEGUARDS", "SHIP"],
  signalResolution: ["GROUND", "EVALUATE", "SAFEGUARD", "SHIP"],
  primaryCta: {
    label: "Explore selected work",
    href: "/software",
    external: false,
  },
  secondaryCta: {
    label: "Review career",
    href: "/career",
    external: false,
  },
  contact: {
    label: "Start a conversation",
    href: "https://www.linkedin.com/in/viswasv/",
    external: true,
  },
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/viswasv/",
      external: true,
    },
    {
      label: "GitHub",
      href: "https://github.com/viswas-clawd",
      external: true,
    },
  ],
  closingStatement:
    "Building AI systems grounded in how people actually work.",
  seo: {
    title: "Viswas Vuppala | AI Product & Agentic Systems Leader",
    description:
      "Viswas Vuppala is a GenAI product leader turning customer and developer needs into useful, trustworthy products through technical judgment and cross-functional execution.",
    pathname: "/",
    keywords: [
      "AI product leader",
      "agent platform product manager",
      "API product manager",
      "technical deployment",
      "context engineering",
      "agentic systems",
      "enterprise GenAI",
      "AI grounding and evaluation",
      "AI safeguards",
      "0→1 AI product strategy",
    ],
  },
} as const satisfies SiteProfile;

export const closingStatement = siteProfile.closingStatement;
