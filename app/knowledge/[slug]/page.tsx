import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { StructuredData } from "@/components";
import { getKnowledgeEntry, knowledgeEntries, publicPageContent, type ArticleSection } from "@/content";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildMetadata, LEGACY_KNOWLEDGE_REDIRECTS, ROUTES } from "@/lib";

const PUBLISHED_DATE = "2026-08-07";
const SOURCE_LINE = /^(.+?): (https?:\/\/\S+)$/;

function renderArticleText(text: string) {
  const source = text.match(SOURCE_LINE);
  if (!source) return text;

  return (
    <a href={source[2]} target="_blank" rel="noreferrer">
      {source[1]} <span aria-hidden="true">↗</span>
    </a>
  );
}
export function generateStaticParams() { return knowledgeEntries.map((entry) => ({ slug: entry.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const entry = getKnowledgeEntry(slug); return entry ? buildMetadata({ title: entry.seo.title, description: entry.seo.description, path: `/knowledge/${slug}`, image: "/og.png", type: "article" }) : {}; }

export default async function KnowledgeEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const content = publicPageContent.article;
  const { slug } = await params;
  const requestedPath = `/knowledge/${slug}`;
  const redirectTarget = LEGACY_KNOWLEDGE_REDIRECTS[requestedPath as keyof typeof LEGACY_KNOWLEDGE_REDIRECTS];
  if (redirectTarget) permanentRedirect(redirectTarget);
  const entry = getKnowledgeEntry(slug);
  if (!entry) notFound();
  const path = `/knowledge/${entry.slug}` as `/knowledge/${string}`;
  const entryIndex = knowledgeEntries.findIndex((item) => item.slug === entry.slug);
  const related = knowledgeEntries[(entryIndex + 1) % knowledgeEntries.length];
  const sections = entry.sections as readonly ArticleSection[];
  return (
    <main id="main-content" className="surface-page shell">
      <StructuredData data={[buildArticleJsonLd({ headline: entry.title, description: entry.description, path, publishedAt: PUBLISHED_DATE, image: "/og.png" }), buildBreadcrumbJsonLd([{ name: "Home", path: ROUTES.home }, { name: "Knowledge", path: ROUTES.knowledge }, { name: entry.title, path }])]} />
      <article className="field-note"><header className="surface-masthead article-masthead"><div className="surface-masthead__register"><Link href={ROUTES.knowledge}>{content.indexLabel}</Link><span>{entry.kind}</span><span>{entry.disclosure}</span></div><p className="surface-kicker">{entry.eyebrow}</p><h1>{entry.title}</h1><p className="article-masthead__dek">{entry.dek}</p><dl className="article-register"><div><dt>{content.authorLabel}</dt><dd>{content.author}</dd></div><div><dt>{content.typeLabel}</dt><dd>{entry.kind}</dd></div><div><dt>{content.readingTimeLabel}</dt><dd>{entry.readingTime}</dd></div></dl></header><div className="field-note-layout"><aside className="field-note-margin"><nav className="field-note-toc" aria-label="On this page"><p>On this page</p><ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.heading}</a></li>)}</ol></nav></aside><div className="field-note-body">{sections.map((section, index) => <section id={section.id} className="field-note-section" key={section.id}><div className="field-note-section__marker">{String(index + 1).padStart(2, "0")}</div><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{renderArticleText(paragraph)}</p>)}{section.pullQuote ? <blockquote className="field-note-pullquote">{section.pullQuote}</blockquote> : null}{section.list ? <ul className="field-note-list">{section.list.map((item) => <li key={item}>{renderArticleText(item)}</li>)}</ul> : null}</section>)}<section className="field-note-section field-note-section--closing"><div className="field-note-section__marker">END</div><h2>{content.closingHeading}</h2>{entry.closing.map((paragraph) => <p key={paragraph}>{renderArticleText(paragraph)}</p>)}</section></div></div></article>
      <nav className="route-bridge" aria-label="Continue reading"><p>Continue</p><Link href={`/knowledge/${related.slug}`}>Next: {related.title} <span aria-hidden="true">→</span></Link><Link href={ROUTES.software}>See the work <span aria-hidden="true">→</span></Link></nav>
    </main>
  );
}
