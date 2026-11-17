"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { FocusState, JourneyApi } from "@/lib/journey/engine";
import { CONTACT, LAYERS, PROJECTS } from "@/lib/journey/data";
import { Founder, OffClock, Quests, Response } from "./chapters";
import Terminal from "./terminal";
import Skills from "./skills";
import { Ph } from "./ph";
import "./journey.css";

const BOOT = "$ boot tochison\n  phone · web · api · data ..... ok\n  founder mode ................. on";

function BootLines() {
  // server render shows the finished text; the client types it out unless motion is reduced
  const [typed, setTyped] = useState<number | null>(null);
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setTyped(0);
    let i = 0;
    let timer = window.setTimeout(function tick() {
      i += 3;
      if (i >= BOOT.length) return setTyped(null);
      setTyped(i);
      timer = window.setTimeout(tick, 16);
    }, 200);
    return () => window.clearTimeout(timer);
  }, []);

  if (typed !== null) return <pre className="boot" aria-hidden="true">{BOOT.slice(0, typed)}</pre>;
  const [head, ...rest] = BOOT.split("\n");
  return (
    <pre className="boot" aria-label="boot sequence: phone, web, api, data ok; founder mode on">
      {head}
      {rest.map((line) => {
        const [text, status] = [line.slice(0, line.lastIndexOf(" ") + 1), line.slice(line.lastIndexOf(" ") + 1)];
        return (
          <span key={line}>
            {"\n"}
            {text}
            <span className="ok">{status}</span>
          </span>
        );
      })}
    </pre>
  );
}

