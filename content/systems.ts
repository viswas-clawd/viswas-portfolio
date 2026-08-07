import type { SystemsContent } from "./types";

export const systemsContent = {
  disclosure: "abstracted",
  eyebrow: "AI product operating system",
  headline: "A workflow that keeps intent connected to evidence.",
  introduction: [
    "I do not treat AI as a separate brainstorm box. I use it inside a controlled product loop where every stage produces an artifact the next stage can inspect.",
    "The point is not maximum automation. The point is higher-quality judgment with less context loss: the system proposes, the evidence stays attached, and a person remains accountable for the consequential decisions.",
  ],
  flow: [
    {
      id: "intent",
      label: "Intent",
      question: "What are we trying to change—and for whom?",
      description:
        "Start with the user, constraint, desired outcome, and non-goals. Ambiguity is recorded rather than silently converted into a requirement.",
      artifact: "Intent brief",
    },
    {
      id: "context",
      label: "Context",
      question: "What evidence may the system use?",
      description:
        "Assemble approved sources, provenance, ownership, freshness, permissions, and known gaps before asking a model to reason.",
      artifact: "Context contract",
    },
    {
      id: "plan",
      label: "Plan",
      question: "What decisions and tests will move the work forward?",
      description:
        "Turn intent into a bounded plan with explicit tradeoffs, review gates, disclosure constraints, and observable success criteria.",
      artifact: "Decision-ready plan",
    },
    {
      id: "build",
      label: "Build",
      question: "How do we preserve intent through execution?",
      description:
        "Generate or implement against the approved plan, keeping changes inspectable and separating public artifacts from private operating material.",
      artifact: "Reviewable increment",
    },
    {
      id: "evaluate",
      label: "Evaluate",
      question: "Is the result grounded, useful, and safe to act on?",
      description:
        "Check provenance, expected behavior, failure states, accessibility, and product usefulness—not just whether the system returned an answer.",
      artifact: "Evaluation receipt",
    },
    {
      id: "learn",
      label: "Learn",
      question: "What should change in the product or operating system?",
      description:
        "Return validated outcomes, unresolved questions, and decisions to durable context so the next cycle begins with better information.",
      artifact: "Updated product record",
    },
  ],
  operatingRules: [
    {
      title: "Proposals before consequential actions",
      description:
        "The system can accelerate analysis and preparation, but external publication, sensitive changes, and high-impact decisions require a clear human gate.",
    },
    {
      title: "Receipts over status theater",
      description:
        "Completion means a verifiable artifact, test, or external-state check—not a progress badge or a fluent summary.",
    },
    {
      title: "Selected evidence, private implementation",
      description:
        "Public case studies are written deliberately. Private prompts, local paths, logs, memory, credentials, and proprietary implementation details never flow into them automatically.",
    },
    {
      title: "Capability labels stay honest",
      description:
        "I describe what a system currently does, distinguish prototypes from live products, and make limitations visible where users make decisions.",
    },
  ],
  boundaryNote:
    "This is a sanitized operating model. It does not expose personal information, stored memory, prompts, private configurations, credentials, logs, or proprietary system architecture.",
  seo: {
    title: "AI Product Operating System | Viswas Vuppala",
    description:
      "How Viswas Vuppala connects intent, approved context, planning, building, evaluation, and learning in a grounded AI product workflow.",
    pathname: "/knowledge",
    keywords: [
      "AI product operating system",
      "AI-assisted product management",
      "context engineering workflow",
      "AI evaluation",
      "agentic systems governance",
    ],
  },
} as const satisfies SystemsContent;
