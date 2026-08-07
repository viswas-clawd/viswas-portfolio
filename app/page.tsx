import Link from "next/link";
import { CapabilityMap, MindField, ProjectMedia } from "@/components";
import { beyondWork, hardwareProjects, projects, publicPageContent, siteProfile } from "@/content";

export default function Home() {
  const content = publicPageContent.home;
  const helios = projects.find((project) => project.slug === "helios")!;
  const fedai = projects.find((project) => project.slug === "fedai")!;
  const zynerTreaty = hardwareProjects[0];
  const selectedWork = [
    { kind: "software" as const, project: helios },
    { kind: "software" as const, project: fedai },
    { kind: "hardware" as const, project: zynerTreaty },
  ];

  return (
    <main id="main-content" className="home-surface">
      <MindField />

      <section id="quick-read" className="home-brief shell" aria-labelledby="brief-heading">
        <header className="home-section-heading">
          <p className="folio-label">{content.overview.label}</p>
          <h2 id="brief-heading">{content.overview.heading}</h2>
          <p>{content.overview.description}</p>
        </header>
        <CapabilityMap />
        <nav className="home-brief__actions" aria-label="Fast paths">
          {content.overview.links.map((link) => <Link key={link.href} href={link.href}>{link.label} <span aria-hidden="true">→</span></Link>)}
        </nav>
      </section>

      <section className="home-proof shell" aria-labelledby="proof-heading">
        <header className="home-section-heading">
          <p className="folio-label">{content.selectedProof.label}</p>
          <h2 id="proof-heading">{content.selectedProof.heading}</h2>
          <p>{content.selectedProof.description}</p>
        </header>
        <div className="proof-card-grid">
          {selectedWork.map(({ kind, project }) => (
            <article className="proof-card" key={project.slug}>
              <ProjectMedia media={project.media} priority={project.slug === "zyner-treaty"} />
              <p>{kind === "software" ? project.category : content.selectedProof.hardwareCategory} / {project.stage}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <span className="proof-card__status">{content.selectedProof.status}</span>
            </article>
          ))}
        </div>
        <nav className="section-route-links" aria-label="All proof routes">
          {content.selectedProof.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
      </section>

      <section className="home-bridge shell" aria-labelledby="bridge-heading">
        <header className="home-section-heading">
          <p className="folio-label">{content.bridge.label}</p>
          <h2 id="bridge-heading">{content.bridge.heading}</h2>
        </header>
        <div className="bridge-grid">
          <article>
            <p className="register-label">{content.bridge.career.label}</p>
            <h3>{content.bridge.career.heading}</h3>
            <p>{content.bridge.career.description}</p>
            <Link href={content.bridge.career.link.href}>{content.bridge.career.link.label} <span aria-hidden="true">→</span></Link>
          </article>
          <article>
            <p className="register-label">{content.bridge.knowledge.label}</p>
            <h3>{content.bridge.knowledge.heading}</h3>
            <p>{content.bridge.knowledge.description}</p>
            <Link href={content.bridge.knowledge.link.href}>{content.bridge.knowledge.link.label} <span aria-hidden="true">→</span></Link>
          </article>
        </div>
      </section>

      <section className="home-beyond shell" aria-labelledby="beyond-heading">
        <header className="home-section-heading">
          <p className="folio-label">{content.beyondWork.label}</p>
          <h2 id="beyond-heading">{content.beyondWork.heading}</h2>
          <p>{content.beyondWork.description}</p>
        </header>
        <ul className="beyond-teaser">
          {beyondWork.map((interest) => (
            <li key={interest.slug}>
              {"externalLink" in interest && interest.externalLink ? (
                <a href={interest.externalLink} target="_blank" rel="noreferrer"><strong>{interest.shortLabel}</strong></a>
              ) : <strong>{interest.shortLabel}</strong>}
              <span>{interest.summary}</span>
            </li>
          ))}
        </ul>
        <Link href={content.beyondWork.link.href}>{content.beyondWork.link.label} <span aria-hidden="true">→</span></Link>
      </section>

      <section className="home-agent shell" aria-labelledby="agent-handoff-heading">
        <div>
          <p className="folio-label">{content.handoff.label}</p>
          <h2 id="agent-handoff-heading">{content.handoff.heading}</h2>
          <p>{content.handoff.description}</p>
        </div>
        <nav className="agent-entry__actions" aria-label="Professional profile formats">
          <Link href={content.handoff.link.href}>{content.handoff.link.label} <span aria-hidden="true">→</span></Link>
          <a href={siteProfile.contact.href} target="_blank" rel="noreferrer">{content.handoff.contactLabel} <span aria-hidden="true">↗</span></a>
        </nav>
      </section>
    </main>
  );
}
