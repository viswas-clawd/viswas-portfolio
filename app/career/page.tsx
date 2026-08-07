import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components";
import { aiReadyRvaAffiliation, education, experience, publicPageContent, siteProfile, technicalSkills } from "@/content";
import { buildBreadcrumbJsonLd, buildProfilePageJsonLd, buildRouteMetadata, ROUTES, type SiteProfile as StructuredProfile } from "@/lib";

export const metadata: Metadata = buildRouteMetadata(ROUTES.career, { image: "/og.png", type: "profile" });
const structuredProfile: StructuredProfile = { name: siteProfile.name, shortName: "Viswas", title: siteProfile.role, eyebrow: siteProfile.eyebrow, headline: siteProfile.headline, description: siteProfile.shortBio, linkedIn: siteProfile.contact.href, capabilities: siteProfile.capabilities, affiliations: [aiReadyRvaAffiliation] };

export default function CareerPage() {
  const content = publicPageContent.career;
  return (
    <main id="main-content" className="surface-page shell">
      <StructuredData data={[buildProfilePageJsonLd(structuredProfile), buildBreadcrumbJsonLd([{ name: "Home", path: ROUTES.home }, { name: "Career", path: ROUTES.career }])]} />
      <header className="surface-masthead profile-masthead"><div className="surface-masthead__register">{content.register.map((item) => <span key={item}>{item}</span>)}</div><p className="surface-kicker">{content.kicker}</p><h1>{content.heading}</h1><div className="surface-masthead__foot"><p>{content.introduction}</p><p>{content.summary}</p><a className="surface-masthead__action" href={siteProfile.contact.href} target="_blank" rel="noreferrer">{content.contactLabel} <span aria-hidden="true">↗</span></a></div></header>
      <section className="register-section" aria-labelledby="career-heading"><div className="register-section__heading"><p className="register-label">{content.roles.label}</p><h2 id="career-heading">{content.roles.heading}</h2></div><ol className="career-timeline">{experience.map((role, index) => <li key={`${role.organization}-${role.period}`}><span>{String(index + 1).padStart(2, "0")}</span><article><p>{role.organization}</p><h3>{role.title}</h3><time>{role.period}</time><p>{role.summary}</p><ul>{role.focus.map((item) => <li key={item}>{item}</li>)}</ul><div className="tag-row">{role.themes.map((theme) => <span key={theme}>{theme}</span>)}</div></article></li>)}</ol></section>
      <section className="career-skills" aria-labelledby="skills-heading"><header><p className="register-label">{content.skills.label}</p><h2 id="skills-heading">{content.skills.heading}</h2></header>{Object.entries(technicalSkills).map(([category, skills]) => <div key={category}><h3>{category.replace(/([A-Z])/g, " $1")}</h3><ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</section>
      <section className="register-section" aria-labelledby="education-heading"><div className="register-section__heading"><p className="register-label">{content.education.label}</p><h2 id="education-heading">{content.education.heading}</h2></div><dl className="education-ledger">{education.map((entry) => <div key={entry.institution}><dt>{entry.institution}</dt><dd>{entry.credential}</dd></div>)}</dl></section>
      <nav className="route-bridge" aria-label="Continue exploring"><p>{content.links.label}</p>{content.links.items.map((link) => <Link key={link.href} href={link.href}>{link.label} <span aria-hidden="true">→</span></Link>)}</nav>
    </main>
  );
}
