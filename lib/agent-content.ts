import {
  beyondWork,
  capabilityMapContent,
  education,
  experience,
  hardwareProjects,
  heroContent,
  knowledgeEntries,
  projectIndexIntro,
  projects,
  projectVisualContent,
  publicPageContent,
  siteProfile,
  technicalSkills,
  type ProjectMedia,
} from "@/content";
import { buildMachineResourceHeaders } from "./site-config";

const absoluteUrl = (origin: string, path: string) =>
  new URL(path, origin.endsWith("/") ? origin : `${origin}/`).toString();

const sourceUrl = (origin: string, path: string) => `Source URL: ${absoluteUrl(origin, path)}`;

const linkLine = (origin: string, link: { readonly label: string; readonly href: string }) =>
  `- [${link.label}](${absoluteUrl(origin, link.href)})`;

const diagramMarkdown = (media: ProjectMedia) => {
  if (media.kind !== "diagram") return "";
  const visual = projectVisualContent[media.visual];
  return `Diagram: ${media.alt}

${visual.labels.map((lines) => `- ${lines.join(" / ")}`).join("\n")}`;
};

const softwareSummary = (project: (typeof projects)[number], status: string) => `### ${project.title}

${project.category} / ${project.stage}

${project.summary}

${diagramMarkdown(project.media)}

${status}`;

const articleMarkdown = (origin: string, entry: (typeof knowledgeEntries)[number]) => {
  const article = publicPageContent.article;
  const route = `/knowledge/${entry.slug}`;
  const sections = entry.sections.map((section) => `## ${section.heading}

${section.paragraphs.join("\n\n")}${section.pullQuote ? `\n\n> ${section.pullQuote}` : ""}${section.list ? `\n\n${section.list.map((item) => `- ${item}`).join("\n")}` : ""}`).join("\n\n");

  return `# ${entry.title}

${sourceUrl(origin, route)}

${article.indexLabel}: ${absoluteUrl(origin, publicPageContent.knowledge.route)}

${entry.kind}

${entry.disclosure}

${entry.eyebrow}

${entry.dek}

- ${article.authorLabel}: ${article.author}
- ${article.typeLabel}: ${entry.kind}
- ${article.readingTimeLabel}: ${entry.readingTime}

${sections}

## ${article.closingHeading}

${entry.closing.join("\n\n")}`;
};

