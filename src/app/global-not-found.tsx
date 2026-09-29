import type { Metadata } from "next";
import "./(plain)/plain.css";
import { newsreader } from "./(plain)/font";

export const metadata: Metadata = {
  title: "Page not found - Rahul Sharma",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={newsreader.variable}>
      <body>
        <main>
          <header>
            <h1>Page not found</h1>
            <p className="tagline">There&apos;s nothing at this address.</p>
            <nav aria-label="Pages">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- "/" is another root layout, so this is a full page load either way */}
              <a href="/">Home</a>
              <a href="/v2">Blueprint version</a>
            </nav>
          </header>
        </main>
      </body>
    </html>
  );
}
