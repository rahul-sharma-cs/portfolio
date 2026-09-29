import Image from "next/image";
import team from "../../../public/hackathon-shellhacks-team.jpg";
import demo from "../../../public/hackathon-shellhacks-demo.jpg";
import { siteConfig } from "@/lib/data";
import { plain, type PlainEntry } from "@/lib/plain";

const ext = { target: "_blank", rel: "noopener" } as const;

// XPen$e was built at ShellHacks 2024, so it sits beside the hackathon photos.
const HACKATHON_PROJECT = "XPen$e";
const projects = plain.projects.filter((e) => e.name !== HACKATHON_PROJECT);
const hackathonProject = plain.projects.find((e) => e.name === HACKATHON_PROJECT);

function Entry({ entry }: { entry: PlainEntry }) {
  return (
    <p>
      <strong>
        {entry.href ? (
          <a href={entry.href} {...ext}>
            {entry.name}
          </a>
        ) : (
          entry.name
        )}
      </strong>
      , {entry.lead}. {entry.body}
      {entry.tail && (
        <>
          {" "}
          <a href={entry.tail.href} {...ext}>
            {entry.tail.label}
          </a>
        </>
      )}
    </p>
  );
}

export default function PlainPage() {
  return (
    <main>
      <header>
        <h1>{siteConfig.name}</h1>
        <p className="tagline">{plain.tagline}</p>
        <nav aria-label="Contact">
          <a href={`mailto:${siteConfig.email}`}>Email</a>
          <a href={siteConfig.socials.linkedin} {...ext}>LinkedIn</a>
          <a href={siteConfig.socials.github} {...ext}>GitHub</a>
          <a href={siteConfig.resume} {...ext}>Resume</a>
        </nav>
      </header>

      <section className="intro">
        {plain.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section id="work">
        <h2>Work</h2>
        {plain.work.map((e) => (
          <Entry key={e.name + e.lead} entry={e} />
        ))}
      </section>

      <section id="projects">
        <h2>Projects</h2>
        {projects.map((e) => (
          <Entry key={e.name} entry={e} />
        ))}
        <div className="hackathons">
          <figure className="photos">
            <Image
              src={team}
              alt="Rahul and his teammates under the ShellHacks arch, ShellHacks 2024"
              sizes="(max-width: 520px) 45vw, 185px"
            />
            <Image
              src={demo}
              alt="Rahul demoing XPen$e with his team at ShellHacks 2024"
              sizes="(max-width: 520px) 45vw, 185px"
            />
          </figure>
          {hackathonProject && <Entry entry={hackathonProject} />}
          <p>{plain.hackathons}</p>
        </div>
      </section>

      <section id="education">
        <h2>Education</h2>
        <Entry entry={plain.education} />
      </section>

      <footer>
        {siteConfig.name}, {siteConfig.location}
      </footer>
    </main>
  );
}
