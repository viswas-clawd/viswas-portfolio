import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const SOFTWARE_CASE_ROUTES = [
  "/software/helios",
  "/software/fedai",
  "/software/awardlens",
  "/software/chatter",
];

const HARDWARE_CASE_ROUTES = ["/hardware/zyner-treaty"];

const KNOWLEDGE_ROUTES = [
  "/knowledge/context-is-product-architecture",
  "/knowledge/chatter-adaptive-agent-coordination",
  "/knowledge/agents-are-customers",
  "/knowledge/physical-ai-hardware-software-codesign",
];

const KNOWLEDGE_TITLES = [
  "Context Is Product Architecture: How Helios Builds Living Product Memory",
  "Agents Should Re-strategize When the Work Changes",
  "Your Next Customer Might Be an AI Agent",
  "Physical AI Is a Hardware-Software Product",
];

const AI_READY_RVA_URL = "https://www.aireadyrva.com/cohorts/product-ai";
const AI_READY_RVA_COPY =
  "I volunteer with AI Ready RVA’s Product & AI Cohort, helping product managers apply AI tools and practical best practices across the product development cycle.";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function collectFiles(url, suffixes = [".js", ".html", ".xml", ".txt", ".md", ".json"]) {
  const entries = await readdir(url, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const child = new URL(entry.name + (entry.isDirectory() ? "/" : ""), url);
    if (entry.isDirectory()) files.push(...(await collectFiles(child, suffixes)));
    else if (suffixes.some((suffix) => entry.name.endsWith(suffix))) files.push(child);
  }
  return files;
}

async function readSources(directories) {
  const groups = await Promise.all(
    directories.map(async (directory) => {
      const files = await collectFiles(new URL(`../${directory}/`, import.meta.url), [".ts", ".tsx"]);
      return Promise.all(files.map((file) => readFile(file, "utf8")));
    }),
  );
  return groups.flat().join("\n");
}

async function render(pathname = "/", accept = "text/html") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the product-judgment homepage with private-preview robots", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  for (const phrase of [
    "I turn emerging GenAI capabilities into useful, trustworthy products.",
    "From ambitious GenAI ideas to products people can trust and teams can execute.",
    "I translate customer and developer needs into strategy, roadmaps, technical requirements, evaluation plans, and product decisions that cross-functional teams can execute.",
    "Innovative GenAI product leadership—and the ideas behind it.",
    "Enterprise-scale GenAI, context and grounding platforms, regulated product leadership, and founder-led 0→1 work.",
    "How I apply GenAI to product management, agent experience, adaptive coordination, and physical systems.",
    "Kova, golf, poker, and AI Ready RVA.",
  ]) {
    assert.match(html, new RegExp(escapeRegExp(phrase), "i"), phrase);
  }

  assert.match(html, /01 \/ Overview/i);
  assert.match(html, /Selected proof/i);
  assert.match(html, /Career \+ knowledge/i);
  assert.match(html, /Recruiter handoff/i);
  assert.match(html, /href="\/llm\.txt"/i);
  assert.match(html, /name="robots" content="noindex, nofollow/i);
  assert.match(html, /property="og:image" content="https:\/\/private-preview\.invalid\/portrait-wordfield-v2\.png"/i);
  assert.match(html, /name="twitter:image" content="https:\/\/private-preview\.invalid\/portrait-wordfield-v2\.png"/i);
  assert.doesNotMatch(html, /(?:name="description"|property="og:description"|name="twitter:description")/i);
  assert.doesNotMatch(html, /(?:og|twitter)\.png/i);
  assert.doesNotMatch(html, /Role fit|RESOLVE\s*\/\s*ORGANIZE\s*\/\s*CONNECT\s*\/\s*EXPLORE/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders the semantic capability map and preserves a complete no-script fallback", async () => {
  const html = await (await render("/")).text();
  for (const phrase of [
    "0→1 GenAI Product Leadership",
    "Product strategy",
    "Context and systems",
    "Evaluation and trust",
    "Cross-functional leadership",
    "Hands-on building",
  ]) {
    assert.match(html, new RegExp(escapeRegExp(phrase), "i"), phrase);
  }
  assert.match(html, /data-capability-map/i);
  assert.match(html, /data-capability-connector/i);
  assert.match(html, /<noscript>/i);

  const source = await readFile(new URL("../components/CapabilityMap.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../components/capability-map.module.css", import.meta.url), "utf8");
  assert.match(source, /new IntersectionObserver/);
  assert.match(source, /observer\.disconnect\(\)/);
  assert.match(source, /(?:!\("IntersectionObserver" in window\)|typeof IntersectionObserver === "undefined")/);
  assert.match(source, /data-capability-list/);
  assert.match(css, /@media \(max-width: 48rem\)[\s\S]*?\.root\[data-revealed="true"\] \.center,[\s\S]*?animation-name:\s*nodeReveal/);
  assert.match(css, /\.list::before[\s\S]*?border-left:\s*1px dotted currentColor/);
  assert.match(css, /\.item::before[\s\S]*?border-top:\s*1px dotted currentColor/);
  assert.match(css, /data-revealed="true"\] \.list::before[\s\S]*?mobileSpineReveal/);
  assert.match(css, /data-revealed="true"\] \.item::before[\s\S]*?mobileBranchReveal/);
  assert.doesNotMatch(source, /framer|gsap|motion\//i);
});

