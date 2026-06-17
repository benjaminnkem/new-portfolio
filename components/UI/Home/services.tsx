"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { higuen } from "@/lib/utils/fonts";

const services = [
  {
    number: "01",
    title: "Project Planning",
    tagline: "Strategy & architecture",
    description:
      "Turning ideas into structured products through technical discovery, architecture planning, database design, and execution strategy.",
    items: [
      {
        name: "Product Strategy",
        desc: "Roadmaps, MVP scoping, and high-impact feature mapping.",
      },
      {
        name: "System Architecture",
        desc: "Resilient, scalable, and secure system topologies.",
      },
      {
        name: "Database Design",
        desc: "Schema optimization, indexing, and relational models.",
      },
      {
        name: "Project Management",
        desc: "Sprint planning, velocity tracking, and team alignment.",
      },
    ],
  },
  {
    number: "02",
    title: "Development",
    tagline: "Build & ship",
    description:
      "Building scalable web applications with clean architecture, maintainable code, and a strong focus on performance and user experience.",
    items: [
      {
        name: "Frontend Development",
        desc: "Interactive, responsive UIs with modern React frameworks.",
      },
      {
        name: "Backend Development",
        desc: "Reliable API servers and background job pipelines.",
      },
      {
        name: "Fullstack Development",
        desc: "End-to-end delivery from database to polished interfaces.",
      },
      {
        name: "API Design",
        desc: "REST or GraphQL endpoints with type safety and validation.",
      },
      {
        name: "Deployment",
        desc: "CI/CD workflows, serverless setups, and CDN optimization.",
      },
    ],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
        },
      });

      gsap.from(cardsRef.current?.children || [], {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden"
    >
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[min(480px,70vw)] h-[min(480px,70vw)] rounded-full bg-green/[0.04] blur-[100px] pointer-events-none"
        aria-hidden
      />

      <div className="container relative">
        <div ref={headerRef} className="max-w-3xl mb-14 md:mb-20">
          <p className="text-green uppercase tracking-[0.3em] text-xs md:text-sm font-semibold">
            How I Work
          </p>
          <h2
            className={`${higuen.className} text-4xl sm:text-5xl md:text-7xl lg:text-8xl mt-4 md:mt-6 leading-[1.05]`}
          >
            From Idea <br className="hidden sm:block" />
            To Production
          </h2>
          <p className="mt-5 md:mt-6 text-cWhite/55 text-sm md:text-base leading-relaxed max-w-xl">
            Two phases, one goal — take your product from concept to a
            production-ready system that scales.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          {services.map((service) => (
            <article
              key={service.number}
              className="group relative rounded-[28px] border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 md:p-10 overflow-hidden transition-colors duration-500 hover:border-green/25"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-green/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                aria-hidden
              />

              <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-8 md:mb-10">
                <div className="space-y-3 md:space-y-4 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-green/10 text-green border border-green/20">
                      {service.number}
                    </span>
                    <span className="text-cWhite/40 text-xs uppercase tracking-widest">
                      {service.tagline}
                    </span>
                  </div>
                  <h3
                    className={`${higuen.className} text-3xl sm:text-4xl md:text-5xl text-cWhite`}
                  >
                    {service.title}
                  </h3>
                  <p className="text-cWhite/55 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <span
                  className={`${higuen.className} hidden sm:block text-6xl md:text-7xl leading-none text-green/[0.08] group-hover:text-green/[0.14] transition-colors duration-500 shrink-0`}
                  aria-hidden
                >
                  {service.number}
                </span>
              </div>

              <div
                className={`relative grid gap-3 md:gap-4 ${
                  service.items.length > 4
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {service.items.map((item, idx) => (
                  <div
                    key={item.name}
                    className="m-over relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-5 transition-all duration-300 hover:border-green/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-green/10 text-green text-[11px] font-bold tabular-nums border border-green/15">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 space-y-1.5">
                        <p className="text-sm md:text-base font-medium text-cWhite group-hover:text-cWhite transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs md:text-sm text-cWhite/50 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-5 md:px-8 md:py-6">
          <p className="text-cWhite/60 text-sm md:text-base">
            Need a custom engagement across both phases?
          </p>
          <a
            href="mailto:benjaminnkemfrancis@gmail.com"
            className="m-over inline-flex items-center justify-center gap-2 text-sm font-semibold text-green hover:text-green/80 transition-colors shrink-0"
          >
            Let&apos;s talk
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;