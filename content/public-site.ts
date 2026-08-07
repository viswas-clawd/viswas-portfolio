import type { ProjectVisualKey } from "./types";

export const heroContent = {
  eyebrow: "Viswas Vuppala / GenAI product leader",
  headline: "I turn emerging GenAI capabilities into useful, trustworthy products.",
  introduction:
    "I connect customer and developer needs with technical judgment, cross-functional leadership, and hands-on experimentation—from early idea to accountable product decisions.",
  destinations: [
    { index: "01", title: "Software", descriptor: "Agent and product systems", href: "/software" },
    { index: "02", title: "Hardware", descriptor: "Offline and safety-bounded", href: "/hardware" },
    { index: "03", title: "Career", descriptor: "Roles, scope, and skills", href: "/career" },
    { index: "04", title: "Knowledge", descriptor: "Frameworks and methods", href: "/knowledge" },
    { index: "05", title: "Beyond Work", descriptor: "Kova, golf, poker, and AI Ready RVA", href: "/beyond-work" },
  ],
} as const;

export const capabilityMapContent = {
  ariaLabel: "Capabilities connected through zero-to-one generative AI product leadership",
  centerLabel: "Operating center",
  centerTitle: "0→1 GenAI Product Leadership",
  capabilities: [
    {
      key: "strategy",
      title: "Product strategy",
      description: "Customer and developer needs into product theses and roadmaps.",
    },
    {
      key: "context",
      title: "Context and systems",
      description: "Model capabilities and constraints into requirements and workflows.",
    },
    {
      key: "trust",
      title: "Evaluation and trust",
      description: "Observable quality, failure modes, and release decisions.",
    },
    {
      key: "leadership",
      title: "Cross-functional leadership",
      description: "Product, engineering, design, data science, research, risk, legal, and operations.",
    },
    {
      key: "building",
      title: "Hands-on building",
      description: "Prototypes, APIs, data, and modern AI development tools.",
    },
  ],
} as const;