test("uses Helios, FedAI, and Zyner as selected work without human case links", async () => {
  const html = await (await render("/")).text();
  const selected = html.match(/<div class="proof-card-grid">([\s\S]*?)<\/div>/i)?.[1] ?? "";
  for (const title of ["Helios", "FedAI", "Zyner + Treaty"]) {
    assert.match(selected, new RegExp(escapeRegExp(title), "i"), title);
  }
  assert.doesNotMatch(selected, /AwardLens|Chatter/i);
  assert.equal((selected.match(/Case study coming soon/gi) ?? []).length, 3);
  assert.doesNotMatch(selected, /<a\b/i);
});

test("renders aligned, continuous project diagrams including Chatter", async () => {
  const softwareHtml = await (await render("/software")).text();
  for (const key of ["helios", "fedai", "awardlens", "chatter"]) {
    assert.match(softwareHtml, new RegExp(`data-project-visual="${key}"`, "i"), key);
  }
  for (const label of [
    "RESEARCH", "DECISIONS", "REQUIREMENTS", "PRODUCT", "CONTEXT", "EVALUATION", "RECEIPT",
    "APPROVED", "SOURCES", "RETRIEVE", "GUARDRAILS", "AUDIT", "REVIEW",
    "COMPLETED", "PEER WORK", "AFFECTED", "DEPENDENCY", "RE-STRATEGIZES", "WITHIN SCOPE", "RECONCILIATION",
  ]) {
    assert.match(softwareHtml, new RegExp(escapeRegExp(label), "i"), label);
  }

  const source = await readFile(new URL("../components/ProjectVisual.tsx", import.meta.url), "utf8");
  assert.match(source, /textAnchor="middle"/);
  assert.match(source, /dominantBaseline="middle"/);
  assert.match(source, /d="M148 180H484"/);
  assert.match(source, /d="M144 180H472"/);
  assert.doesNotMatch(source, /approved-source-agent-brain/i);
});

test("defines explicit diagram and concept-image media contracts", async () => {
  const types = await readFile(new URL("../content/types.ts", import.meta.url), "utf8");
  assert.match(types, /kind:\s*"diagram"/);
  assert.match(types, /kind:\s*"conceptImage"/);
  assert.match(types, /caption:\s*string/);
  assert.match(types, /\|\s*"chatter"/);
  assert.doesNotMatch(types, /approved-source-agent-brain/i);
});

