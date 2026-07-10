import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Intro from "@/components/sections/intro";
import Projects from "@/components/sections/projects";
import SectionDivider from "@/components/sections/section-divider";
import Skills from "@/components/sections/skills";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <Projects />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
