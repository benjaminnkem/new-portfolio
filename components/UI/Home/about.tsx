"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { higuen } from "@/lib/utils/fonts";
import { PiCubeDuotone } from "react-icons/pi";

const AboutMe = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(statsRef.current?.children || [], {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute top-10 left-10 opacity-10">
        <PiCubeDuotone size={180} />
      </div>

      <div className="absolute bottom-10 right-10 opacity-10">
        <PiCubeDuotone size={140} />
      </div>

      <div className="container space-y-16">
        <div className="space-y-6 max-w-3xl">
          <p className="text-green uppercase tracking-widest text-sm">
            About Me
          </p>

          <h2
            ref={titleRef}
            className={`${higuen.className} text-4xl md:text-6xl leading-[1.05]`}
          >
            I build systems that feel as good as they perform.
          </h2>

          <p ref={textRef} className="text-cWhite/60 leading-relaxed">
            I'm Benjamin Nkem (also known as Tochison), a software engineer
            focused on building fast, scalable, and visually refined digital
            experiences. I care about both engineering depth and interface
            clarity, making sure every product feels intentional, smooth, and
            usable.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <a
              href="https://wa.me/2348133961439"
              target="_blank"
              rel="noopener noreferrer"
              className="m-over inline-block px-6 py-3 rounded-full border border-white/20 hover:border-green hover:text-green transition-colors"
            >
              Hire Me
            </a>
            <a
              href="/pdf/Benjamin_Nkem_Resume_Main.pdf"
              download="Benjamin_Nkem_Resume.pdf"
              className="m-over inline-block px-6 py-3 rounded-full bg-green text-black-main font-medium hover:scale-[1.03] transition-transform"
            >
              Download Resume
            </a>
            <a
              href="https://github.com/benjaminnkem"
              target="_blank"
              rel="noopener noreferrer"
              className="m-over inline-block px-6 py-3 rounded-full border border-white/20 hover:border-green hover:text-green transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10"
        >
          <div className="space-y-2">
            <div className="text-4xl font-semibold flex items-center gap-1">
              312 <span className="text-green">+</span>
            </div>
            <p className="text-sm text-cWhite/50">Projects Completed</p>
          </div>

          <div className="space-y-2">
            <div className="text-4xl font-semibold flex items-center gap-1">
              280 <span className="text-green">+</span>
            </div>
            <p className="text-sm text-cWhite/50">Happy Clients</p>
          </div>

          <div className="space-y-2">
            <div className="text-4xl font-semibold flex items-center gap-1">
              6 <span className="text-green">+</span>
            </div>
            <p className="text-sm text-cWhite/50">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