test("keeps public software and hardware indexes at coming-soon status", async () => {
  const [home, software, hardware, markdown] = await Promise.all(
    ["/", "/software", "/hardware", "/llm.txt"].map(async (route) => (await render(route)).text()),
  );

  assert.equal((software.match(/software-row__status[^>]*>Coming soon/gi) ?? []).length, 4);
  assert.match(hardware, /hardware-feature__status[^>]*>Coming soon/i);
  assert.match(markdown, /Case study coming soon/i);

  const publicHumanSurface = [home, software, hardware, markdown].join("\n");
  for (const route of [...SOFTWARE_CASE_ROUTES, ...HARDWARE_CASE_ROUTES]) {
    assert.doesNotMatch(publicHumanSurface, new RegExp(`href="${escapeRegExp(route)}"`, "i"), route);
  }

  const projectsSource = await readFile(new URL("../content/projects.ts", import.meta.url), "utf8");
  const ctas = [...projectsSource.matchAll(/cta:\s*\{([\s\S]*?)\},\s*seo:/g)].map((match) => match[1]);
  assert.equal(ctas.length, 4);
  for (const cta of ctas) {
    assert.match(cta, /availability:\s*"comingSoon"/);
    assert.doesNotMatch(cta, /\bhref\s*:/);
  }
});

test("removes Approved-Source Agent Brain from public sources and output", async () => {
  const source = await readSources(["app", "components", "content", "lib"]);
  assert.doesNotMatch(source, /Approved-Source Agent Brain|approved-source-agent-brain/i);

  const outputs = await Promise.all(
    ["/", "/software", "/llm.txt", "/sitemap.xml"]
      .map(async (route) => (await render(route)).text()),
  );
  assert.doesNotMatch(outputs.join("\n"), /Approved-Source Agent Brain|approved-source-agent-brain/i);
  assert.equal((await render("/software/approved-source-agent-brain")).status, 404);
});

test("keeps case-detail routes out of public route, sitemap, canonical, and evidence indexes", async () => {
  const routeSource = await readFile(new URL("../lib/routes.ts", import.meta.url), "utf8");
  const siteRoutesBlock = routeSource.match(/export const SITE_ROUTES[\s\S]*?export const ROUTE_SEO/)?.[0] ?? "";
  assert.ok(siteRoutesBlock, "SITE_ROUTES block found");
  for (const routeName of ["helios", "fedai", "awardLens", "chatter", "zynerTreaty"]) {
    assert.doesNotMatch(siteRoutesBlock, new RegExp(`ROUTES\\.${routeName}\\b`), routeName);
  }

  const sitemap = await (await render("/sitemap.xml")).text();
  for (const route of [...SOFTWARE_CASE_ROUTES, ...HARDWARE_CASE_ROUTES]) {
    assert.doesNotMatch(sitemap, new RegExp(`<loc>[^<]*${escapeRegExp(route)}<\\/loc>`, "i"), route);
  }

  const machineResources = [await (await render("/llm.txt")).text()];
  for (const route of [...SOFTWARE_CASE_ROUTES, ...HARDWARE_CASE_ROUTES]) {
    assert.doesNotMatch(machineResources.join("\n"), new RegExp(`https?:\\/\\/[^\\s)]+${escapeRegExp(route)}`, "i"), route);
  }
});

test("renders all four canonical knowledge articles with unique metadata", async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (let index = 0; index < KNOWLEDGE_ROUTES.length; index += 1) {
    const route = KNOWLEDGE_ROUTES[index];
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, new RegExp(escapeRegExp(KNOWLEDGE_TITLES[index]), "i"), route);
    assert.equal((html.match(/<h1[\s>]/gi) ?? []).length, 1, `${route} has one h1`);
    assert.match(html, /"@type":"Article"/);
    assert.match(html, /"@type":"BreadcrumbList"/);

    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
    assert.ok(title, `${route} has a title`);
    assert.ok(description, `${route} has a description`);
    assert.ok(!titles.has(title), `${route} title is unique`);
    assert.ok(!descriptions.has(description), `${route} description is unique`);
    titles.add(title);
    descriptions.add(description);
  }

  const indexHtml = await (await render("/knowledge")).text();
  assert.match(indexHtml, /Four essays/i);
  for (const route of KNOWLEDGE_ROUTES) {
    assert.match(indexHtml, new RegExp(`href="${escapeRegExp(route)}"`, "i"), route);
  }
});

