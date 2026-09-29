import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";

/** Canonical origin (www; apex 308s to it). */
export const SITE_URL = "https://www.rahulsharma-cs.site";

const title = `${siteConfig.name} - ${siteConfig.role}`;

/**
 * Metadata shared by both root layouts so V1 (/) and V2 (/v2) can't drift.
 * Plain TS, safe for V1 to import. `tabTitle` only changes the browser tab;
 * link previews and the canonical always describe V1.
 */
export function siteMetadata(url: "/" | "/v2", tabTitle = title): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: tabTitle,
    description: siteConfig.description,
    authors: [{ name: siteConfig.name, url: SITE_URL }],
    // V2 is the same facts in another design: index V1 only.
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      title,
      description: siteConfig.description,
      url,
      // ?v=2 busts WhatsApp/Facebook's cached blueprint-era card on rescrape.
      images: [{ url: "/og.png?v=2", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      creator: `@${siteConfig.socials.twitter.split("/").pop()}`,
    },
  };
}
