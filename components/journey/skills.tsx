"use client";

import { useEffect, useRef, useState } from "react";
import { CORE_SKILLS, SKILL_GROUPS, shippedWith, type Skill } from "@/lib/journey/data";

type Active = { skill: Skill; group: string } | null;

const total = SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0);
const coreSkills = CORE_SKILLS.map((name) => {
  for (const g of SKILL_GROUPS) {
    const skill = g.items.find((s) => s.name === name);
    if (skill) return { skill, group: g.title };
  }
  return { skill: { name }, group: "core" };
});

/* The toolbox: a terminal-style lockfile. Hover or tap a tool to see which shipped projects used it. */
export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Active>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  // groups print in line by line the first time the section is seen
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const shipped = active ? shippedWith(active.skill) : [];
  const pick = (skill: Skill, group: string) => () => setActive({ skill, group });
  const isActive = (name: string) => active?.skill.name === name;

  let n = 0; // running index for the print-in stagger

  return (
    <section className="chapter" id="stack" data-far="stack">
      <div className="wrap">
        <div
          ref={ref}
          className={`skills${armed ? " armed" : ""}${shown ? " in" : ""}`}
          onMouseLeave={() => setActive(null)}
        >
          <div className="skills-bar">
            <span className="label">$ cat stack.lock</span>
            <span className="label">{SKILL_GROUPS.length} groups · {total} tools</span>
          </div>

          <div className="skills-core">
            <div className="skills-intro">
              <p className="label">daily drivers</p>
              <h2>the tools behind every layer.</h2>
              <p>frontend, backend and the product in between. i pick tools to ship things, not to collect them.</p>
            </div>
            <ul className="core-list">
              {coreSkills.map(({ skill, group }) => (
                <li key={skill.name}>
                  <button
                    type="button"
                    className={`core-tool${isActive(skill.name) ? " on" : ""}`}
                    onMouseEnter={pick(skill, group)}
                    onFocus={pick(skill, group)}
                    onClick={pick(skill, group)}
                  >
                    {skill.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="skills-groups">
            {SKILL_GROUPS.map((g, gi) => (
              <div className="group" key={g.title}>
                <p className="g-head">
                  <span className="g-n">{String(gi + 1).padStart(2, "0")}</span> {g.title}
                </p>
                <ul className="tools">
                  {g.items.map((s) => (
                    <li key={s.name} style={{ ["--i" as string]: n++ }}>
                      <button
                        type="button"
                        className={`tool${CORE_SKILLS.includes(s.name) ? " core" : ""}${isActive(s.name) ? " on" : ""}`}
                        onMouseEnter={pick(s, g.title)}
                        onFocus={pick(s, g.title)}
                        onClick={pick(s, g.title)}
                      >
                        {s.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="readout" aria-live="polite">
            <span className="prompt">&gt;</span>{" "}
            {active ? (
              <>
                <span className="r-name">{active.skill.name}</span>
                <span className="r-dim"> · {active.group}</span>
                {shipped.length > 0 && (
                  <>
                    <span className="r-dim"> · shipped in </span>
                    {shipped.join(" · ")}
                  </>
                )}
              </>
            ) : (
              <span className="r-dim">hover or tap a tool to see where it shipped</span>
            )}
            <span className="caret blink" aria-hidden="true">_</span>
          </p>
        </div>
      </div>
    </section>
  );
}
