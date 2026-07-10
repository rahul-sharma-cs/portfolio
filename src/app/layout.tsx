import Header from "@/components/layout/header";
import "./globals.css";
import { Montserrat } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/layout/footer";
import ThemeSwitch from "@/components/layout/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Meteors } from "@/components/ui/meteors";
import { siteConfig } from "@/lib/data";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

const themeInitScript = `(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${montserrat.className} bg-gray-300 text-gray-950 relative pt-28 sm:pt-36 dark:bg-slate-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Meteors number={20} />
            <Header />
            {children}
            <Footer />

            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
