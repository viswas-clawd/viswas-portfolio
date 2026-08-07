import type { ProjectCaseStudy } from "./types";

export const projects = [
  {
    slug: "helios",
    title: "Helios",
    category: "AI-native product development",
    stage: "In development",
    disclosure: "abstracted",
    summary:
      "An in-development product context system that connects research, decisions, requirements, and delivery evidence so AI-assisted product work remains grounded and reviewable.",
    thesis:
      "AI can accelerate product work only when it stays grounded in the product’s actual context—and when its output returns to an accountable human workflow.",
    problem:
      "Product intent is usually fragmented across conversations, research, specifications, task systems, and delivery tools. Each handoff loses reasoning, and generic assistants fill those gaps with plausible assumptions.",
    role:
      "I am shaping the product thesis, operating model, evaluation approach, and end-to-end experience while building and testing the system in my own product practice.",
    approach: [
      "Treat product context as a durable product asset rather than a temporary prompt.",
      "Connect research, decisions, requirements, and delivery artifacts through visible provenance.",
      "Make proposals reviewable before they become actions, and return implementation evidence to the product record.",
      "Evaluate outputs for grounded PM usefulness—not merely fluency or technical completion.",
    ],
    proof: [
      { label: "Status", detail: "In-development product; implementation remains private.", verification: "private-build" },
      { label: "What exists", detail: "A connected product-workflow surface and repeatable evaluation workflows for grounded PM usefulness.", verification: "private-build" },
      { label: "Demonstrates", detail: "Product-context architecture, reviewable agent actions, and evaluation-centered product judgment.", verification: "public-narrative" },
    ],
    principles: [
      "Intent must survive the handoff.",
      "Evidence should travel with the decision.",
      "Automation should return a receipt.",
    ],
    boundaryNote:
      "This case study describes the product problem and operating principles. Architecture, prompts, private repositories, customer data, and internal evaluation material are intentionally withheld.",
    media: {
      kind: "diagram",
      visual: "helios",
      alt: "Research, decisions, and requirements converging into product context and an evaluation receipt.",
    },
    cta: {
      label: "Case study coming soon",
      availability: "comingSoon",
    },
    seo: {
      title: "Helios | Viswas Vuppala",
      description:
        "How Viswas Vuppala approaches AI-native product context, evidence, and accountable agentic product development through Helios.",
      pathname: "/software/helios",
      keywords: [
        "AI product operating system",
        "product context",
        "agentic product development",
        "AI product management",
      ],
    },
  },
  {
    slug: "fedai",
    title: "FedAI",
    category: "Federal GenAI consulting",
    stage: "Founder-led practice",
    disclosure: "abstracted",
    summary:
      "Founder-led federal GenAI consulting focused on approved-source retrieval, privacy, guardrails, auditability, and the path from stakeholder discovery to technical deployment.",
    thesis:
      "Useful public-sector AI needs grounded retrieval, explicit guardrails, auditable behavior, and deployment choices that respect sensitive operating contexts.",
    problem:
      "Teams exploring GenAI in regulated and public-sector settings need to connect useful workflows with privacy, provenance, access controls, and accountable human review.",
    role:
      "As founder and product lead, I translated stakeholder needs into product strategy, retrieval-backed agent workflows, safeguards, evaluation questions, and implementation priorities with technical partners.",
    approach: [
      "Start with the decision and data boundary before choosing model behavior.",
      "Ground responses in approved sources and make provenance visible to reviewers.",
      "Treat privacy, guardrails, auditability, and escalation as product requirements.",
      "Use stakeholder feedback to connect deployment realities back to the roadmap.",
    ],
    proof: [
      { label: "Status", detail: "Founder-led consulting practice; public narrative only.", verification: "public-narrative" },
      { label: "What exists", detail: "Privacy-preserving, retrieval-backed agent workflows and technical delivery work; implementation and client material remain private.", verification: "private-build" },
      { label: "Demonstrates", detail: "Stakeholder-to-deployment translation in policy-sensitive environments.", verification: "public-narrative" },
    ],
    principles: [
      "Privacy is a product constraint, not a post-launch review.",
      "Grounding and provenance make review possible.",
      "Deployment feedback should shape the product roadmap.",
    ],
    boundaryNote:
      "The repository, source code, prompts, configurations, client material, proprietary architecture, credentials, and implementation details are not public.",
    media: {
      kind: "diagram",
      visual: "fedai",
      alt: "Approved sources moving through retrieval and guardrails into audit review.",
    },
    cta: { label: "Case study coming soon", availability: "comingSoon" },
    seo: {
      title: "FedAI: Public-Safe Federal GenAI Work | Viswas Vuppala",
      description:
        "A public-safe account of Viswas Vuppala's founder and product leadership across privacy-preserving agent workflows, retrieval, guardrails, and auditability.",
      pathname: "/software/fedai",
      keywords: ["federal GenAI", "privacy-preserving AI", "agent guardrails", "AI auditability"],
    },
  },
  {
    slug: "awardlens",
    title: "AwardLens",
    category: "Decision-support prototype",
    stage: "Prototype",
    disclosure: "comingSoon",
    summary:
      "A fixture-backed travel decision prototype for comparing availability, transfer paths, and points tradeoffs without presenting uncertain inventory as fact.",
    thesis:
      "A useful travel tool should help someone reason about options, not simply return a longer list of results.",
    problem:
      "Award travel decisions combine availability, points value, transfer paths, timing, and personal constraints. The information is fragmented, while apparent availability can be incomplete or stale.",
    role:
      "I am defining the decision model, product experience, experiment design, and trust boundaries for a focused prototype.",
    approach: [
      "Organize options around the traveler’s decision rather than the source system’s data model.",
      "Keep fixture-backed prototype states visibly distinct from live availability.",
      "Show the relevant points and transfer context without presenting a recommendation as certainty.",
      "Use bounded experiments to learn which alerts and comparisons reduce decision friction.",
    ],
    proof: [
      { label: "Status", detail: "Fixture-backed local prototype; no live inventory claim.", verification: "local-prototype" },
      { label: "What exists", detail: "Local flows for search, comparison, route watching, and alert experiments.", verification: "local-prototype" },
      { label: "Demonstrates", detail: "Decision framing, uncertainty disclosure, and bounded product experimentation.", verification: "public-narrative" },
    ],
    principles: [
      "Decision support beats result volume.",
      "Availability needs a timestamp and a source.",
      "Prototype data must look like prototype data.",
    ],
    boundaryNote:
      "The current experience uses controlled fixture data for product testing. It is not a representation of live award inventory, and no private repository is linked.",
    media: {
      kind: "diagram",
      visual: "awardlens",
      alt: "Travel options compared by confidence and points path.",
    },
    cta: {
      label: "Case study coming soon",
      availability: "comingSoon",
    },
    seo: {
      title: "AwardLens | Viswas Vuppala",
      description:
        "A public-safe look at AwardLens, Viswas Vuppala’s award-search and points-decision product prototype.",
      pathname: "/software/awardlens",
      keywords: [
        "award travel product",
        "points decision support",
        "AI product prototype",
        "product experimentation",
      ],
    },
  },
  {
    slug: "chatter",
    title: "Chatter",
    category: "Adaptive agent coordination",
    stage: "Local prototype",
    disclosure: "comingSoon",
    summary:
      "A local prototype for dependency-aware agent coordination: when peer work changes an active plan, the affected agent can verify what happened, adapt within its existing authority, and publish a reconciliation receipt.",
    thesis:
      "Agent awareness and messaging are not enough. Useful coordination should help an affected agent verify completed work, re-strategize within scope, and leave causal evidence of the adaptation.",
    problem:
      "Parallel agents can exchange updates while their plans quietly drift apart. Without dependency-aware verification and a clear working-contract revision, a team can move faster while becoming less coherent.",
    role:
      "I am defining the coordination model, authority boundaries, reconciliation workflow, and evidence needed to explain why an agent changed its plan.",
    approach: [
      "Verify completed peer work before treating a message as a planning dependency.",
      "Identify which active assumptions, tasks, or sequencing decisions the completed work affects.",
      "Let the affected agent revise its strategy only within its existing authority and scope.",
      "Publish the revised working contract and a reconciliation receipt that ties the adaptation to its cause.",
    ],
    proof: [
      { label: "Status", detail: "Local prototype; an end-to-end live Codex-to-Claude workflow remains unproven.", verification: "local-prototype" },
      { label: "What exists", detail: "A real local SQLite-backed service and dependency-matching workflow exercised through simulated agent sessions.", verification: "local-prototype" },
      { label: "Demonstrates", detail: "Dependency-aware reconciliation, scoped re-planning, and causal receipts for agent adaptation.", verification: "public-narrative" },
    ],
    principles: [
      "A notification is not a reconciled plan.",
      "Adaptation must stay inside existing authority.",
      "A changed strategy should explain what caused it.",
    ],
    boundaryNote:
      "The local demo uses real SQLite and service code with simulated agent sessions. It does not prove a live multi-provider Codex-to-Claude workflow, and private runtime data, logs, and implementation details are not published.",
    media: {
      kind: "diagram",
      visual: "chatter",
      alt: "Completed peer work affecting a dependency, causing scoped re-strategizing and a reconciliation receipt.",
    },
    cta: {
      label: "Case study coming soon",
      availability: "comingSoon",
    },
    seo: {
      title: "Chatter: Adaptive Agent Coordination | Viswas Vuppala",
      description:
        "A public-safe look at Chatter, Viswas Vuppala’s local prototype for dependency-aware agent adaptation and reconciliation receipts.",
      pathname: "/software/chatter",
      keywords: [
        "agent coordination",
        "multi-agent systems",
        "dependency-aware planning",
        "agent reconciliation receipts",
      ],
    },
  },
] as const satisfies readonly ProjectCaseStudy[];

export const projectIndexSeo = {
  title: "Software | Viswas Vuppala",
  description:
    "Selected work from Viswas Vuppala across AI-native product development, regulated GenAI, decision support, and adaptive agent coordination.",
  pathname: "/software",
  keywords: [
    "AI product portfolio",
    "GenAI product management",
    "agentic systems",
    "context engineering",
  ],
} as const;

export const projectIndexIntro = {
  eyebrow: "Software systems",
  headline: "Emerging AI capabilities shaped into useful, trustworthy products.",
  description:
    "A public view of the product judgments, experiments, and systems behind my work. Detailed case studies are coming soon; private implementation, data, and operating material remain behind the boundary.",
} as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
