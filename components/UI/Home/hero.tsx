"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { higuen } from "@/lib/utils/fonts";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    gsap.from(titleRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    gsap.from(subRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const name = nameRef.current;
    const glow = glowRef.current;
    const title = titleRef.current;
    const sub = subRef.current;
    const container = containerRef.current;

    if (!name || !glow || !title || !sub || !container) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const nameX = gsap.quickTo(name, "x", { duration: 1, ease: "power3.out" });
    const nameY = gsap.quickTo(name, "y", { duration: 1, ease: "power3.out" });
    const glowX = gsap.quickTo(glow, "x", { duration: 1, ease: "power3.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 1, ease: "power3.out" });
    const titleX = gsap.quickTo(title, "x", { duration: 0.6, ease: "power3.out" });
    const titleY = gsap.quickTo(title, "y", { duration: 0.6, ease: "power3.out" });
    const subX = gsap.quickTo(sub, "x", { duration: 0.6, ease: "power3.out" });
    const subY = gsap.quickTo(sub, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      if (!finePointer) return;

      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      nameX(mouseX * 50);
      nameY(mouseY * 30);
      glowX(mouseX * 120);
      glowY(mouseY * 120);
      titleX(mouseX * 10);
      titleY(mouseY * 10);
      subX(mouseX * 6);
      subY(mouseY * 6);
    };

    const ctx = gsap.context(() => {
      gsap.to(container, {
        y: () => -window.innerHeight * 0.3,
        scale: 0.95,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(name, {
        opacity: 0,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(glow, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, container);

    if (finePointer) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    return () => {
      ctx.revert();
      if (finePointer) {
        window.removeEventListener("mousemove", onMove);
      }
    };
  }, []);

  return (
    <header
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute size-[600px] rounded-full bg-green/10 blur-[80px] md:blur-[100px]"
      />

      <h1
        ref={nameRef}
        className={`${higuen.className} absolute text-[180px] md:text-[260px] text-cWhite/5 select-none whitespace-nowrap`}
      >
        BENJAMIN
      </h1>

      <div className="relative z-10 text-center space-y-8 px-4">
        <h2
          ref={titleRef}
          className={`${higuen.className} text-5xl md:text-7xl lg:text-8xl leading-[0.9]`}
        >
          Software <br /> Engineer
        </h2>

        <p ref={subRef} className="text-cWhite/60 max-w-xl mx-auto">
          I build scalable systems, clean interfaces, and interactive digital
          experiences focused on performance and craft.
        </p>

        <div className="flex items-center justify-center gap-6 pt-6">
          <button className="px-6 py-3 bg-green text-black-main rounded-full hover:scale-105 transition-transform">
            View Projects
          </button>

          <button className="text-cWhite/70 hover:text-green transition-colors">
            Contact →
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;