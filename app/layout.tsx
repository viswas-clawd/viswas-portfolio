import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import {
  MotionPreferenceProvider,
  SiteFooter,
  SiteHeader,
  StructuredData,
} from "@/components";
import {
  buildPersonJsonLd,
  buildRouteMetadata,
  buildWebSiteJsonLd,
  ROUTES,
  type SiteProfile as StructuredProfile,
} from "@/lib";
import { aiReadyRvaAffiliation, siteProfile } from "@/content";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildRouteMetadata(ROUTES.home, {
    image: "/portrait-wordfield-v2.png",
    includeDescription: false,
  }),
  icons: {
    icon: "/portrait-wordfield-v2.png",
    shortcut: "/portrait-wordfield-v2.png",
  },
  applicationName: "Viswas Vuppala",
  creator: "Viswas Vuppala",
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const structuredProfile: StructuredProfile = {
  name: siteProfile.name,
  shortName: "Viswas",
  title: siteProfile.role,
  eyebrow: siteProfile.eyebrow,
  headline: siteProfile.headline,
  description: siteProfile.shortBio,
  linkedIn: siteProfile.contact.href,
  capabilities: siteProfile.capabilities,
  affiliations: [aiReadyRvaAffiliation],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body>
        <StructuredData data={[buildWebSiteJsonLd(), buildPersonJsonLd(structuredProfile)]} />
        <MotionPreferenceProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionPreferenceProvider>
      </body>
    </html>
  );
}
