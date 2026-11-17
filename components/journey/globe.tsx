"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/lib/journey/data";

/*
 * Footer sign-off: a dotted globe rising like a horizon. Only land is dotted, Lagos pulses in
 * the brand lime, and a dotted great-circle arc runs Lagos → London. Drawn with Canvas 2D (no
 * second WebGL context), loaded and animated only while the footer is near the viewport.
 */

const LAGOS = { lat: 6.52, lon: 3.38 };
const LONDON = { lat: 51.51, lon: -0.13 };
const TILT = -0.42; // radians: look slightly from below so Lagos (near the equator) sits on the visible arc
const INK = "232,234,230";
const MUTED = "138,145,139";
const ACCENT = "#B6F36A";

type V3 = [number, number, number];
const toV = (lat: number, lon: number): V3 => {
  const p = (lat * Math.PI) / 180, l = (lon * Math.PI) / 180;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
};

// points along the great circle between a and b, lifted off the surface in the middle
const arc = (a: V3, b: V3, n = 64): V3[] => {
  const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const w = Math.acos(Math.min(1, Math.max(-1, dot)));
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const s1 = Math.sin((1 - t) * w) / Math.sin(w), s2 = Math.sin(t * w) / Math.sin(w);
    const lift = 1 + Math.sin(t * Math.PI) * 0.12;
    return [(a[0] * s1 + b[0] * s2) * lift, (a[1] * s1 + b[1] * s2) * lift, (a[2] * s1 + b[2] * s2) * lift] as V3;
  });
};

function useLagosTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export default function GlobeFooter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const time = useLagosTime();

  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dots: Float32Array | null = null; // xyz per land dot
    let visible = false, raf = 0, last = 0, W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = 1;
    // the globe sways around Lagos instead of spinning, so the marker is always in view;
    // dragging moves it away and it drifts back home
    const home = (-LAGOS.lon * Math.PI) / 180;
    let yaw = home, phase = 0, offset = 0;
    let drag: { x: number; offset: number } | null = null, fling = 0;
    const lagos = toV(LAGOS.lat, LAGOS.lon);
    const route = arc(lagos, toV(LONDON.lat, LONDON.lon));

    const size = () => {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      R = Math.min(W * 0.46, 560);
      cx = W / 2; cy = H + R * 0.22; // centre below the fold: the top of the globe is the horizon
      if (!visible || reduce) draw(performance.now());
    };

    // rotate around y by yaw, then tilt around x
    const cy0 = Math.cos(TILT), sy0 = Math.sin(TILT);
    const project = (x: number, y: number, z: number, cyaw: number, syaw: number) => {
      const x1 = x * cyaw + z * syaw, z1 = -x * syaw + z * cyaw;
      const y2 = y * cy0 - z1 * sy0, z2 = y * sy0 + z1 * cy0;
      return [cx + x1 * R, cy - y2 * R, z2] as const;
    };

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const cyaw = Math.cos(yaw), syaw = Math.sin(yaw);

      // faint rim so the sphere reads even over the ocean
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${MUTED},0.18)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (dots) {
        // bucket by depth so we only change fillStyle a handful of times
        const buckets: number[][] = [[], [], [], []];
        for (let i = 0; i < dots.length; i += 3) {
          const [sx, sy, z] = project(dots[i], dots[i + 1], dots[i + 2], cyaw, syaw);
          if (z <= 0.02 || sy > H + 2) continue;
          buckets[Math.min(3, Math.floor(z * 4))].push(sx, sy);
        }
        const alpha = [0.18, 0.32, 0.5, 0.72];
        const r = Math.max(1, R / 330);
        buckets.forEach((b, k) => {
          ctx.fillStyle = `rgba(${INK},${alpha[k]})`;
          for (let j = 0; j < b.length; j += 2) ctx.fillRect(b[j] - r / 2, b[j + 1] - r / 2, r, r);
        });
      }

      // Lagos → London, dotted
      ctx.fillStyle = `rgba(${INK},0.55)`;
      route.forEach((p, i) => {
        if (i % 2) return;
        const [sx, sy, z] = project(p[0], p[1], p[2], cyaw, syaw);
        if (z > 0) ctx.fillRect(sx - 1, sy - 1, 2, 2);
      });
      const [lx, ly, lz] = project(...route[route.length - 1], cyaw, syaw);
      if (lz > 0) {
        ctx.fillStyle = `rgb(${INK})`;
        ctx.fillRect(lx - 2, ly - 2, 4, 4);
      }

      // Lagos: the one lime thing in the footer
      const [px, py, pz] = project(lagos[0], lagos[1], lagos[2], cyaw, syaw);
      if (pz > 0) {
        const u = reduce ? 0.4 : ((now / 1600) % 1);
        ctx.beginPath();
        ctx.arc(px, py, 4 + u * 14, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(182,243,106,${(1 - u) * 0.9})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT;
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      if (!visible) return;
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      phase += dt * 0.14;
      if (!drag) {
        offset += fling * dt;
        fling *= Math.pow(0.04, dt); // drag momentum dies off in about a second
        offset *= Math.pow(0.55, dt); // then it drifts back towards Lagos
      }
      yaw = home + offset + Math.sin(phase) * 0.75;
      draw(now);
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !dots) {
        import("@/lib/journey/land-dots").then(({ LAND_DOTS }) => {
          const bin = atob(LAND_DOTS), bytes = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
          const ll = new Int16Array(bytes.buffer);
          const out = new Float32Array((ll.length / 2) * 3);
          for (let i = 0, j = 0; i < ll.length; i += 2, j += 3) out.set(toV(ll[i] / 10, ll[i + 1] / 10), j);
          dots = out;
          draw(performance.now());
        });
      }
      cancelAnimationFrame(raf);
      last = 0;
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    }, { rootMargin: "200px 0px" });
    io.observe(wrap);

    // drag to spin; vertical swipes still scroll the page (touch-action: pan-y)
    const down = (e: PointerEvent) => { drag = { x: e.clientX, offset }; fling = 0; canvas.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const next = drag.offset + ((e.clientX - drag.x) / R) * 1.4;
      fling = Math.max(-3, Math.min(3, (next - offset) * 60));
      offset = next;
      if (reduce) { yaw = home + offset; draw(performance.now()); }
    };
    const up = () => { drag = null; if (reduce) fling = 0; };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    const ro = new ResizeObserver(size);
    ro.observe(wrap);
    size();

    return () => {
      io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <footer className="signoff">
      <div className="wrap signoff-row">
        <div className="signoff-block">
          <span className="wordmark">tochison<span className="u">_</span></span>
          <p className="label">lagos, nigeria · 6.52°n 3.38°e</p>
        </div>
        <div className="signoff-block right">
          <p className="signoff-time">
            <span className="label">local time</span>
            <span className="t" suppressHydrationWarning>{time ?? "--:--"}</span>
            <span className="label">wat · utc+1</span>
          </p>
          <a className="signoff-mail" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
      </div>
      <div ref={wrapRef} className="globe" aria-hidden="true">
        <canvas ref={canvasRef} />
      </div>
      <div className="wrap signoff-base">
        <span className="label">benjamin nkem · software engineer &amp; founder</span>
        <span className="label">lagos → london · drag the globe</span>
      </div>
    </footer>
  );
}
