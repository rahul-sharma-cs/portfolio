import type { Metadata } from "next";
import "./globals.css";
import ActiveSectionContextProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";

export const metadata: Metadata = {
  title: "Rahul Sharma — Software Engineer",
  description:
    "Software engineer and CS senior at George Mason University (Dec 2026). Founding engineer at TheCollegeTech. Portfolio drafted as an engineering drawing set.",
};

const themeInitScript = `
try {
  var t = localStorage.theme;
  if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
  if (!sessionStorage.getItem('bp-intro-seen')) {
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
      <body>
        <ThemeContextProvider>
          <ActiveSectionContextProvider>{children}</ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
