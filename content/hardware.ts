import type { HardwareCaseStudy } from "./types";

export const hardwareProjects = [
  {
    slug: "zyner-treaty",
    title: "Zyner + Treaty",
    stage: "Concept",
    disclosure: "abstracted",
    summary:
      "A playful, pre-build Raspberry Pi rover concept with separate, safety-bounded ways to bring Kova a treat or provide an adult-authorized personal handoff.",
    thesis:
      "Physical AI becomes useful when perception and conversation are paired with deterministic motion, explicit authority, and hardware that fails safely.",
    role:
      "I am defining the product experience, rover architecture, interaction boundaries, and staged safety tests as a hands-on hardware-software co-design exercise. The system has not been built or validated.",
    modules: [
      {
        name: "Zyner",
        purpose: "An enclosed, adult-authorized bay for carrying a small personal item to a predefined handoff point.",
        safetyBoundary:
          "The item remains enclosed until the rover is stopped at the approved handoff zone; nothing is thrown, launched, or aimed.",
      },
      {
        name: "Treaty",
        purpose: "A separate treat cassette that can bring Kova a treat at a fixed, familiar floor pad.",
        safetyBoundary:
          "Dispensing is allowed only while stationary in the verified treat zone, with a guarded mechanism, interlocks, and no targeting of an animal or person.",
      },
    ],
    systemDesign: [
      "Local-first Raspberry Pi control with a protected camera, microphone, speaker, drive sensors, and separate handoff and treat interfaces.",
      "AI supports perception and language, while deterministic sensing, a finite-state controller, and hard stops govern motion and dispensing.",
      "Independent authorization and physical interlocks prevent one module’s request from enabling the other.",
      "Fixed handoff zones, low-speed movement, an accessible emergency stop, and staged empty-system tests precede any loaded trial.",
    ],
    boundaryNote:
      "The accompanying image is an AI-generated concept visualization. The rover itself remains pre-build—not constructed, tested, or safety-validated—has no launcher, and has no published build files, operating instructions, or validation results.",
    media: {
      kind: "conceptImage",
      src: "/zyner-treaty-concept-workbench.webp",
      alt: "AI-generated pre-build concept of a compact wheeled rover with a protected camera, enclosed handoff bay, and separate treat cassette on a home workbench.",
      caption: "AI-generated concept visualization · pre-build",
      width: 1448,
      height: 1086,
    },
    seo: {
      title: "Zyner + Treaty Physical AI Experiment | Viswas Vuppala",
      description:
        "A pre-build, local-first Raspberry Pi rover concept exploring playful physical AI through a protected personal handoff bay and safety-bounded pet-treat delivery.",
      pathname: "/hardware/zyner-treaty",
      keywords: ["physical AI product", "Raspberry Pi rover", "hardware software co-design", "robotics safety"],
    },
  },
] as const satisfies readonly HardwareCaseStudy[];

export function getHardwareProject(slug: string) {
  return hardwareProjects.find((project) => project.slug === slug);
}
