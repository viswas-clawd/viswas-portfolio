import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components";
import { knowledgeEntries, publicPageContent } from "@/content";
import { buildBreadcrumbJsonLd, buildRouteMetadata, ROUTES } from "@/lib";

export const metadata: Metadata = buildRouteMetadata(ROUTES.knowledge, { image: "/og.png" });
export default function KnowledgePage() {
  const content = publicPageContent.knowledge;
  return <main id="main-content" className="surface-page shell"><StructuredData data={buildBreadcrumbJsonLd([{ name: "Home", path: ROUTES.home }, { name: "Knowledge", path: ROUTES.knowledge }])} /><header className="surface-masthead journal-masthead"><div className="surface-masthead__register">{content.register.map((item) => <span key={item}>{item}</span>)}</div><p className="surface-kicker">{content.kicker}</p><h1>{content.heading}</h1><div className="surface-masthead__foot"><p>{content.introduction}</p><p>{content.boundary}</p></div></header><section className="journal-register" aria-labelledby="knowledge-heading"><div className="journal-register__heading"><p className="register-label">{content.indexLabel}</p><h2 id="knowledge-heading">{content.indexHeading}</h2></div><ol className="article-ledger">{knowledgeEntries.map((entry, index) => <li className="article-ledger__row" key={entry.slug}><span className="article-ledger__number">{String(index + 1).padStart(2, "0")}</span><div className="article-ledger__title"><p>{entry.kind}</p><h3><Link href={`/knowledge/${entry.slug}`}>{entry.title}</Link></h3></div><p className="article-ledger__description">{entry.description}</p><dl className="article-ledger__meta"><div><dt>{content.typeLabel}</dt><dd>{entry.kind}</dd></div><div><dt>{content.lengthLabel}</dt><dd>{entry.readingTime}</dd></div></dl><Link className="article-ledger__link" href={`/knowledge/${entry.slug}`}>{content.readLabel} <span aria-hidden="true">↗</span></Link></li>)}</ol></section></main>;
}