test("keeps each essay aligned to its public-safe product argument", async () => {
  const pages = Object.fromEntries(await Promise.all(
    KNOWLEDGE_ROUTES.map(async (route) => [route, await (await render(route)).text()]),
  ));

  for (const phrase of [
    "I am building Helios around a different premise",
    "Helios is in development",
    "research and decisions become requirements",
    "delivery returns evidence",
    "verified learning updates what the product knows",
  ]) {
    assert.match(pages["/knowledge/context-is-product-architecture"], new RegExp(escapeRegExp(phrase), "i"), phrase);
  }

  for (const phrase of [
    "Chatter is a local prototype",
    "real local SQLite-backed service",
    "simulated agent sessions",
    "end-to-end live Codex-to-Claude workflow remains unproven",
    "re-strategizes only inside its existing scope and authority",
    "reconciliation receipt",
  ]) {
    assert.match(pages["/knowledge/chatter-adaptive-agent-coordination"], new RegExp(escapeRegExp(phrase), "i"), phrase);
  }

  for (const phrase of [
    "1. Findability",
    "2. Understandability",
    "3. Usability",
    "4. Trust",
    "5. Measurement",
    "accessibility standards should never be reframed as a bot-optimization checklist",
    "not every product needs a new protocol",
  ]) {
    assert.match(pages["/knowledge/agents-are-customers"], new RegExp(escapeRegExp(phrase), "i"), phrase);
  }

  for (const phrase of [
    "Zyner + Treaty is my pre-build concept",
    "nothing is thrown, launched, or aimed",
    "deterministic control beneath the AI layer",
    "finite-state controller",
    "Validation should earn physical capability in stages",
    "has not been constructed or safety-validated",
  ]) {
    assert.match(pages["/knowledge/physical-ai-hardware-software-codesign"], new RegExp(escapeRegExp(phrase), "i"), phrase);
  }
});

test("permanently redirects both legacy knowledge URLs", async () => {
  const redirects = new Map([
    ["/knowledge/authentic-ai-systems-expose-boundaries", "/knowledge/chatter-adaptive-agent-coordination"],
    ["/knowledge/intent-should-survive-execution", "/knowledge/physical-ai-hardware-software-codesign"],
  ]);

  for (const [legacy, target] of redirects) {
    const response = await render(legacy);
    assert.equal(response.status, 308, legacy);
    assert.match(response.headers.get("location") ?? "", new RegExp(`${escapeRegExp(target)}$`), legacy);
  }

  const routeSource = await readFile(new URL("../lib/routes.ts", import.meta.url), "utf8");
  assert.match(routeSource, /legacyAuthenticAiSystemsExposeBoundaries\]:\s*ROUTES\.chatterAdaptiveAgentCoordination/);
  assert.match(routeSource, /legacyIntentShouldSurviveExecution\]:\s*ROUTES\.physicalAiHardwareSoftwareCodesign/);
  const pageSource = await readFile(new URL("../app/knowledge/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(pageSource, /permanentRedirect\(redirectTarget\)/);

  const contentSources = await readSources(["content"]);
  assert.doesNotMatch(contentSources, /authentic-ai-systems-expose-boundaries|intent-should-survive-execution/i);
});

test("grounds the new essays in the named primary references", async () => {
  const chatter = await (await render("/knowledge/chatter-adaptive-agent-coordination")).text();
  const agents = await (await render("/knowledge/agents-are-customers")).text();
  const physicalAi = await (await render("/knowledge/physical-ai-hardware-software-codesign")).text();
  const mcp = "https://docs.anthropic.com/en/docs/agents-and-tools/mcp";
  const a2a = "https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/";

  for (const url of [mcp, a2a]) {
    assert.match(chatter, new RegExp(`href="${escapeRegExp(url)}"`, "i"), `Chatter: ${url}`);
  }
  for (const url of [
    "https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/",
    "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
    mcp,
    a2a,
  ]) {
    assert.match(agents, new RegExp(`href="${escapeRegExp(url)}"`, "i"), `Agent experience: ${url}`);
  }
  for (const url of [
    "https://www.nist.gov/programs-projects/physical-ai-and-data-generation-robotics",
    "https://deepmind.google/models/gemini-robotics/responsibly-advancing-ai-and-robotics/",
    "https://www.raspberrypi.com/documentation/computers/ai.html",
  ]) {
    assert.match(physicalAi, new RegExp(`href="${escapeRegExp(url)}"`, "i"), `Physical AI: ${url}`);
  }
});

