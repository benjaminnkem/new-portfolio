"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { CONTACT, HACKATHONS, SKILL_GROUPS } from "@/lib/journey/data";

type Line = { cmd: string; out: ReactNode };

const link = (href: string, text: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);

const COMMANDS: Record<string, () => ReactNode> = {
  help: () => "commands: hire, stack, wins, github, resume, about, clear",
  hire: () => (
    <>
      good choice.{"\n"}
      email     {CONTACT.email}
      {"\n"}whatsapp  {link(CONTACT.whatsapp, "message me")}
      {"\n"}resume    {link(CONTACT.resume, "benjamin_nkem_resume.pdf")}
    </>
  ),
  stack: () => SKILL_GROUPS.map((g) => `${g.title.padEnd(19)}${g.items.map((s) => s.name).join(", ")}`).join("\n"),
  wins: () => HACKATHONS.map((h) => `${h.result.padEnd(6)}${h.name}`).join("\n"),
  github: () => link(CONTACT.github, "github.com/benjaminnkem"),
  resume: () => link(CONTACT.resume, "benjamin_nkem_resume.pdf"),
  about: () => "benjamin nkem, also tochison. founder of wetinnext. fullstack engineer, lagos. gym most mornings.",
};

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") return setLines([]);
    const fn = COMMANDS[cmd.replace(/^hire\s+tochison$/, "hire")];
    setLines((l) => [...l, { cmd, out: fn ? fn() : `command not found: ${cmd}. try help` }]);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    run(value);
    setValue("");
  };

  return (
    <div className="term">
      <div className="term-bar">
        <span className="label">~/tochison</span>
        <span className="label">try: hire</span>
      </div>
      <div className="term-body" ref={bodyRef} aria-live="polite">
        <p className="out">open to full-time roles and freelance builds. type a command or tap one below.</p>
        {lines.map((l, i) => (
          <div key={i}>
            <p className="echo">$ {l.cmd}</p>
            <p className="out">{l.out}</p>
          </div>
        ))}
        <form onSubmit={submit} autoComplete="off">
          <label htmlFor="cmd">$</label>
          <input
            id="cmd"
            name="cmd"
            spellCheck={false}
            aria-label="terminal command"
            placeholder="hire"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </div>
      <div className="chips">
        {["hire", "stack", "wins", "github", "help"].map((c) => (
          <button key={c} type="button" onClick={() => run(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
