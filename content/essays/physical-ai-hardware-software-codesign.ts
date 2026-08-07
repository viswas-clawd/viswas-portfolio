import type { WritingEntry } from "../types";

export const physicalAiHardwareSoftwareCodesign = {
  slug: "physical-ai-hardware-software-codesign",
  title: "Physical AI Is a Hardware-Software Product",
  eyebrow: "Field note · Physical AI product design",
  description:
    "What the pre-build Zyner + Treaty rover concept teaches about co-designing perception, interaction, mechanics, power, software, safety controls, and staged validation.",
  dek:
    "A model can interpret a request, but it cannot compensate for an unstable chassis, an exposed mechanism, an ambiguous handoff zone, or a missing hard stop. Physical AI works only when the intelligence and the object are designed as one product.",
  readingTime: "11 min read",
  publishedLabel: "Field note 04",
  disclosure: "public",
  sections: [
    {
      id: "physical-product",
      heading: "The product is the behavior of the whole system",
      paragraphs: [
        "Software lets teams change behavior quickly. Hardware makes every assumption tangible. Weight distribution changes braking. Lighting changes perception. A loose cable becomes a reliability problem. A delayed response becomes physical motion that continues after the user expected it to stop. That is why I treat physical AI as hardware-software co-design, not an AI feature placed inside a device.",
        "Zyner + Treaty is my pre-build concept for exploring that discipline through a playful use case: a compact, local-first Raspberry Pi rover that can bring Kova a treat at a predefined floor pad or carry a small personal item to an adult-authorized handoff point. The two functions use separate enclosed interfaces, and nothing is thrown, launched, or aimed.",
        "The rover has not been constructed or safety-validated. The concept is valuable because it forces product decisions across perception, language, mechanics, motion, dispensing, permissions, and testing before the experience can be called real.",
      ],
      pullQuote:
        "In physical AI, a plausible response is not an outcome. The outcome is what the entire machine did in the real environment—and whether it stopped safely when an assumption failed.",
    },
    {
      id: "promise-to-architecture",
      heading: "Translate the playful promise into system boundaries",
      paragraphs: [
        "The product promise sounds simple: ask for a treat delivery or a personal handoff and watch the rover complete it. That sentence hides several decisions. Who may request each mode? Where may the rover travel? How does it know it reached the correct zone? When may a bay open or a cassette dispense? What happens when the path, camera, sensor, network, or language interpretation is uncertain?",
        "I separate the experience into two physical modules. Treaty is a guarded treat cassette that can dispense only while the rover is stationary in a verified treat zone. Zyner is an enclosed bay for a small personal item that remains closed until the rover is stopped at an approved adult handoff zone. A request for one module cannot authorize the other.",
        "This separation is product architecture. It reduces ambiguous states, gives each workflow its own authorization and test plan, and lets the physical design prevent software confusion from becoming unintended actuation.",
      ],
      list: [
        "One low-speed rover, two independently authorized payload workflows",
        "Fixed, familiar delivery zones rather than unconstrained roaming",
        "Enclosed handoff bay and guarded treat cassette",
        "No launcher, targeting behavior, or release while moving",
        "Accessible emergency stop and a default-to-stopped failure state",
      ],
    },
    {
      id: "ai-and-control",
      heading: "Give AI perception and language—not the final safety decision",
      paragraphs: [
        "AI can make the interaction more natural. It can help interpret a spoken request, recognize a known zone or visual marker, identify an obstruction, and explain what the rover believes is happening. Those capabilities are probabilistic. Their uncertainty should inform the experience, but they should not be the only gate between a request and physical motion.",
        "I place deterministic control beneath the AI layer. A finite-state controller governs states such as idle, authorized, navigating, stopped-at-zone, ready-to-handoff, dispensing, completed, and faulted. Sensors, zone checks, interlocks, timeouts, speed limits, and a hard stop determine which transitions are physically allowed. The model can propose an intent; the controller decides whether the current state satisfies the rule.",
        "Google DeepMind describes a layered robotics-safety approach in which vision-language-action models are composed with lower-level safety mechanisms, alongside semantic-safety evaluation and vulnerability assessment. The implementation details differ from a hobby rover, but the product principle transfers: model reasoning should complement, not replace, controls that constrain the machine's motion and effects.",
      ],
      list: [
        "Google DeepMind on responsible robotics safety: https://deepmind.google/models/gemini-robotics/responsibly-advancing-ai-and-robotics/",
      ],
    },
    {
      id: "mechanics-power-interaction",
      heading: "Mechanics, power, and interaction design are product requirements",
      paragraphs: [
        "A software requirement like ‘stop when blocked’ is incomplete until the team knows sensor coverage, stopping distance, wheel slip, floor transitions, payload mass, motor behavior, and what happens when power drops. The physical form determines whether the control policy can keep its promise.",
        "For Zyner + Treaty, I would prioritize a low, stable deck; protected wheels and camera; tidy strain-relieved wiring; guarded moving parts; independent physical interlocks; and access to the emergency stop without reaching into a mechanism. Battery state should constrain which task can begin, and loss of perception, control communication, or a required sensor should transition to stopped rather than improvise.",
        "Interaction design is equally physical. Status needs to be legible from across a room through restrained light and sound cues. The person should know whether the rover heard a request, is waiting for authorization, is moving, reached a zone, cannot proceed, or is safe to approach. Kova should not need to interpret a screen, and the system should not rely on the dog's behavior to establish a safety state.",
      ],
    },
    {
      id: "edge-compute",
      heading: "Local-first is an experience and reliability choice",
      paragraphs: [
        "A local-first Raspberry Pi architecture can reduce unnecessary data movement, preserve core behavior when internet access is unavailable, and keep the control loop close to the sensors and motors. It does not make the system safe by itself. Local models can still be wrong, and a local computer can still crash.",
        "Official Raspberry Pi documentation shows that Raspberry Pi 5 can run vision AI workloads with supported cameras and AI accelerators, and that different models carry speed and accuracy tradeoffs. That makes local perception technically plausible. It does not prove that a particular model, camera placement, lighting condition, latency, thermal profile, or power budget will satisfy this rover's product requirements.",
        "I would therefore select compute after defining the task envelope and measurement plan. Perception latency, frame rate, model quality, power draw, startup time, thermal behavior, and graceful degradation all belong in the product tradeoff—not just whether a demo can detect an object.",
      ],
      list: [
        "Official Raspberry Pi AI documentation: https://www.raspberrypi.com/documentation/computers/ai.html",
      ],
    },
    {
      id: "measure-system",
      heading: "Measure the AI, robot, and task together",
      paragraphs: [
        "Robotics evaluation cannot stop at model accuracy. NIST's Physical AI work emphasizes the relationship among the AI algorithm, robot system, and task, and the need for metrics and test methods that characterize real-world feasibility, safety, cost, and productive output. That framing is useful well beyond manufacturing.",
        "For this concept, perception quality matters only in relation to the rover's behavior. A missed zone marker has a different product consequence if the finite-state controller keeps the bay locked and stops than if it allows a release. Navigation time matters alongside stopping accuracy, intervention rate, payload stability, battery reserve, and recovery from sensor faults.",
        "The evaluation unit should therefore be a scenario: a defined starting state, environment, request, payload condition, expected state transitions, allowed timing, safety constraints, and authoritative evidence of the outcome. That turns ‘the model worked’ into a product claim that can be tested.",
      ],
      list: [
        "NIST Physical AI and Data Generation for Robotics: https://www.nist.gov/programs-projects/physical-ai-and-data-generation-robotics",
        "Zone-recognition and stopping accuracy under representative lighting and floor conditions",
        "Obstacle response, minimum stopping behavior, and false-clear rate",
        "State-transition, authorization, and interlock correctness",
        "Handoff and dispensing success while stationary",
        "Fault recovery, emergency-stop response, and safe power-loss behavior",
      ],
    },
    {
      id: "staged-validation",
      heading: "Validation should earn physical capability in stages",
      paragraphs: [
        "A staged plan protects against the excitement of a working subsystem being mistaken for a working product. I would begin with component fit, wiring, power, logging, and the emergency stop. Then I would validate the finite-state controller with motors disconnected, followed by an empty base at low speed inside a fixed test zone.",
        "Only after repeatable stop, obstruction, zone, timeout, and power-loss tests would I add an empty enclosure. Payload mass comes later. Dispensing begins with inert test objects and no dog or person in the zone. Adult handoff tests begin with the rover immobilized, then progress through controlled low-speed trials. Every stage needs explicit pass criteria and a stop condition for redesign.",
        "This sequence is deliberately conservative because a safe demo is not the same as a safe product. Variability in floors, lighting, battery state, pets, people, and household clutter will expose interactions that isolated component tests cannot. A concept can describe the intended layers; only measured trials can validate them.",
      ],
      list: [
        "Bench test: power, sensors, logs, interlocks, and emergency stop",
        "Controller test: simulated state transitions with actuation disabled",
        "Empty-base test: fixed zone, low speed, no payload, no people or pets",
        "Empty-module test: locked enclosures and fault injection",
        "Inert-payload test: stationary release at verified zones",
        "Controlled supervised trials only after every earlier gate passes",
      ],
    },
    {
      id: "pm-codesign",
      heading: "The PM job is to keep the layers honest",
      paragraphs: [
        "Hardware-software co-design gives product managers a concrete version of work that also matters in enterprise GenAI: translate an experience into system boundaries, separate probabilistic judgment from deterministic policy, define authority, design failure states, and require evidence before broadening scope.",
        "It also requires cross-functional sequencing. Mechanical design constrains sensor placement. Power constrains compute. Model latency constrains motion. Industrial and interaction design determine whether the user understands the state. Safety requirements reshape all of them. A roadmap that treats those as independent tracks will discover the integration risk late.",
        "Zyner + Treaty is intentionally a pre-build experiment, not a claim of finished hardware. Its current value is the product architecture and the questions it makes unavoidable. If the idea advances, each new capability should be earned by a measured system outcome—not by a rendering, a parts list, or a successful model demo.",
      ],
    },
  ],
  closing: [
    "Physical AI is compelling because intelligence can leave the screen and become useful in the world. That same transition raises the standard of evidence. Product behavior now includes mechanics, power, motion, interaction, and the environment—not only the model's response.",
    "Design the object and the intelligence together. Keep AI inside a deterministic safety envelope. Validate the model, robot, and task as one system. And do not call the concept complete until the physical evidence earns the claim.",
  ],
  seo: {
    title: "Physical AI Is a Hardware-Software Product | Viswas Vuppala",
    description:
      "Viswas Vuppala uses the pre-build Zyner + Treaty rover concept to explain physical-AI co-design, layered safety, local perception, and staged system validation.",
    pathname: "/knowledge/physical-ai-hardware-software-codesign",
    keywords: [
      "physical AI product",
      "hardware software co-design",
      "robotics product management",
      "Raspberry Pi rover",
      "robotics safety",
      "Zyner Treaty",
    ],
  },
} as const satisfies WritingEntry;
