import "./version-switch.css";

/**
 * V1/V2 switch, fixed at the same spot on both versions so it never moves when
 * the page does. Plain links: V1 and V2 have different root layouts, so the
 * browser does a full navigation and version-switch.css (@view-transition) animates it.
 * V1 is styled by plain.css (no Tailwind there); V2 by Tailwind utilities.
 */
const POSITION = { right: 12, bottom: 44 } as const;

export default function VersionSwitch({ current }: { current: "v1" | "v2" }) {
  const items = [
    { key: "v1", label: "V1", href: "/", title: "Plain version" },
    { key: "v2", label: "V2", href: "/v2", title: "Blueprint version" },
  ] as const;

  if (current === "v1") {
    return (
      <nav aria-label="Site version" className="version-switch" data-current="v1" style={POSITION}>
        <span aria-hidden className="thumb" />
        {items.map((it) =>
          it.key === current ? (
            <span key={it.key} aria-current="page" title={it.title}>
              {it.label}
            </span>
          ) : (
            <a key={it.key} href={it.href} title={it.title} aria-label={`${it.label}, ${it.title}`}>
              {it.label}
            </a>
          ),
        )}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Site version"
      className="version-switch fixed z-[45] flex w-10 flex-col border border-redline bg-sheet p-1 font-mono text-anno-sm font-bold uppercase tracking-[0.14em]"
      style={POSITION}
    >
      <span aria-hidden className="thumb absolute inset-x-1 top-[34px] h-[30px] bg-redline" />
      {items.map((it) =>
        it.key === current ? (
          <span key={it.key} aria-current="page" title={it.title} className="relative grid h-[30px] place-items-center text-sheet">
            {it.label}
          </span>
        ) : (
          <a key={it.key} href={it.href} title={it.title} aria-label={`${it.label}, ${it.title}`} className="relative grid h-[30px] place-items-center text-redline hover:bg-redline/10">
            {it.label}
          </a>
        ),
      )}
    </nav>
  );
}
