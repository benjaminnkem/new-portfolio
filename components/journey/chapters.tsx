"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import qrcode from "qrcode-generator";
import { HACKATHONS, MESH, TICKET_QR, TRACKS, WETINNEXT } from "@/lib/journey/data";
import { Ph } from "./ph";

/* ---------- 200 ok: the response comes back and a ticket prints ---------- */
export function Response({ onPrinted }: { onPrinted: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const qrRef = useRef<HTMLCanvasElement>(null);
  const [armed, setArmed] = useState(false);
  const [printed, setPrinted] = useState(false);

  useEffect(() => {
    const c = qrRef.current;
    if (!c) return;
    const q = qrcode(0, "M");
    q.addData(TICKET_QR);
    q.make();
    const n = q.getModuleCount();
    c.width = c.height = n;
    const g = c.getContext("2d")!;
    g.fillStyle = "#E8EAE6";
    g.fillRect(0, 0, n, n);
    g.fillStyle = "#0B0D0C";
    for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) if (q.isDark(r, k)) g.fillRect(k, r, 1, 1);
  }, []);

  useEffect(() => {
    // the ticket starts hidden only when it can animate in; otherwise it is just there
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    setArmed(true);
    // observe the section, not the ticket: a clipped element never reports as visible
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPrinted(true);
          onPrinted();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [onPrinted]);

  return (
    <section ref={sectionRef} className="chapter response" id="response" data-far="response" data-word="200.">
      <div className="wrap">
        <div>
          <p className="label">response · 4 hops · back to your phone</p>
          <p className="ok200">200 ok</p>
          <p className="lede">your ticket&apos;s ready. every layer that request touched, i&apos;ve built and shipped.</p>
        </div>
        <div className={`ticket${armed ? " armed" : ""}${printed ? " printed" : ""}`}>
          <div className="t-top">
            <span className="label">wetinnext · e-ticket</span>
            <p className="t-admit">admit one</p>
            <div className="t-row"><span>event</span><span>tochison_</span></div>
            <div className="t-row"><span>role</span><span>yours</span></div>
            <div className="t-row"><span>covers</span><span>phone · web · api · data</span></div>
            <div className="t-row"><span>starts</span><span>whenever you&apos;re ready</span></div>
            <div className="t-row"><span>entry</span><span>qr · works once</span></div>
          </div>
          <div className="t-tear" />
          <div className="t-bottom">
            <div className="qr">
              <canvas ref={qrRef} role="img" aria-label="QR code linking to my GitHub" />
            </div>
            <p>scan to reach me.<br />or keep scrolling.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- founder mode: wetinnext ---------- */
export function Founder() {
  return (
    <section className="chapter" id="founder" data-far="founder">
      <div className="wrap">
        <div className="panel founder-grid">
          <div className="founder-copy">
            <p className="label">founder mode</p>
            <h2>i don&apos;t just build for founders. i am one.</h2>
            <p>{WETINNEXT.pitch}</p>
            <p><Ph text={WETINNEXT.why} /></p>
            <ul className="facts">
              {WETINNEXT.facts.map((f) => (
                <li key={f.k}><span>{f.k}</span><span><Ph text={f.v} /></span></li>
              ))}
              <li>
                <span>live</span>
                <span><a href={WETINNEXT.url} target="_blank" rel="noopener noreferrer">wetinnext.com ↗</a></span>
              </li>
            </ul>
          </div>
          <div className="shots">
            {WETINNEXT.screens.map((s) => (
              <figure className="shot" key={s.src}>
                <Image src={s.src} alt={s.alt} width={631} height={760} sizes="(max-width: 820px) 30vw, 180px" />
                <figcaption className="label">{s.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- side quests: hackathons ---------- */
export function Quests() {
  const wins = HACKATHONS.filter((h) => h.result === "won").length;
  return (
    <section className="chapter" id="quests" data-far="quests">
      <div className="wrap">
        <div className="quests">
          <div className="log">
            <div className="log-bar">
              <span className="label">$ git log --side-quests</span>
              <span className="label">{wins} wins</span>
            </div>
            <ol>
              {HACKATHONS.map((h) => (
                <li key={h.name}>
                  <span className={`tag${h.result === "won" ? " won" : ""}`}>{h.result}</span>
                  <span>
                    <span className="what">{h.name}</span>
                    <span className="sub"><Ph text={h.note} /></span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mesh">
            <div className="row">
              <span className="label">winner · ai³ hackathon</span>
              <span className="label">web3 · ai</span>
            </div>
            <h3>mesh</h3>
            <p>{MESH.tagline}</p>
            <ul>{MESH.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <span style={{ alignSelf: "flex-start" }}><Ph text={MESH.link} /></span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- off the clock: gym + burna, with an equalizer that follows scroll speed ---------- */
export function OffClock() {
  const eqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eq = eqRef.current;
    if (!eq || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bars = [...eq.children] as HTMLElement[];
    let visible = false, raf = 0, lastY = scrollY, vel = 0;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) raf = requestAnimationFrame(tick);
    });
    const tick = (now: number) => {
      if (!visible) return;
      vel += (scrollY - lastY - vel) * 0.2;
      lastY = scrollY;
      const energy = Math.min(1, Math.abs(vel) / 40);
      bars.forEach((b, i) => {
        b.style.transform = `scaleY(${0.35 + 0.65 * Math.abs(Math.sin(now / (260 + i * 23) + i)) * (0.4 + energy * 0.6)})`;
      });
      raf = requestAnimationFrame(tick);
    };
    io.observe(eq);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="chapter" id="off" data-far="off">
      <div className="wrap">
        <div className="panel off-grid">
          <div>
            <p className="label">off the clock</p>
            <h2>gym first. then burna.</h2>
            <p>i lift most mornings. same rule as code: show up, add a little weight, don&apos;t skip the boring sets.</p>
            <div className="eq" ref={eqRef} aria-hidden="true">
              {Array.from({ length: 28 }, (_, i) => (
                <i key={i} style={{ height: `${Math.round(25 + 60 * Math.abs(Math.sin(i * 1.7)))}%` }} />
              ))}
            </div>
          </div>
          <div>
            <p className="label">on repeat · burna boy</p>
            <ol className="tracks">
              {TRACKS.map((t) => (
                <li key={t.title}>{t.title}<span>{t.mood}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
