import type { Metadata, Viewport } from "next";
import "./plain.css";
import { newsreader } from "./font";
import { education, siteConfig } from "@/lib/data";
import { SITE_URL, siteMetadata } from "@/lib/metadata";
import VersionSwitch from "@/components/version-switch";

export const metadata: Metadata = siteMetadata("/");

export const viewport: Viewport = { themeColor: "#FAF9F5" };

const [locality, region] = siteConfig.location.split(", ");

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: SITE_URL,
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  address: { "@type": "PostalAddress", addressLocality: locality, addressRegion: region, addressCountry: "US" },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin, siteConfig.socials.twitter],
};

export default function PlainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={newsreader.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        {children}
        <VersionSwitch current="v1" />
      </body>
    </html>
  );
}
