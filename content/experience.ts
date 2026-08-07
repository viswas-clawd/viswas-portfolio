import type { CareerRole, EducationEntry } from "./types";

export const experienceIntro =
  "Five selected roles across enterprise AI, federal GenAI consulting, data products, public-sector modernization, and founder-led software. Dates are shown; outcome and scale metrics are intentionally omitted.";

export const experience = [
  {
    organization: "Capital One",
    title: "Manager, Product Management - GenAI Servicing",
    period: "July 2025 - Present",
    disclosure: "abstracted",
    summary:
      "Leads product work for enterprise GenAI servicing, connecting customer and associate needs with grounded model behavior, platform priorities, evaluations, and governance in a regulated environment.",
    themes: ["Enterprise GenAI", "Platform strategy", "Grounding and evaluation", "Regulated delivery"],
    focus: [
      "Turn regulated service workflows into roadmap priorities, grounded model behavior, and testable quality and safeguard requirements.",
      "Lead delivery across engineering, design, data science, risk, legal, operations, and product; manage and mentor PMs.",
    ],
  },
  {
    organization: "FedAI",
    title: "Founder - Federal GenAI Consulting",
    period: "March 2024 - July 2025",
    disclosure: "abstracted",
    summary:
      "Founded a federal GenAI consulting practice focused on privacy-preserving agentic workflows, retrieval, guardrails, auditability, and the technical path from discovery to deployment.",
    themes: ["Founder leadership", "Agentic workflows", "Privacy and guardrails", "Technical deployment"],
    focus: [
      "Translated stakeholder needs into product strategy and technical delivery for privacy-preserving, retrieval-backed agent workflows.",
      "Connected approved sources, role-based access, guardrails, citations, auditability, and human review to deployment decisions.",
    ],
  },
  {
    organization: "Capital One",
    title: "Senior Product Manager - B2B Data & AI Analytics",
    period: "December 2022 - March 2024",
    disclosure: "abstracted",
    summary:
      "Led product development for enterprise data and AI analytics, turning complex data and model capabilities into clearer workflows for business users.",
    themes: ["B2B platform strategy", "Data and AI products", "Customer discovery", "Roadmap execution"],
    focus: [
      "Led a B2B data and AI analytics platform that put model capabilities behind a no-code workflow.",
      "Connected customer discovery, platform constraints, and cross-functional delivery from roadmap through iteration.",
    ],
  },
  {
    organization: "Federal Maritime Commission",
    title: "Solutions Manager",
    period: "December 2021 - December 2022",
    disclosure: "public",
    summary:
      "Led modernization work across legacy applications and helped define secure, cloud-ready paths for analyst and operational workflows.",
    themes: ["Public-sector modernization", "Workflow integration", "Cloud strategy", "Security tradeoffs"],
    focus: [
      "Led agency-wide modernization from fragmented legacy workflows to secure, cloud-ready solutions.",
      "Evaluated cloud, integration, security, and adoption tradeoffs with technical and operational stakeholders.",
    ],
  },
  {
    organization: "Steelbasis",
    title: "Co-Founder & VP of Product",
    period: "February 2020 - December 2021",
    disclosure: "public",
    summary:
      "Co-founded a B2B software product for vendor and contract workflows in real-estate development, moving from problem discovery through product delivery and customer learning.",
    themes: ["0→1 product development", "Founder-led discovery", "B2B SaaS", "Document workflows"],
    focus: [
      "Co-founded and led product for B2B vendor and contract workflows from discovery through delivery.",
      "Worked directly with customers to turn document-heavy operations into a focused 0→1 product.",
    ],
  },
] as const satisfies readonly CareerRole[];

export const education = [
  {
    institution: "UC Berkeley Haas",
    credential: "Product Management Certification in AI & Machine Learning",
    disclosure: "public",
  },
  {
    institution: "Virginia Commonwealth University",
    credential: "B.S. Engineering",
    disclosure: "public",
  },
] as const satisfies readonly EducationEntry[];

export const technicalSkills = {
  aiSystems: [
    "LLMs and agent workflows",
    "Context engineering and RAG",
    "Agent evaluations, guardrails, and provenance",
    "Model deployment and MLOps",
  ],
  product: [
    "0→1 product strategy",
    "Platform roadmaps and operating models",
    "Customer and developer discovery",
    "Cross-functional product leadership",
  ],
  technical: [
    "Python, SQL, and React",
    "AWS and GCP",
    "Docker and Kubernetes",
    "AI developer workflows: Codex, Claude Code, and Cursor",
    "Figma and product delivery tooling",
  ],
} as const;

export const experienceSeo = {
  title: "Career | Viswas Vuppala",
  description:
    "Viswas Vuppala's selected career across enterprise GenAI, federal AI consulting, data platforms, public-sector modernization, and founder-led software.",
  pathname: "/career",
  keywords: ["AI product leader", "agent platform product manager", "technical product manager", "AI safeguards"],
} as const;
