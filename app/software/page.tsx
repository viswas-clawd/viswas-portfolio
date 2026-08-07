import type { Metadata } from "next";
import { ProjectMedia, StructuredData } from "@/components";
import { projectIndexIntro, projects, publicPageContent } from "@/content";
import { buildBreadcrumbJsonLd, buildRouteMetadata, ROUTES } from "@/lib";

export const metadata: Metadata = buildRouteMetadata(ROUTES.software, { image: "/og.png" });

export default function SoftwarePage() {
  const content = publicPageContent.software;
  return (
    <main id="main-content" className="surface-page shell">
      <StructuredData data={buildBreadcrumbJsonLd([{ name: "Home", path: ROUTES.home }, { name: "Software", path: ROUTES.software }])} />
      <header className="surface-masthead">
        <div className="surface-masthead__register">{content.register.map((item) => <span key={item}>{item}</span>)}</div>
        <p className="surface-kicker">{content.kicker}</p>
        <h1>{projectIndexIntro.headline}</h1>
        <div className="surface-masthead__foot">
          <p>{projectIndexIntro.description}</p>
          <p>{content.supporting}</p>
        </div>
      </header>
      <section className="software-ledger" aria-labelledby="software-ledger-heading">
        <h2 id="software-ledger-heading" className="visually-hidden">{content.sectionHeading}</h2>
        {projects.map((project) => (
          <article className="software-row" key={project.slug}>
            <ProjectMedia media={project.media} />
            <div><p>{project.category} / {project.stage}</p><h3>{project.title}</h3></div>
            <p>{project.summary}</p>
            <span className="software-row__status">{content.status}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
