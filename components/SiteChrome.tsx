import Link from "next/link";
import { PRIMARY_NAVIGATION, ROUTES } from "@/lib";
import { siteProfile } from "@/content/profile";
import { MotionToggle } from "./MotionPreference";
import { MobileIndex } from "./MobileIndex";
import { ReadingModeSwitch } from "./ReadingModeSwitch";

const FOOTER_LINK_GROUPS = [
  {
    label: "Explore",
    links: [
      { label: "Home", href: ROUTES.home },
      ...PRIMARY_NAVIGATION,
    ],
  },
  {
    label: "Work",
    links: [
      { label: "Software overview", href: ROUTES.software },
      { label: "Hardware overview", href: ROUTES.hardware },
      { label: "Career", href: ROUTES.career },
    ],
  },
  {
    label: "Writing",
    links: [
      { label: "Context Is Product Architecture", href: ROUTES.contextIsProductArchitecture },
      { label: "Agents Should Re-strategize", href: ROUTES.chatterAdaptiveAgentCoordination },
      { label: "Your Next Customer Might Be an AI Agent", href: ROUTES.agentsAreCustomers },
      { label: "Physical AI Is a Hardware-Software Product", href: ROUTES.physicalAiHardwareSoftwareCodesign },
    ],
  },
  {
    label: "Agent view",
    links: [
      { label: "Markdown portfolio", href: ROUTES.llm },
    ],
  },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-header__inner">
        <Link className="wordmark" href={ROUTES.home} aria-label="Viswas Vuppala, home">
          <span className="wordmark__primary">VV</span>
          <span className="wordmark__secondary">/ AI PRODUCT SYSTEMS</span>
        </Link>

        <nav className="primary-nav" aria-label="Primary navigation">
          {PRIMARY_NAVIGATION.map((item, index) => (
            <Link key={item.href} href={item.href}>
              <span aria-hidden="true">0{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ReadingModeSwitch />
          <MotionToggle />
          <a
            className="header-cta"
            href={siteProfile.contact.href}
            target="_blank"
            rel="noreferrer"
          >
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
        </div>

        <MobileIndex />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__directory">
        <div className="site-footer__heading">
          <p>Quick links</p>
          <Link href={ROUTES.home}>Viswas Vuppala</Link>
        </div>

        <div className="site-footer__groups">
          {FOOTER_LINK_GROUPS.map((group) => (
            <section key={group.label}>
              <h2>{group.label}</h2>
              <nav aria-label={`${group.label} links`}>
                {group.links.map((item) => (
                  <Link key={item.href} href={item.href}>{item.label}</Link>
                ))}
              </nav>
            </section>
          ))}

          <section>
            <h2>Profiles</h2>
            <nav aria-label="Profile links">
              {siteProfile.socialLinks.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                  {item.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </nav>
          </section>
        </div>
      </div>

      <p className="site-footer__note">
        © {new Date().getFullYear()} Viswas Vuppala
      </p>
    </footer>
  );
}
