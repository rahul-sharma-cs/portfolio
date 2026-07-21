import "@fontsource-variable/archivo/wdth.css"; // wght + wdth axes — the width axis is load-bearing
import "@fontsource-variable/martian-mono";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import ActiveSectionContextProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import SheetGrid from "@/components/drafting/sheet-grid";
import MeasurementNav from "@/components/chrome/measurement-nav";
import SheetFooter from "@/components/chrome/sheet-footer";
import CrosshairCursor from "@/components/chrome/crosshair-cursor";
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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rahul Sharma — Software Engineer. Portfolio drafted as an engineering drawing set." }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F5F0" },
    { media: "(prefers-color-scheme: dark)", color: "#122A47" },
  ],
};

const themeInitScript = `
try {
  var t = localStorage.theme;
  if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
  if (!sessionStorage.getItem('bp-intro-seen') && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('intro-pending');
  }
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative pt-12">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-16 focus:z-50 focus:border focus:border-redline focus:bg-sheet focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-redline"
        >
          Skip to content
        </a>
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <SheetGrid />
            <MeasurementNav />
            <main id="main">{children}</main>
            <SheetFooter />
            <CrosshairCursor />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
