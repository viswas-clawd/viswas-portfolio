import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMedia, StructuredData } from "@/components";
import { getHardwareProject, hardwareProjects } from "@/content";
import { buildBreadcrumbJsonLd, buildMetadata, ROUTES } from "@/lib";

export function generateStaticParams() { return hardwareProjects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const project = getHardwareProject(slug); return project ? buildMetadata({ title: project.seo.title, description: project.seo.description, path: `/hardware/${slug}`, image: "/og.png" }) : {}; }

export default async function HardwareCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getHardwareProject(slug);
  if (!project) notFound();
  return (
    <main id="main-content" className="surface-page shell">
      <StructuredData data={buildBreadcrumbJsonLd([{ name: "Home", path: ROUTES.home }, { name: "Hardware", path: ROUTES.hardware }, { name: project.title, path: `/hardware/${project.slug}` }])} />
      <header className="surface-masthead casefile-masthead"><div className="surface-masthead__register"><Link href={ROUTES.hardware}>Hardware</Link><span>{project.stage}</span><span>Not built or validated</span></div><p className="surface-kicker">Local-first rover / Two safety-bounded paths</p><h1>{project.title}</h1><p className="casefile-masthead__thesis">{project.thesis}</p><ProjectMedia media={project.media} priority /></header>
      <section className="hardware-module-section" aria-labelledby="modules-heading"><header><p className="register-label">One system / Two modules</p><h2 id="modules-heading">Independent control, separate authorization.</h2></header><div className="hardware-modules">{project.modules.map((module) => <article key={module.name}><p>Module</p><h3>{module.name}</h3><p>{module.purpose}</p><strong>{module.safetyBoundary}</strong></article>)}</div></section>
      <section className="register-section" aria-labelledby="hardware-design-heading"><div className="register-section__heading"><p className="register-label">Pre-build design</p><h2 id="hardware-design-heading">Safety before assembly.</h2><p>{project.role}</p></div><ol className="decision-ledger">{project.systemDesign.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol></section>
      <aside className="case-boundary-note" aria-labelledby="hardware-boundary-heading"><p className="register-label">Status boundary</p><h2 id="hardware-boundary-heading">Concept only.</h2><p>{project.boundaryNote}</p></aside>
    </main>
  );
}
