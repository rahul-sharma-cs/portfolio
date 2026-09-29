import type { Metadata, Viewport } from "next";
import "./plain.css";
import { newsreader } from "./font";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rahulsharma-cs.site"),
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    url: "/",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rahul Sharma — Software Engineer." }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#FAF9F5" };

export default function PlainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={newsreader.variable}>
      <body>{children}</body>
    </html>
  );
}
