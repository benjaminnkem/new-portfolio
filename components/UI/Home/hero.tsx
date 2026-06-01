"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { higuen } from "@/lib/utils/fonts";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
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
    const name = nameRef.current;
    const glow = glowRef.current;
    const title = titleRef.current;
    const sub = subRef.current;

    if (!name || !glow || !title || !sub) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(name, {
        x: mouseX * 50,
        y: mouseY * 30,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(glow, {
        x: mouseX * 120,
        y: mouseY * 120,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(title, {
        x: mouseX * 10,
        y: mouseY * 10,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.to(sub, {
        x: mouseX * 6,
        y: mouseY * 6,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / window.innerHeight, 1);

      gsap.to(containerRef.current, {
        y: scrollY * -0.3,
        scale: 1 - progress * 0.05,
        opacity: 1 - progress * 0.6,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.to(name, {
        opacity: 0.2 - progress * 0.2,
        scale: 1 + progress * 0.1,
        duration: 0.6,
      });

      gsap.to(glow, {
        opacity: 0.6 - progress * 0.6,
        duration: 0.6,
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute size-[600px] rounded-full bg-green/10 blur-[140px]"
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
          Fullstack <br /> Engineer
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