test("serves one canonical Markdown portfolio and permanently redirects legacy agent routes", async () => {
  const markdown = await render("/llm.txt");
  assert.equal(markdown.status, 200);
  assert.match(markdown.headers.get("content-type") ?? "", /text\/markdown/i);
  assert.match(markdown.headers.get("x-robots-tag") ?? "", /noindex, nofollow/i);
  assert.match(markdown.headers.get("cache-control") ?? "", /private, no-store/i);
  const markdownText = await markdown.text();
  assert.match(markdownText, /^# Viswas Vuppala/m);
  assert.match(markdownText, /Source URL: http:\/\/localhost\//);

  for (const route of ["/agent", "/agent.md", "/agent.json", "/llms.txt", "/llms-full.txt"]) {
    const response = await render(route);
    assert.equal(response.status, 308, route);
    assert.equal(response.headers.get("location"), "http://localhost/llm.txt", route);
  }
});

test("keeps the Markdown portfolio one-to-one with substantive human copy", async () => {
  const importSource = (path) => {
    const url = new URL(path, import.meta.url);
    url.searchParams.set("parity", `${process.pid}-${Date.now()}-${path}`);
    return import(url.href);
  };
  const [publicSite, projectsModule, hardwareModule, experienceModule, beyondModule, profileModule, contextModule, chatterModule, agentsModule, physicalModule] = await Promise.all([
    importSource("../content/public-site.ts"),
    importSource("../content/projects.ts"),
    importSource("../content/hardware.ts"),
    importSource("../content/experience.ts"),
    importSource("../content/beyond-work.ts"),
    importSource("../content/profile.ts"),
    importSource("../content/essays/context-is-product-architecture.ts"),
    importSource("../content/essays/chatter-adaptive-agent-coordination.ts"),
    importSource("../content/essays/agents-are-customers.ts"),
    importSource("../content/essays/physical-ai-hardware-software-codesign.ts"),
  ]);
  const markdown = await (await render("/llm.txt")).text();
  const humanHtml = (await Promise.all(
    ["/", "/software", "/hardware", "/career", "/knowledge", "/beyond-work", ...KNOWLEDGE_ROUTES]
      .map(async (route) => (await render(route)).text()),
  )).join("\n").replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
  const essays = [
    contextModule.contextIsProductArchitecture,
    chatterModule.chatterAdaptiveAgentCoordination,
    agentsModule.agentsAreCustomers,
    physicalModule.physicalAiHardwareSoftwareCodesign,
  ];
  const flattenStrings = (value) => {
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return value.flatMap(flattenStrings);
    if (value && typeof value === "object") return Object.values(value).flatMap(flattenStrings);
    return [];
  };
  const sourceLine = /^(.+?): (https?:\/\/\S+)$/;
  const articleStrings = essays.flatMap((entry) => [
    entry.title,
    entry.eyebrow,
    entry.description,
    entry.dek,
    entry.readingTime,
    entry.disclosure,
    ...entry.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.list ?? []), ...(section.pullQuote ? [section.pullQuote] : [])]),
    ...entry.closing,
  ]);
  const parityStrings = [
    ...flattenStrings(publicSite.publicPageContent),
    publicSite.heroContent.eyebrow,
    publicSite.heroContent.headline,
    publicSite.heroContent.introduction,
    ...publicSite.heroContent.destinations.flatMap((item) => [item.title, item.descriptor]),
    publicSite.capabilityMapContent.centerLabel,
    publicSite.capabilityMapContent.centerTitle,
    ...publicSite.capabilityMapContent.capabilities.flatMap((item) => [item.title, item.description]),
    ...Object.entries(publicSite.projectVisualContent)
      .filter(([key]) => key !== "zyner-treaty")
      .flatMap(([, visual]) => visual.labels.flat()),
    projectsModule.projectIndexIntro.headline,
    projectsModule.projectIndexIntro.description,
    ...projectsModule.projects.flatMap((project) => [project.title, project.category, project.stage, project.summary, project.media.alt]),
    ...hardwareModule.hardwareProjects.flatMap((project) => [project.title, project.stage, project.disclosure, project.summary, project.media.src, project.media.alt, project.media.caption]),
    ...experienceModule.experience.flatMap((role) => [role.organization, role.title, role.period, role.summary, ...role.focus, ...role.themes]),
    ...experienceModule.education.flatMap((entry) => [entry.institution, entry.credential]),
    ...Object.values(experienceModule.technicalSkills).flat(),
    ...beyondModule.beyondWork.flatMap((entry) => [entry.title, entry.shortLabel, entry.summary, entry.reflection, ...(entry.externalLink ? [entry.externalLink] : [])]),
    profileModule.siteProfile.contact.href,
    "Essay",
    ...articleStrings,
  ];

  for (const value of new Set(parityStrings)) {
    assert.ok(markdown.includes(value), `Markdown parity: ${value}`);
    const source = value.match(sourceLine);
    if (source) {
      assert.ok(humanHtml.includes(source[1]), `Human source label: ${source[1]}`);
      assert.ok(humanHtml.includes(source[2]), `Human source URL: ${source[2]}`);
    } else {
      assert.ok(humanHtml.includes(value), `Human parity: ${value}`);
    }
  }

  for (const route of ["/", "/software", "/hardware", "/career", "/knowledge", "/beyond-work", ...KNOWLEDGE_ROUTES]) {
    assert.match(markdown, new RegExp(escapeRegExp(`http://localhost${route}`)), route);
  }
  for (const route of [...SOFTWARE_CASE_ROUTES, ...HARDWARE_CASE_ROUTES]) {
    assert.doesNotMatch(markdown, new RegExp(escapeRegExp(route)), route);
  }
  for (const agentOnlyCopy of ["schemaVersion", "Recruiter signals and evidence", "Technical vocabulary for matching", "Canonical routes"]) {
    assert.doesNotMatch(markdown, new RegExp(escapeRegExp(agentOnlyCopy), "i"), agentOnlyCopy);
  }
});

