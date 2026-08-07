import type { WritingEntry } from "../types";

export const agentsAreCustomers = {
  slug: "agents-are-customers",
  title: "Your Next Customer Might Be an AI Agent",
  eyebrow: "Field note · Agent experience",
  description:
    "A product framework for treating AI agents as a new customer persona across findability, understandability, usability, trust, and measurement—without losing the human user they serve.",
  dek:
    "Products are still designed for people, but an agent may increasingly be the participant that finds the information, interprets the interface, calls the tool, and completes the task on a person's behalf. That makes agent experience a product-management responsibility.",
  readingTime: "11 min read",
  publishedLabel: "Field note 03",
  disclosure: "public",
  sections: [
    {
      id: "new-participant",
      heading: "A new participant has entered the customer journey",
      paragraphs: [
        "Product teams are accustomed to designing for a person at a screen. The person discovers the product, learns the language, navigates the interface, enters information, recovers from errors, and decides whether the outcome is trustworthy. AI agents are beginning to perform some of those steps between the product and the person they serve.",
        "I do not mean that every agent is an economic buyer or that human-centered design is becoming optional. I mean that an agent can be a distinct user or intermediary with its own success conditions. If it cannot find the authoritative page, distinguish current content from stale content, understand an action, recover from an error, or verify the result, the human's task still fails.",
        "That makes the agent a customer persona worth designing for. The useful PM question is not ‘How do we optimize everything for bots?’ It is ‘Where does an agent participate in this journey, what is it trying to accomplish for the user, and what product qualities determine whether it succeeds?’",
      ],
      pullQuote:
        "The agent is not the reason the product exists. It may be the customer participant that determines whether the human gets the outcome.",
    },
    {
      id: "persona",
      heading: "Define the agent persona by task and authority",
      paragraphs: [
        "A useful persona is more specific than ‘AI agent.’ A research agent gathering public facts has different needs from an enterprise assistant using approved internal sources, a procurement agent preparing a transaction, or a coding agent changing a repository. Their information access, tools, error costs, and approval boundaries differ.",
        "I define the persona around five questions: Who is the human principal? What task is the agent trying to complete? Which information and actions are in scope? Which decisions remain with a person? What evidence will prove that the outcome is correct? Those answers turn an abstract trend into product requirements.",
        "They also prevent a common mistake: optimizing only for model ingestion. A page that is easy to summarize but leads an agent to an unauthorized or unverifiable action is not agent-ready. The experience must support the whole journey from discovery through trustworthy completion.",
      ],
    },
    {
      id: "findability",
      heading: "1. Findability: can the agent locate the right thing?",
      paragraphs: [
        "Agents need stable, crawlable, addressable product information. Descriptive URLs, consistent canonical paths, accurate page titles, metadata, and machine-readable indexes reduce the chance that the agent starts from an obsolete or ambiguous surface. Public information should be discoverable; private information should remain deliberately inaccessible rather than accidentally exposed for optimization.",
        "Structured data can provide explicit clues about what a page represents. Google's guidance describes structured data as standardized in-page markup that helps classify content and says the markup should describe the content visible on that page. I apply the same truth constraint to agent-facing resources: machine-readable representations should synchronize with the human-facing source instead of creating a richer, contradictory shadow site.",
        "Findability is not a promise that every agent or search system will use every file or schema. It is a product decision to provide durable entry points and consistent meaning, then test which clients can actually locate the correct source.",
      ],
      list: [
        "Stable canonical URLs and redirects when paths change",
        "Descriptive titles, headings, metadata, and content dates where freshness matters",
        "Structured data that matches visible page content",
        "Machine-readable indexes for public material, with private and noindex boundaries preserved",
        "Google structured-data guidance: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
      ],
    },
    {
      id: "understandability",
      heading: "2. Understandability: can the agent form the right model?",
      paragraphs: [
        "Once an agent reaches a page, it needs a coherent information hierarchy. Semantic HTML, one descriptive primary heading, meaningful section headings, real links and buttons, explicit labels, useful image alternatives, and predictable navigation provide structure that is more reliable than visual position alone.",
        "This is where accessibility and agent experience overlap—but they are not the same requirement. Accessible design is for people, including people who use assistive technologies, and should be pursued because equal access is a human obligation. W3C guidance explains how browsers and assistive technologies derive accessible names and recommends visible text and native techniques where possible. Those semantic names can also give machine clients more useful signals, but accessibility standards should never be reframed as a bot-optimization checklist.",
        "The PM requirement is to preserve meaning across presentations. A card should not depend on color alone to communicate status. A control should not be called ‘click here.’ A diagram should have a textual explanation. If the product exposes the same concept through a page, API, and machine index, the names and state model should agree.",
      ],
      list: [
        "W3C guidance on accessible names and descriptions: https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/",
        "Prefer semantic HTML and visible, descriptive labels before adding custom ARIA.",
        "Treat accessibility as a human requirement; describe machine-navigation benefits as a secondary consequence of clear semantics.",
      ],
    },
    {
      id: "usability",
      heading: "3. Usability: can the agent complete the task?",
      paragraphs: [
        "Readable content may be enough for a research task. Transactional work often needs a documented API or tool interface with explicit inputs, outputs, schemas, permissions, and error states. The right interface depends on the job; not every product needs a new protocol or a collection of autonomous actions.",
        "MCP is one useful option. Anthropic's documentation describes it as an open standard for connecting AI applications to external data sources, tools, and workflows. A2A addresses another layer: Google's overview describes cross-agent capability discovery, task lifecycle, messages, artifacts, and state updates. These protocols can improve connectivity and interoperability, but neither substitutes for a well-designed product contract.",
        "I start with the smallest interface that makes the user task reliable. That may be semantic content, a structured feed, an existing API, an MCP server, an A2A-capable service, or a human-confirmed workflow. The product should not force a protocol into the architecture simply because agents are involved.",
      ],
      list: [
        "MCP documentation: https://docs.anthropic.com/en/docs/agents-and-tools/mcp",
        "Google's A2A overview: https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/",
        "Document inputs, outputs, units, state transitions, limits, permissions, and recoverable errors.",
        "Make read, propose, act, and verify distinct capabilities where consequences differ.",
      ],
    },
    {
      id: "trust",
      heading: "4. Trust: can the agent act without inventing authority?",
      paragraphs: [
        "Agent usability without trust can make a product easier to misuse. I want every consequential interaction to carry a scoped authority model: what the agent may read, what it may propose, what it may change, which identity it represents, and where approval is required.",
        "Errors should be useful to both the agent and the person. ‘Something went wrong’ encourages retries without learning. A better error identifies the invalid field, missing permission, stale version, rate limit, conflict, or unavailable dependency and states whether retrying is safe. Idempotency matters because agents may repeat calls after a timeout; a duplicate request should not create a duplicate consequence.",
        "Completion also needs receipts. A successful request is not always proof that the intended state exists. The interface should return a stable record identifier, version, persisted state, test result, or another authoritative signal that the agent can re-read. When verification is impossible, the product should represent the outcome as attempted or pending—not completed.",
      ],
      list: [
        "Least-privilege scopes tied to a clear principal",
        "Approval for material, external, destructive, regulated, or costly actions",
        "Specific errors with safe retry guidance",
        "Idempotency keys and conflict handling for repeatable actions",
        "Authoritative receipts and read-after-write verification",
      ],
    },
    {
      id: "measurement",
      heading: "5. Measurement: did the agent help the user succeed?",
      paragraphs: [
        "Agent readiness is not proven by publishing a robots file, schema, or protocol endpoint. I need task-level evidence. Can representative agents find the current source? Can they distinguish the product, project, person, or action correctly? Can they complete the intended task inside policy? Can they recover from expected failures? Can they show the person what happened?",
        "Measurement should include the human outcome. An agent can complete a tool call while selecting the wrong account, misreading freshness, or creating more review work than it removes. I would pair machine task completion with correctness, user confirmation, correction patterns, escalation quality, time saved, and the severity of failures.",
        "I would also test across clients. Agent behavior changes with models, tools, context limits, and runtime policies. The product contract should be stable enough that different agents can discover and use it, while the evaluation shows where compatibility remains partial.",
      ],
      list: [
        "Correct-source discovery rate",
        "Task completion with policy adherence",
        "Field, state, and action accuracy",
        "Recovery from missing permissions, conflicts, stale data, and timeouts",
        "Verified-outcome coverage",
        "Human correction, override, escalation quality, and end-to-end task success",
      ],
    },
    {
      id: "pm-playbook",
      heading: "A product-management playbook for agent experience",
      paragraphs: [
        "I would add agent experience to the normal product-development cycle, not create a separate innovation theater around it. Discovery identifies where agents already participate and where customers want delegation. Journey mapping marks the handoffs between person, agent, interface, and system of record. Requirements define information, tools, authority, failures, and receipts. Evaluation tests the task across representative clients.",
        "Prioritization should follow user value and risk. A public knowledge site may begin with stable pages, semantic structure, accurate metadata, and synchronized machine indexes. A workflow product may prioritize permissioned APIs, idempotent mutations, dry runs, approvals, and verification. A marketplace may need identity, delegation, and dispute states before broad autonomous access.",
        "The strategic opportunity is larger than making a site easy to crawl. Products that serve agents well can become easier to integrate, easier to verify, and clearer about their own state. Those improvements also help human teams because they force the product to make its meaning, contracts, and boundaries explicit.",
      ],
    },
  ],
  closing: [
    "The next customer journey may move through a person, an agent, several tools, and another agent before returning an outcome. Product managers need to own that journey with the same discipline we apply to any other experience.",
    "Design for findability, understandability, usability, trust, and measurable completion. Keep accessibility grounded in human access. Use protocols where they solve a real interface problem. Above all, remember that the agent's success is only valuable when it produces a correct, legible outcome for the person it represents.",
  ],
  seo: {
    title: "Your Next Customer Might Be an AI Agent | Viswas Vuppala",
    description:
      "Viswas Vuppala's product framework for agent experience across findability, semantics, tools, scoped authority, verification, and task-level measurement.",
    pathname: "/knowledge/agents-are-customers",
    keywords: [
      "agent experience",
      "AI agents as customers",
      "agent-ready product",
      "AI product management",
      "machine-readable content",
      "agent trust",
    ],
  },
} as const satisfies WritingEntry;
