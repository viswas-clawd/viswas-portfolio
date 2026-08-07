import type { Metadata } from "next";
import { ProjectMedia, StructuredData } from "@/components";
import { hardwareProjects, publicPageContent } from "@/content";
import { buildBreadcrumbJsonLd, buildRouteMetadata, ROUTES } from "@/lib";

export const metadata: Metadata = buildRouteMetadata(ROUTES.hardware, { image: "/og.png" });

export default function HardwarePage() {
  const content = publicPageContent.hardware;
  return (
    <main id="main-content" className="surface-page shell">
      <StructuredData data={buildBreadcrumbJsonLd([{ name: "Home", path: ROUTES.home }, { name: "Hardware", path: ROUTES.hardware }])} />
      <header className="surface-masthead"><div className="surface-masthead__register">{content.register.map((item) => <span key={item}>{item}</span>)}</div><p className="surface-kicker">{content.kicker}</p><h1>{content.heading}</h1><div className="surface-masthead__foot"><p>{content.introduction}</p><p>{content.boundary}</p></div></header>
      {hardwareProjects.map((project) => (
        <article className="hardware-feature" key={project.slug}>
          <ProjectMedia media={project.media} priority />
          <div><p>{project.stage} / {project.disclosure}</p><h2>{project.title}</h2><p>{project.summary}</p><span className="hardware-feature__status">{content.status}</span></div>
        </article>
      ))}
    </main>
  );
}