export function buildLlmMarkdown(origin: string) {
  const home = publicPageContent.home;
  const software = publicPageContent.software;
  const hardware = publicPageContent.hardware;
  const career = publicPageContent.career;
  const knowledge = publicPageContent.knowledge;
  const beyond = publicPageContent.beyondWork;
  const selectedProjects = [
    projects.find((project) => project.slug === "helios")!,
    projects.find((project) => project.slug === "fedai")!,
  ];
  const hardwareProject = hardwareProjects[0];

  const homeMarkdown = `# ${siteProfile.name}

${sourceUrl(origin, home.route)}

${heroContent.eyebrow}

# ${heroContent.headline}

${heroContent.introduction}

${heroContent.destinations.map((item) => `- [${item.title}](${absoluteUrl(origin, item.href)}) — ${item.descriptor}`).join("\n")}

## ${home.overview.label}

## ${home.overview.heading}

${home.overview.description}

### ${capabilityMapContent.centerLabel}

### ${capabilityMapContent.centerTitle}

${capabilityMapContent.capabilities.map((item) => `- ${item.title}: ${item.description}`).join("\n")}

${home.overview.links.map((link) => linkLine(origin, link)).join("\n")}

## ${home.selectedProof.label}

## ${home.selectedProof.heading}

${home.selectedProof.description}

${selectedProjects.map((project) => softwareSummary(project, home.selectedProof.status)).join("\n\n")}

### ${hardwareProject.title}

${home.selectedProof.hardwareCategory} / ${hardwareProject.stage}

${hardwareProject.summary}

![${hardwareProject.media.alt}](${absoluteUrl(origin, hardwareProject.media.src)})

${hardwareProject.media.caption}

${home.selectedProof.status}

${home.selectedProof.links.map((link) => linkLine(origin, link)).join("\n")}

## ${home.bridge.label}

## ${home.bridge.heading}

### ${home.bridge.career.label}

### ${home.bridge.career.heading}

${home.bridge.career.description}

${linkLine(origin, home.bridge.career.link)}

### ${home.bridge.knowledge.label}

### ${home.bridge.knowledge.heading}

${home.bridge.knowledge.description}

${linkLine(origin, home.bridge.knowledge.link)}

## ${home.beyondWork.label}

## ${home.beyondWork.heading}

${home.beyondWork.description}

${beyondWork.map((interest) => `- ${interest.shortLabel}: ${interest.summary}${"externalLink" in interest ? ` ${interest.externalLink}` : ""}`).join("\n")}

${linkLine(origin, home.beyondWork.link)}

## ${home.handoff.label}

## ${home.handoff.heading}

${home.handoff.description}

${linkLine(origin, home.handoff.link)}
- [${home.handoff.contactLabel}](${siteProfile.contact.href})`;

  const softwareMarkdown = `# ${software.register[1]}

${sourceUrl(origin, software.route)}

${software.register.join(" / ")}

${software.kicker}

# ${projectIndexIntro.headline}

${projectIndexIntro.description}

${software.supporting}

## ${software.sectionHeading}

${projects.map((project) => softwareSummary(project, software.status)).join("\n\n")}`;

  const hardwareMarkdown = `# ${hardware.register[1]}

${sourceUrl(origin, hardware.route)}

${hardware.register.join(" / ")}

${hardware.kicker}

# ${hardware.heading}

${hardware.introduction}

${hardware.boundary}

## ${hardwareProject.title}

${hardwareProject.stage} / ${hardwareProject.disclosure}

${hardwareProject.summary}

![${hardwareProject.media.alt}](${absoluteUrl(origin, hardwareProject.media.src)})

${hardwareProject.media.caption}

${hardware.status}`;

  const careerMarkdown = `# ${career.register[0]}

${sourceUrl(origin, career.route)}

${career.register.join(" / ")}

${career.kicker}

# ${career.heading}

${career.introduction}

${career.summary}

[${career.contactLabel}](${siteProfile.contact.href})

## ${career.roles.label}

## ${career.roles.heading}

${experience.map((role) => `### ${role.organization}

### ${role.title}

${role.period}

${role.summary}

${role.focus.map((item) => `- ${item}`).join("\n")}

${role.themes.map((theme) => `- ${theme}`).join("\n")}`).join("\n\n")}

## ${career.skills.label}

## ${career.skills.heading}

${Object.entries(technicalSkills).map(([category, skills]) => `### ${category.replace(/([A-Z])/g, " $1")}

${skills.map((skill) => `- ${skill}`).join("\n")}`).join("\n\n")}

## ${career.education.label}

## ${career.education.heading}

${education.map((entry) => `- ${entry.institution}: ${entry.credential}`).join("\n")}

${career.links.label}

${career.links.items.map((link) => linkLine(origin, link)).join("\n")}`;

  const knowledgeIndexMarkdown = `# ${knowledge.register[1]}

${sourceUrl(origin, knowledge.route)}

${knowledge.register.join(" / ")}

${knowledge.kicker}

# ${knowledge.heading}

${knowledge.introduction}

${knowledge.boundary}

## ${knowledge.indexLabel}

## ${knowledge.indexHeading}

${knowledgeEntries.map((entry) => `### [${entry.title}](${absoluteUrl(origin, `/knowledge/${entry.slug}`)})

${entry.kind}

${entry.description}

- ${knowledge.typeLabel}: ${entry.kind}
- ${knowledge.lengthLabel}: ${entry.readingTime}
- [${knowledge.readLabel}](${absoluteUrl(origin, `/knowledge/${entry.slug}`)})`).join("\n\n")}`;

  const beyondMarkdown = `# ${beyond.register[1]}

${sourceUrl(origin, beyond.route)}

${beyond.register.join(" / ")}

${beyond.kicker}

# ${beyond.heading}

${beyond.introduction}

${beyond.community}

${beyondWork.map((interest) => `## ${interest.shortLabel}

## ${interest.title}

${interest.summary}${"externalLink" in interest ? `\n\n[${beyond.externalLinkLabel}](${interest.externalLink})` : ""}

> ${interest.reflection}`).join("\n\n")}

${beyond.links.label}

${beyond.links.items.map((link) => linkLine(origin, link)).join("\n")}`;

  return [
    homeMarkdown,
    softwareMarkdown,
    hardwareMarkdown,
    careerMarkdown,
    knowledgeIndexMarkdown,
    ...knowledgeEntries.map((entry) => articleMarkdown(origin, entry)),
    beyondMarkdown,
  ].join("\n\n---\n\n");
}

export function redirectLegacyAgentResource(request: Request) {
  return new Response(null, {
    status: 308,
    headers: {
      ...buildMachineResourceHeaders(),
      Location: absoluteUrl(new URL(request.url).origin, "/llm.txt"),
    },
  });
}