export const publicPageContent = {
  home: {
    route: "/",
    overview: {
      label: "01 / Overview",
      heading: "From ambitious GenAI ideas to products people can trust and teams can execute.",
      description:
        "I translate customer and developer needs into strategy, roadmaps, technical requirements, evaluation plans, and product decisions that cross-functional teams can execute.",
      links: [
        { label: "Review software", href: "/software" },
        { label: "Review career", href: "/career" },
      ],
    },
    selectedProof: {
      label: "02 / Selected proof",
      heading: "Three ways I turn emerging capability into useful product systems.",
      description: "Each project makes the customer problem, product judgment, evidence, and current boundary visible.",
      hardwareCategory: "Physical AI experiment",
      status: "Case study coming soon",
      links: [
        { label: "All software", href: "/software" },
        { label: "All hardware", href: "/hardware" },
      ],
    },
    bridge: {
      label: "03 / Career + knowledge",
      heading: "Innovative GenAI product leadership—and the ideas behind it.",
      career: {
        label: "Career",
        heading:
          "Enterprise-scale GenAI, context and grounding platforms, regulated product leadership, and founder-led 0→1 work.",
        description:
          "I have led enterprise GenAI and context-grounding products, shaped federal AI consulting work, built data and analytics experiences, supported public-sector modernization, and founded 0→1 software—translating emerging capability into decisions cross-functional teams can execute.",
        link: { label: "Read the on-page résumé", href: "/career" },
      },
      knowledge: {
        label: "Knowledge",
        heading: "How I apply GenAI to product management, agent experience, adaptive coordination, and physical systems.",
        description: "First-person arguments and practical methods grounded in product work and primary research.",
        link: { label: "Read frameworks and methods", href: "/knowledge" },
      },
    },
    beyondWork: {
      label: "04 / Beyond Work",
      heading: "Kova, golf, poker, and AI Ready RVA.",
      description:
        "What keeps me active, reflective, connected to community, and comfortable making decisions with incomplete information.",
      link: { label: "Meet the person beyond the product work", href: "/beyond-work" },
    },
    handoff: {
      label: "05 / Recruiter handoff",
      heading: "The full portfolio, in Markdown.",
      description:
        "A one-to-one text version of the public site for recruiters and AI agents, with direct URLs to every deeper page.",
      link: { label: "Open /llm.txt", href: "/llm.txt" },
      contactLabel: "LinkedIn",
    },
  },
  software: {
    route: "/software",
    register: ["Selected work", "Software", "Four project briefs"],
    kicker: "Product judgment / Evidence / Boundaries",
    supporting:
      "Helios, FedAI, AwardLens, and Chatter demonstrate different ways to frame decisions, evidence, and trust.",
    sectionHeading: "Software projects",
    status: "Coming soon",
  },
  hardware: {
    route: "/hardware",
    register: ["Hands-on experiment", "Hardware", "Pre-build"],
    kicker: "Playful physical AI / Safety-bounded control",
    heading: "A fun way to bring Kova a treat—or give myself one.",
    introduction:
      "Zyner + Treaty explores how perception and language can make a small rover useful while deterministic controls govern motion and dispensing.",
    boundary: "The image and system are pre-build concepts—not constructed, tested, or safety validated.",
    status: "Coming soon",
  },
  career: {
    route: "/career",
    register: ["On-page résumé", "Five roles", "LinkedIn available"],
    kicker: "Career / Innovative GenAI product leadership",
    heading: "Creative GenAI solutions, grounded in customer needs and built for real workflows.",
    introduction:
      "I translate customer and developer needs into strategy, technical requirements, evaluation plans, and product decisions that cross-functional teams can execute.",
    summary:
      "My experience spans enterprise GenAI, federal consulting, data and analytics products, public-sector modernization, and founder-led 0→1 software.",
    contactLabel: "Continue on LinkedIn",
    roles: { label: "Selected roles", heading: "Product leadership across different stakes." },
    skills: { label: "Technical + product skills", heading: "Close enough to the work to make good tradeoffs." },
    education: { label: "Education + certification", heading: "Engineering roots. Product judgment." },
    links: {
      label: "Evidence routes",
      items: [
        { label: "Software cases", href: "/software" },
        { label: "Knowledge and methods", href: "/knowledge" },
      ],
    },
  },
  knowledge: {
    route: "/knowledge",
    register: ["Original writing", "Knowledge", "Four essays"],
    kicker: "GenAI product management / Agent experience / Physical AI",
    heading: "Ideas for building creative, useful, and accountable GenAI products.",
    introduction: "First-person arguments and practical methods grounded in product work and primary research.",
    boundary: "Written for direct evaluation without publishing proprietary operating material.",
    indexLabel: "Index",
    indexHeading: "Ideas worth evaluating directly.",
    typeLabel: "Type",
    lengthLabel: "Length",
    readLabel: "Read",
  },
  beyondWork: {
    route: "/beyond-work",
    register: ["Beyond the work", "Beyond Work", "Kova / Golf / Poker / AI Ready RVA"],
    kicker: "Energy / Reflection / Community",
    heading: "Kova, golf, poker, and AI Ready RVA.",
    introduction: "Kova keeps me active. Golf gives me space to think. Poker keeps me honest about incomplete information.",
    community: "AI Ready RVA keeps me connected to product peers who are learning how to put AI to practical use.",
    externalLinkLabel: "Visit the Product & AI Cohort",
    links: {
      label: "Back to the work",
      items: [
        { label: "Software", href: "/software" },
        { label: "Career", href: "/career" },
      ],
    },
  },
  article: {
    indexLabel: "Knowledge index",
    authorLabel: "Author",
    author: "Viswas Vuppala",
    typeLabel: "Type",
    readingTimeLabel: "Reading time",
    closingHeading: "Closing signal",
  },
} as const;

export const projectVisualContent = {
  helios: {
    labels: [["RESEARCH"], ["DECISIONS"], ["REQUIREMENTS"], ["PRODUCT", "CONTEXT"], ["EVALUATION", "RECEIPT"]],
  },
  fedai: {
    labels: [["APPROVED", "SOURCES"], ["RETRIEVE"], ["GUARDRAILS"], ["AUDIT", "REVIEW"]],
  },
  awardlens: {
    labels: [["OPTION CONFIDENCE"], ["POINTS PATH"], ["COMPARE"]],
  },
  chatter: {
    labels: [
      ["COMPLETED", "PEER WORK"],
      ["AFFECTED", "DEPENDENCY"],
      ["AGENT", "RE-STRATEGIZES", "WITHIN SCOPE"],
      ["REVISED WORKING", "CONTRACT +", "RECONCILIATION", "RECEIPT"],
    ],
  },
  "zyner-treaty": {
    labels: [["RASPBERRY PI", "OFFLINE CONTROL"], ["ZYNER / LOCK"], ["TREATY / INTERLOCK"], ["INDEPENDENT CONTROL"]],
  },
} as const satisfies Record<ProjectVisualKey, { labels: readonly (readonly string[])[] }>;
