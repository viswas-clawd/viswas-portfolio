import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components";
import { beyondWork, publicPageContent } from "@/content";
import { buildBreadcrumbJsonLd, buildRouteMetadata, ROUTES } from "@/lib";

export const metadata: Metadata = buildRouteMetadata(ROUTES.beyondWork, { image: "/og.png" });

export default function BeyondWorkPage() {
  const content = publicPageContent.beyondWork;
  return (
    <main id="main-content" className="surface-page shell beyond-page">
      <StructuredData data={buildBreadcrumbJsonLd([{ name: "Home", path: ROUTES.home }, { name: "Beyond Work", path: ROUTES.beyondWork }])} />
      <header className="surface-masthead">
        <div className="surface-masthead__register">
          {content.register.map((item) => <span key={item}>{item}</span>)}
        </div>
        <p className="surface-kicker">{content.kicker}</p>
        <h1>{content.heading}</h1>
        <div className="surface-masthead__foot">
          <p>{content.introduction}</p>
          <p>{content.community}</p>
        </div>
      </header>
      <section className="beyond-cards beyond-cards--four" aria-label="Beyond work interests">
        {beyondWork.map((interest, index) => (
          <article key={interest.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{interest.shortLabel}</p>
            <h2>{interest.title}</h2>
            <p>{interest.summary}</p>
            {"externalLink" in interest ? (
              <p>
                <a href={interest.externalLink} target="_blank" rel="noreferrer">
                  {content.externalLinkLabel} <span aria-hidden="true">↗</span>
                </a>
              </p>
            ) : null}
            <blockquote>{interest.reflection}</blockquote>
          </article>
        ))}
      </section>
      <nav className="route-bridge" aria-label="Continue exploring">
        <p>{content.links.label}</p>
        {content.links.items.map((link) => <Link key={link.href} href={link.href}>{link.label} <span aria-hidden="true">→</span></Link>)}
      </nav>
    </main>
  );
}
