import type { WritingEntry } from "../types";

export const chatterAdaptiveAgentCoordination = {
  slug: "chatter-adaptive-agent-coordination",
  title: "Agents Should Re-strategize When the Work Changes",
  eyebrow: "Field note · Adaptive agent coordination",
  description:
    "Why agent messaging is not enough—and how verified dependencies, scoped re-strategizing, revised working contracts, and reconciliation receipts can make parallel work more coherent.",
  dek:
    "The coordination problem is not whether agents can exchange updates. It is whether an affected agent can prove that peer work changed its plan, adapt without exceeding its authority, and leave evidence of what it revised and why.",
  readingTime: "11 min read",
  publishedLabel: "Field note 02",
  disclosure: "public",
  sections: [
    {
      id: "messages-are-not-coordination",
      heading: "Messages create awareness; they do not reconcile plans",
      paragraphs: [
        "When several agents work in parallel, it is tempting to treat communication as the coordination layer. Give each agent a mailbox, publish progress events, and let everyone subscribe. That solves an important transport problem, but the harder product question begins after a relevant update arrives.",
        "Imagine one agent completes a shared data contract while another is building a consumer against an earlier assumption. The second agent can read the completion message and continue anyway. It can acknowledge the message without revising its tests, sequence, or definition of done. Every participant can appear informed while the combined plan quietly drifts apart.",
        "Useful coordination therefore needs an observable adaptation step. The affected agent should verify the completed work, identify which part of its active plan depends on the change, decide what it may revise within scope, and publish evidence of that revision. I call this dependency-aware reconciliation.",
      ],
      pullQuote:
        "A notification says that something happened. A reconciliation receipt shows what changed because it happened.",
    },
    {
      id: "completed-work-event",
      heading: "Start with completed peer work, not agent narration",
      paragraphs: [
        "Chatter begins with a completed-work event because intent and completion are different states. An agent saying that it plans to change a contract should not cause downstream work to mutate. The coordination layer needs evidence that the relevant artifact or authoritative state actually changed.",
        "Verification can be modest and task-specific: inspect the committed artifact, re-read the record, run the relevant check, or confirm the produced interface. The point is not to demand exhaustive proof for every message. It is to keep causal planning decisions anchored to something stronger than another agent's confident summary.",
        "This also improves failure handling. If the event cannot be verified, the affected agent can preserve its current plan, request clarification, or escalate. It should not fill the evidence gap with an inferred dependency and then describe the resulting re-plan as coordinated work.",
      ],
    },
    {
      id: "reconciliation-loop",
      heading: "The Chatter reconciliation loop",
      paragraphs: [
        "The product loop I am exploring has four visible transitions. First, a peer completes work and provides a verifiable reference. Second, Chatter matches that change to an affected dependency in another agent's active working contract. Third, the affected agent re-strategizes only inside its existing scope and authority. Fourth, it publishes the revised working contract and a reconciliation receipt.",
        "The working contract is the plan state that matters for coordination: objective, assumptions, dependencies, owned tasks, constraints, acceptance evidence, and authority boundaries. A revision may change sequencing, replace an invalid assumption, add a verification step, or mark work as no longer necessary. It should not silently expand the agent's mandate.",
        "The receipt makes the adaptation causal. It connects the verified peer artifact to the affected dependency, records the before-and-after plan state, identifies the rule or judgment used, and names anything that remains unresolved. That gives people and other agents a basis for review without requiring them to reconstruct the story from a chat transcript.",
      ],
      list: [
        "Verify the completed peer artifact or authoritative state.",
        "Match the change to an explicit dependency, assumption, task, or acceptance condition.",
        "Revise strategy within the agent's existing objective, tools, permissions, and change scope.",
        "Publish the revised working contract plus a causal reconciliation receipt.",
      ],
    },
    {
      id: "protocols-and-orchestration",
      heading: "What Chatter is—and is not",
      paragraphs: [
        "A mailbox transports messages. That is useful, but delivery and acknowledgement do not prove that a dependent plan changed. Chatter is interested in the state transition after receipt: whether the message corresponds to verified work, what it affects, and what adaptation follows.",
        "Model Context Protocol, or MCP, is an open standard for connecting AI applications to external data sources, tools, and workflows. That connectivity can give an agent the evidence and capabilities it needs. It does not by itself decide how a completed peer task should alter another agent's working contract.",
        "Agent2Agent, or A2A, addresses interoperability between agents. Google's overview describes capability discovery, task lifecycle, messages, artifacts, and state updates across agents built with different frameworks. Those are valuable coordination primitives. Chatter's narrower hypothesis sits above transport and interoperability: dependency-aware adaptation should be explicit, authority-bounded, and receipted.",
        "Centralized orchestration solves a different problem by assigning and sequencing work from a controlling plan. That can be the right architecture. Chatter explores what happens when work is already distributed and the affected agent has local context the coordinator may not possess. The agent can propose a scoped revision, while policy or a person still controls whether higher-impact changes are accepted.",
      ],
      list: [
        "MCP documentation: https://docs.anthropic.com/en/docs/agents-and-tools/mcp",
        "Google's A2A overview: https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/",
      ],
    },
    {
      id: "authority",
      heading: "Adaptation must not become authority expansion",
      paragraphs: [
        "An agent that can change its plan is more useful, but it can also turn a small dependency update into an unapproved change in objective, architecture, cost, or external state. The product must distinguish strategy flexibility from authority flexibility.",
        "I treat the original working contract as an envelope. Inside it, an agent may reorder owned tasks, refresh an assumption, update a local interface, or add tests required by the verified dependency. Outside it, the agent must propose rather than act. New access, spend, environments, external messages, destructive operations, changed acceptance criteria, or impact on another owner's scope require the appropriate approval path.",
        "This boundary belongs in the receipt. A useful receipt says not only what changed, but why the change was permitted. When the adaptation crosses a threshold, the receipt becomes a review packet: evidence, proposed revision, expected effect, and the decision that remains with a human or authorized coordinator.",
      ],
    },
    {
      id: "evaluation",
      heading: "Evaluate coherence, not message volume",
      paragraphs: [
        "A noisy coordination system can look active while making the team less effective. Message count, agent responsiveness, and task throughput are operational measures; they do not tell me whether parallel plans remained coherent.",
        "I would evaluate Chatter against dependency scenarios with known expected effects. Did it identify the correct affected plan? Did it avoid changing unrelated work? Was the peer completion actually verified? Did the revision remain within authority? Could a reviewer trace the before-and-after state to its cause? Did the combined work integrate with less rework or fewer contradictory assumptions?",
        "False positives matter as much as misses. If every completion triggers re-planning, agents will churn and destroy stable work. The product needs thresholds for relevance, materiality, and confidence, plus a clean no-change receipt when a verified event does not justify adaptation.",
      ],
      list: [
        "Dependency-match precision and recall",
        "Verified-evidence coverage before adaptation",
        "Scope and authority adherence",
        "Causal trace completeness",
        "Unnecessary re-plan rate",
        "Integration rework and unresolved-conflict rate",
      ],
    },
    {
      id: "product-manager-role",
      heading: "The product manager designs the reconciliation policy",
      paragraphs: [
        "This is not only an infrastructure problem. Product managers have to define which changes are material, which plan elements are safe to revise automatically, what evidence is authoritative, when a person should decide, and what the receipt must make understandable.",
        "The work resembles designing a customer journey across agents. There is an initiating event, an affected participant, a decision point, a state transition, an exception path, and an observable outcome. The fact that the participants are software agents does not remove the need for clear value, constraints, usability, and trust.",
        "A good policy will be domain-specific. A documentation agent may safely update references after a verified interface change. An agent handling production access, financial commitments, regulated decisions, or customer communication should have a much narrower automatic envelope. Coordination quality comes from making those distinctions explicit.",
      ],
    },
    {
      id: "prototype-boundary",
      heading: "What Chatter proves today—and what it does not",
      paragraphs: [
        "Chatter is a local prototype. A real local SQLite-backed service and dependency-matching workflow have been exercised through simulated agent sessions. That is useful evidence for the data model and reconciliation concept, but it is not proof of a production-ready multi-agent system.",
        "Most importantly, the end-to-end live Codex-to-Claude workflow remains unproven. I do not describe the prototype as live multi-provider coordination, and I do not treat a simulated demo as evidence that independent agents will reliably verify, re-strategize, and reconcile under real operating conditions.",
        "The next proof should be narrow: one real dependency, one completed peer artifact, one affected working contract, one bounded adaptation, and one receipt that a reviewer can independently verify. The value of Chatter will not come from adding another channel for agents to talk. It will come from demonstrating that distributed work can adapt coherently without hiding cause or expanding authority.",
      ],
    },
  ],
  closing: [
    "Agent ecosystems need protocols, tools, and messages. They also need a product model for what happens when new work invalidates an active plan.",
    "My standard is straightforward: verify the change, identify the dependency, re-strategize within scope, and leave a receipt. If the system cannot show that loop, the agents may be communicating—but they are not yet coordinating in a way I would trust.",
  ],
  seo: {
    title: "Agents Should Re-strategize When the Work Changes | Viswas Vuppala",
    description:
      "Viswas Vuppala explains Chatter's dependency-aware model for verified peer work, scoped agent re-strategizing, revised working contracts, and reconciliation receipts.",
    pathname: "/knowledge/chatter-adaptive-agent-coordination",
    keywords: [
      "adaptive agent coordination",
      "multi-agent systems",
      "agent re-strategizing",
      "dependency-aware planning",
      "reconciliation receipts",
      "Chatter",
    ],
  },
} as const satisfies WritingEntry;