test("publishes AI Ready RVA as a fourth pillar and structured affiliation", async () => {
  const [home, beyond, career] = await Promise.all(
    ["/", "/beyond-work", "/career"].map(async (route) => (await render(route)).text()),
  );
  for (const html of [home, beyond]) {
    const normalized = html.replaceAll("&amp;", "&").replaceAll("\\u0026", "&");
    assert.match(normalized, new RegExp(escapeRegExp("AI Ready RVA"), "i"));
    assert.match(normalized, new RegExp(escapeRegExp(AI_READY_RVA_COPY), "i"));
    assert.match(normalized, new RegExp(`href="${escapeRegExp(AI_READY_RVA_URL)}"`, "i"));
  }
  const cards = beyond.match(/<section class="beyond-cards[^"]*"[^>]*>([\s\S]*?)<\/section>/i)?.[1] ?? "";
  assert.equal((cards.match(/<article\b/g) ?? []).length, 4);
  assert.match(career, /"memberOf":\[/);
  assert.match(career, /"affiliation":\[/);
  assert.match(career, new RegExp(escapeRegExp(AI_READY_RVA_URL)));
  assert.match(career.replaceAll("\\u0026", "&"), new RegExp(escapeRegExp(AI_READY_RVA_COPY)));

  const markdown = await (await render("/llm.txt")).text();
  assert.match(markdown, new RegExp(escapeRegExp(AI_READY_RVA_COPY)));
  assert.match(markdown, new RegExp(escapeRegExp(AI_READY_RVA_URL)));
});

test("labels the Zyner image as an AI-generated pre-build concept", async () => {
  const [home, hardware] = await Promise.all(
    ["/", "/hardware"].map(async (route) => (await render(route)).text()),
  );
  for (const html of [home, hardware]) {
    assert.match(html, /zyner-treaty-concept-workbench\.webp/i);
    assert.match(html, /AI-generated concept visualization · pre-build/i);
    assert.match(html, /alt="AI-generated pre-build concept of a compact wheeled rover/i);
  }
  assert.match(hardware, /not constructed, tested, or safety validated/i);
  assert.doesNotMatch(hardware, /completed product|validated prototype|working rover/i);

  const image = await readFile(new URL("../public/zyner-treaty-concept-workbench.webp", import.meta.url));
  assert.equal(image.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(image.subarray(8, 12).toString("ascii"), "WEBP");
});

test("keeps the global footer focused on indexes, writing, and one Markdown agent view", async () => {
  const html = await (await render("/software")).text();
  const routes = [
    "/", "/software", "/hardware", "/career", "/knowledge", "/beyond-work",
    ...KNOWLEDGE_ROUTES,
    "/llm.txt",
  ];
  for (const route of routes) {
    assert.match(html, new RegExp(`href="${escapeRegExp(route)}"`, "i"), route);
  }
  for (const route of [...SOFTWARE_CASE_ROUTES, ...HARDWARE_CASE_ROUTES]) {
    assert.doesNotMatch(html, new RegExp(`href="${escapeRegExp(route)}"`, "i"), route);
  }
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/viswasv\/"/i);
  assert.match(html, /href="https:\/\/github\.com\/viswas-clawd"/i);
  for (const legacyRoute of ["/agent", "/llms.txt", "/llms-full.txt", "/agent.md", "/agent.json"]) {
    assert.doesNotMatch(html, new RegExp(`href="${escapeRegExp(legacyRoute)}"`, "i"), legacyRoute);
  }
  assert.match(html, />Markdown view</i);
  assert.match(html, />Markdown portfolio</i);
  assert.match(html, />Quick links</i);
});

test("renders grounded career evidence without private names or résumé metrics", async () => {
  const html = await (await render("/career")).text();
  for (const phrase of [
    "Creative GenAI solutions, grounded in customer needs and built for real workflows.",
    "privacy-preserving, retrieval-backed agent workflows",
    "role-based access, guardrails, citations, auditability, and human review",
    "no-code workflow",
    "AI developer workflows",
    "manage and mentor PMs",
    "cross-functional teams can execute",
  ]) {
    assert.match(html, new RegExp(escapeRegExp(phrase), "i"), phrase);
  }
  assert.doesNotMatch(html, /Metrics omitted|Customer Assist|Athena|Nike|DHS|50M|95%|22%|86%|18 months|4 months/i);
});

test("keeps the built public surface free of private source material and supplied metrics", async () => {
  const publicSource = await readSources(["app", "components", "content", "lib"]);
  assert.doesNotMatch(publicSource, /\b(?:Clog|Herbie)\b/i);

  const files = await collectFiles(new URL("../dist/", import.meta.url));
  const combined = (await Promise.all(files.map((file) => readFile(file, "utf8").catch(() => "")))).join("\n");
  const forbidden = [
    /fed-ai\.com/i,
    /github\.com\/[^"\s]*fedai/i,
    /\(703\)\s*608[- ]4584/i,
    /[\w.+-]+@(?:fed-ai|gmail|outlook)\.[a-z]{2,}/i,
    /viswasvuppala\.(?:com|ai)/i,
    /codex-clipboard-[a-f0-9-]+\.png/i,
    /\/Users\/sungjinwoo/i,
    /OPENAI_API_KEY|client_secret|sk-[A-Za-z0-9_-]{12,}/,
    /github\.com\/Helios-PM/i,
    /\bCustomer Assist\b|\bAthena\b|\bNike\b|Department of Homeland Security|\bDHS\b/i,
    /\b50M\+|~95%|\b22%|\b86%|\b18 months|\b4 months|\$100B|\b120\+|17,000\+|\$200M\+|95 NPS|\b50\+|\$500K\+/i,
    /Approved-Source Agent Brain|approved-source-agent-brain/i,
    /\b(?:Clog|Herbie)\b/i,
  ];
  for (const pattern of forbidden) assert.doesNotMatch(combined, pattern);
  assert.match(combined, /\bFedAI\b/);
  assert.match(combined, /\bChatter\b/);
});

test("keeps the portrait fully framed, the intro legible, and hero fallbacks accessible", async () => {
  const homepage = await (await render("/")).text();
  assert.match(homepage, /data-code-generated="true"/i);
  assert.match(homepage, /data-private-reference-derivative="true"/i);
  assert.match(homepage, /data-portrait-asset="portrait-wordfield-v2"/i);
  assert.match(homepage, /portrait-wordfield-v2\.png/i);
  assert.match(homepage, /rel="(?:shortcut )?icon"[^>]*href="\/portrait-wordfield-v2\.png"/i);
  assert.match(homepage, /<img\b[^>]*\balt=""[^>]*>/i);
  assert.doesNotMatch(homepage, /portrait-density-mask\.png/i);
  for (const route of ["software", "hardware", "career", "knowledge", "beyond-work"]) {
    assert.match(homepage, new RegExp(`href="/${route}"`, "i"), route);
  }

  const heroSource = await readFile(new URL("../components/SignalWorld.tsx", import.meta.url), "utf8");
  const heroCss = await readFile(new URL("../components/signal-world.module.css", import.meta.url), "utf8");
  assert.match(heroSource, /progress\s*>=\s*0\.86/);
  assert.match(heroSource, /setAttribute\("aria-disabled",\s*"true"\)/);
  assert.match(heroSource, /node\.tabIndex\s*=\s*destinationsInteractive\s*\?\s*0\s*:\s*-1/);
  assert.match(heroSource, /FOREHEAD_PORTS/);
  assert.match(heroSource, /drawForeheadAperture\(context, forehead, networkReveal\)/);
  assert.match(heroSource, /forehead\.ports\[index\]/);
  assert.match(heroSource, /if \(!context\)[\s\S]*?node\.dataset\.interactive = "true"/);
  assert.doesNotMatch(heroSource, /INNER_SYSTEMS|VISIBLE_SYSTEM_LEGEND|phaseRef|setPhase/);
  assert.doesNotMatch(heroSource, /--portrait-scale|scale\([^)]*progress/i);
  assert.match(heroCss, /--portrait-anchor-x:\s*70%[\s\S]*?width:\s*min\(60vw,\s*68rem\)/);
  assert.match(heroCss, /@media \(max-width: 819px\)[\s\S]*?--portrait-anchor-x:\s*52%[\s\S]*?width:\s*96vw/);
  assert.match(heroCss, /intro > p:last-child[\s\S]*?color:\s*rgb\(255 255 255 \/ 96%\)/);
  assert.match(heroCss, /\.node\s*\{[\s\S]*?opacity:\s*var\(--node-progress\)/);
  assert.match(heroCss, /data-ready="true"\]\[data-motion="on"\][\s\S]*?pointer-events:\s*none/);
  assert.match(heroCss, /data-motion="off"[\s\S]*?--node-progress:\s*1\s*!important/);

  await Promise.all([
    readFile(new URL("../public/favicon.png", import.meta.url)),
    readFile(new URL("../public/og.png", import.meta.url)),
    readFile(new URL("../public/portrait-wordfield-v2.png", import.meta.url)),
  ]);
  await assert.rejects(access(new URL("../public/portrait-density-mask.png", import.meta.url)));
  await assert.rejects(access(new URL("../public/codex-clipboard-4283a6b9-9f4e-49da-96c1-353dafd4e42b.png", import.meta.url)));
});

test("keeps removed taxonomy unavailable and private sitemap behavior intact", async () => {
  for (const route of [
    "/work", "/work/helios", "/systems", "/writing",
    "/writing/context-is-product-architecture", "/about",
  ]) {
    assert.equal((await render(route)).status, 404, route);
  }

  const robots = await render("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Disallow:\s*\//i);

  const sitemap = await render("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  for (const route of ["career", "beyond-work", "llm.txt", ...KNOWLEDGE_ROUTES.map((route) => route.slice(1))]) {
    assert.match(xml, new RegExp(escapeRegExp(route)), route);
  }
  assert.doesNotMatch(xml, /\/work|\/systems|\/writing|\/about|authentic-ai-systems-expose-boundaries|intent-should-survive-execution/);
});
