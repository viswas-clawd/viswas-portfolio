import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMedia, StructuredData } from "@/components";
import { getProject, projects } from "@/content";
import { buildBreadcrumbJsonLd, buildMetadata, ROUTES } from "@/lib";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({ title: project.seo.title, description: project.seo.description, path: `/software/${project.slug}`, image: "/og.png" });
}

export default async function SoftwareCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <main id="main-content" className="surface-page shell">
      <StructuredData data={buildBreadcrumbJsonLd([{ name: "Home", path: ROUTES.home }, { name: "Software", path: ROUTES.software }, { name: project.title, path: `/software/${project.slug}` }])} />
      <header className="surface-masthead casefile-masthead">
        <div className="surface-masthead__register"><Link href={ROUTES.software}>Software</Link><span>{project.stage}</span><span>{project.disclosure}</span></div>
        <p className="surface-kicker">{project.category}</p><h1>{project.title}</h1><p className="casefile-masthead__thesis">{project.thesis}</p>
        <ProjectMedia media={project.media} />
      </header>
      <div className="casefile-body">
        <section className="casefile-section"><div className="casefile-section__marker"><span>01</span><p>Problem</p></div><div className="casefile-section__content"><h2>What has to change.</h2><p className="casefile-section__lead">{project.problem}</p></div></section>
        <section className="casefile-section"><div className="casefile-section__marker"><span>02</span><p>Role</p></div><div className="casefile-section__content"><h2>What I shaped.</h2><p className="casefile-section__lead">{project.role}</p></div></section>
        <section className="casefile-section"><div className="casefile-section__marker"><span>03</span><p>Decisions</p></div><div className="casefile-section__content"><h2>The public-safe approach.</h2><ol className="decision-ledger">{project.approach.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol></div></section>
        <section className="casefile-section casefile-section--proof">
          <div className="casefile-section__marker"><span>04</span><p>Proof</p></div>
          <div className="casefile-section__content">
            <h2>What exists today.</h2>
            <dl className="proof-status-ledger">
              {project.proof.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.detail}</dd>
                  <dd className="proof-status-ledger__verification">Verification status / {item.verification}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section className="casefile-section"><div className="casefile-section__marker"><span>05</span><p>What I learned</p></div><div className="casefile-section__content"><h2>What I learned.</h2><ol className="principle-ledger">{project.principles.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol></div></section>
      </div>
      <aside className="case-boundary-note" aria-labelledby="case-boundary-heading"><p className="register-label">Boundary note</p><h2 id="case-boundary-heading">What remains private.</h2><p>{project.boundaryNote}</p></aside>
      <nav className="route-bridge" aria-label="Continue exploring"><p>Continue</p><Link href={ROUTES.software}>Software overview <span aria-hidden="true">→</span></Link><Link href={ROUTES.career}>Career context <span aria-hidden="true">→</span></Link></nav>
    </main>
  );
}