export default function Journey() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const api = useRef<JourneyApi | null>(null);

  const [hop, setHop] = useState(-1);
  const [focus, setFocus] = useState<FocusState>(null);
  const [atTop, setAtTop] = useState(true);
  const [webgl, setWebgl] = useState(true);
  const [ticket, setTicket] = useState<"idle" | "sending" | "done">("idle");

  // the 3D engine loads after first paint, in its own chunk
  useEffect(() => {
    let alive = true;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim() || "monospace";
    import("@/lib/journey/engine").then(({ createJourney }) => {
      if (!alive || !rootRef.current || !canvasRef.current || !bigRef.current) return;
      const j = createJourney({
        root: rootRef.current,
        canvas: canvasRef.current,
        bigword: bigRef.current,
        reduce,
        monoFamily: mono,
        onHop: setHop,
        onFocus: setFocus,
      });
      if (j) api.current = j;
      else setWebgl(false);
    });
    return () => {
      alive = false;
      api.current?.destroy();
      api.current = null;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setAtTop(scrollY < innerHeight * 0.5);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // move keyboard focus into the panel on open, and back to whatever opened it once the card has landed
  const isOpen = focus !== null;
  const trigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (isOpen) {
      const active = document.activeElement as HTMLElement | null;
      trigger.current = active && active !== document.body ? active : null;
      closeRef.current?.focus({ preventScroll: true });
    } else {
      trigger.current?.focus({ preventScroll: true });
      trigger.current = null;
    }
  }, [isOpen]);

  const getTicket = () => {
    if (ticket !== "idle") return;
    setTicket("sending");
    api.current?.launch();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => document.getElementById("s-first")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }),
      reduce ? 0 : 450,
    );
  };
  const onPrinted = useCallback(() => setTicket("done"), []);

  const focused = focus ? PROJECTS.find((p) => p.key === focus.key) : undefined;

  return (
    <div
      ref={rootRef}
      className={["journey", atTop && "at-top", focus && "focusing", !webgl && "no-webgl"].filter(Boolean).join(" ")}
    >
      <canvas ref={canvasRef} className="stage" aria-hidden="true" />
      <div ref={bigRef} className="bigword" aria-hidden="true" />

      <header className="hud">
        <a className="wordmark" href="#top" aria-label="tochison, back to top">
          tochison<span className="u">_</span>
        </a>
        <div className="trace" aria-hidden="true">
          <span className="verb">post</span>
          <span className="path">/tickets</span>
          <ol className="hops">
            {LAYERS.map((l, i) => (
              <li key={l} className={i === hop ? "on" : undefined}>{l}</li>
            ))}
          </ol>
        </div>
      </header>

      {focused && focus && (
        <div className="focus">
          <div className="wrap">
            <div className={`focus-panel cap${focus.closing ? " closing" : ""}`} role="dialog" aria-label={`${focused.name} details`}>
              <ProjectCaption project={focused} />
              <div className="focus-ctrl">
                <button type="button" onClick={() => api.current?.go(-1)} disabled={focus.count < 2} aria-label="previous project on this layer">←</button>
                <span className="label">{focus.index + 1} / {focus.count}</span>
                <button type="button" onClick={() => api.current?.go(1)} disabled={focus.count < 2} aria-label="next project on this layer">→</button>
                <button ref={closeRef} type="button" className="close" onClick={() => api.current?.close()}>esc · back to stack</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
        <section className="hero" id="top" data-far="hero">
          <div className="wrap">
            <div>
              <BootLines />
              <h1 className="name">tochison<span className="cursor blink">_</span></h1>
              <p className="thesis">
                software engineer in lagos and founder of wetinnext. i take products from idea to people&apos;s hands.{" "}
                <b>tap get ticket and follow your request through everything i build.</b>
              </p>
              <p className="hint label">or just scroll ↓</p>
            </div>
            <div className="phone" aria-label="wetinnext on a phone">
              <div className="screen">
                <div className="urlbar">wetinnext.com</div>
                <div className="screen-top">
                  <span className="app-name">wetinnext</span>
                  <span className="label">lagos</span>
                </div>
                <div className="poster" aria-hidden="true">
                  <span className="poster-mark">t<span className="cursor">_</span></span>
                </div>
                <p className="label">tonight · lagos · open to hirers</p>
                <p className="ev-title">tochison_: open for work</p>
                <p className="ev-meta">frontend · backend · product. one engineer, the whole stack.</p>
                <button className="ticket-btn" type="button" data-state={ticket} onClick={getTicket}>
                  <span className="dot" />
                  <span>{ticket === "idle" ? "get ticket" : ticket === "sending" ? "sending request" : "ticket ready ✓"}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {PROJECTS.map((p, i) => (
          <section
            key={p.key}
            id={i === 0 ? "s-first" : undefined}
            className="step"
            data-layer={p.layer}
            data-key={p.key}
            data-word={`${LAYERS[p.layer]}.`}
            data-shot={p.shot.kind === "image" ? p.shot.src : undefined}
            data-shot-w={p.shot.kind === "image" ? p.shot.width : undefined}
            data-shot-h={p.shot.kind === "image" ? p.shot.height : undefined}
            data-shot-code={p.shot.kind === "code" ? "1" : undefined}
          >
            <div className="wrap">
              <div className="cap">
                <ProjectCaption project={p} />
                {webgl && (
                  <button type="button" className="open-btn" onClick={() => api.current?.open(p.key)}>
                    open layer ↗
                  </button>
                )}
              </div>
            </div>
          </section>
        ))}

        <Response onPrinted={onPrinted} />
        <Founder />
        <Skills />
        <Quests />
        <OffClock />

        <section className="chapter" id="hire" data-far="hire">
          <div className="wrap hire">
            <div className="hire-copy">
              <p className="label">$ hire tochison</p>
              <h2>got something to build?</h2>
              <p>open to full-time roles and freelance builds. web, backend, or the whole product.</p>
              <ul className="contact">
                <li><a className="btn primary" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">message on whatsapp ↗</a></li>
                <li><a className="btn" href={CONTACT.resume} target="_blank" rel="noopener noreferrer">resume (pdf) ↗</a></li>
                <li><a className="btn" href={CONTACT.github} target="_blank" rel="noopener noreferrer">github ↗</a></li>
                <li><span className="btn static"><Ph text={CONTACT.email} /></span></li>
              </ul>
            </div>
            <Terminal />
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span className="label">tochison_ · benjamin nkem</span>
          <span className="label">phone · web · api · data</span>
        </div>
      </footer>
    </div>
  );
}

function ProjectCaption({ project: p }: { project: (typeof PROJECTS)[number] }) {
  const n = String(p.layer + 1).padStart(2, "0");
  return (
    <>
      <div className="meta">
        <span className="label">{n} / {LAYERS[p.layer]}</span>
        <span className="label">{p.role}</span>
      </div>
      <h2>{p.name}</h2>
      <p>{p.blurb}</p>
      <span className="stack-line"><Ph text={p.stack} /></span>
      {p.link && (
        <a className="more" href={p.link.href} target="_blank" rel="noopener noreferrer">
          {p.link.label} ↗
        </a>
      )}
    </>
  );
}
