"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { higuen } from "@/lib/utils/fonts";
import Button from "@/components/Common/Button";
import { PROJECTS } from "@/lib/data/projects";
import type { Project } from "@/lib/data/projects";
import { getProjectCoverImage } from "@/lib/utils/project-images";
import ProjectModal from "./project-modal";

gsap.registerPlugin(ScrollTrigger);

const SPEED_LINES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  top: 8 + ((i * 17) % 84),
  width: 80 + ((i * 31) % 160),
  delay: (i * 0.07) % 0.5,
}));

interface AnimationConfig {
  scrollMultiplier: number;
  scrub: number;
  mobile: boolean;
}

const createProjectTimeline = (
  refs: {
    trigger: HTMLDivElement | null;
    bg: HTMLDivElement | null;
    grid: HTMLDivElement | null;
    vignette: HTMLDivElement | null;
    title: HTMLDivElement | null;
    speedLines: HTMLDivElement | null;
    progress: HTMLSpanElement | null;
    progressBar: HTMLDivElement | null;
  },
  config: AnimationConfig,
  paddedCount: string,
) => {
  const cards = gsap.utils.toArray<HTMLElement>(".project-card");
  const infos = gsap.utils.toArray<HTMLElement>(".project-info");
  const glows = gsap.utils.toArray<HTMLElement>(".project-glow");
  const speedLines = gsap.utils.toArray<HTMLElement>(".speed-line");

  if (!cards.length) return null;

  const overlap = config.mobile ? 0.42 : 0.38;
  const cardSpan = 1;
  const totalSpan = (cards.length - 1) * (cardSpan - overlap) + cardSpan;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: refs.trigger,
      start: "top top",
      end: `+=${Math.round(totalSpan * config.scrollMultiplier)}%`,
      scrub: config.scrub,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const index = Math.min(
          Math.floor(self.progress * cards.length),
          cards.length - 1,
        );
        if (refs.progress) {
          refs.progress.textContent = `${String(index + 1).padStart(2, "0")} / ${paddedCount}`;
        }
        if (refs.progressBar) {
          gsap.set(refs.progressBar, { scaleX: self.progress });
        }
      },
    },
  });

  tl.fromTo(
    refs.bg,
    { scale: config.mobile ? 1.1 : 1.35, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: totalSpan * (config.mobile ? 0.15 : 0.25),
      ease: "power2.out",
    },
    0,
  );

  if (!config.mobile) {
    tl.to(
      refs.bg,
      { scale: 1.15, opacity: 0.7, duration: totalSpan * 0.75, ease: "none" },
      totalSpan * 0.25,
    );

    tl.fromTo(
      refs.grid,
      { yPercent: 0, opacity: 0 },
      { yPercent: 55, opacity: 0.35, duration: totalSpan, ease: "none" },
      0,
    );
  }

  tl.fromTo(
    refs.vignette,
    { opacity: config.mobile ? 0.7 : 0.5 },
    { opacity: 1, duration: totalSpan * 0.4, ease: "power1.in" },
    0,
  );

  tl.fromTo(
    refs.title,
    { y: 0, opacity: 1, scale: 1 },
    {
      y: config.mobile ? -12 : -24,
      opacity: config.mobile ? 0.5 : 0.35,
      scale: config.mobile ? 0.96 : 0.92,
      duration: totalSpan * 0.5,
      ease: "power2.inOut",
    },
    totalSpan * 0.15,
  );

  cards.forEach((card, idx) => {
    const info = infos[idx];
    const glow = glows[idx];
    const isLeft = idx % 2 === 0;
    const start = idx * (cardSpan - overlap);
    const enterEnd = start + cardSpan * (config.mobile ? 0.38 : 0.42);
    const exitStart = start + cardSpan * (config.mobile ? 0.44 : 0.48);

    if (config.mobile) {
      tl.fromTo(
        card,
        {
          scale: 0.9,
          y: 40,
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          visibility: "visible",
          pointerEvents: "auto",
          duration: cardSpan * 0.38,
          ease: "power3.out",
        },
        start,
      );

      if (info) {
        tl.fromTo(
          info,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.22, ease: "power3.out" },
          enterEnd - 0.1,
        ).to(
          info,
          { y: -16, opacity: 0, duration: 0.18, ease: "power2.in" },
          exitStart + 0.06,
        );
      }

      tl.to(
        card,
        {
          scale: 0.94,
          y: -32,
          opacity: 0,
          pointerEvents: "none",
          duration: cardSpan * 0.48,
          ease: "power2.in",
        },
        exitStart,
      );
    } else {
      tl.fromTo(
        card,
        {
          scale: 0.06,
          x: 0,
          y: "28vh",
          z: -2400,
          rotationY: isLeft ? -22 : 22,
          rotationX: 14,
          opacity: 0,
          filter: "blur(16px) brightness(0.6)",
          visibility: "hidden",
          pointerEvents: "none",
        },
        {
          scale: 1,
          x: 0,
          y: 0,
          z: 0,
          rotationY: 0,
          rotationX: 0,
          opacity: 1,
          filter: "blur(0px) brightness(1)",
          visibility: "visible",
          pointerEvents: "auto",
          duration: cardSpan * 0.42,
          ease: "power4.out",
        },
        start,
      );

      if (info) {
        tl.fromTo(
          info,
          { y: 48, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.28,
            ease: "power3.out",
          },
          enterEnd - 0.12,
        ).to(
          info,
          {
            y: -32,
            opacity: 0,
            filter: "blur(4px)",
            duration: 0.22,
            ease: "power2.in",
          },
          exitStart + 0.08,
        );
      }

      if (glow) {
        tl.fromTo(
          glow,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 0.75,
            scale: 1.15,
            duration: 0.32,
            ease: "power2.out",
          },
          enterEnd - 0.08,
        ).to(
          glow,
          { opacity: 0, scale: 1.6, duration: 0.38, ease: "power2.in" },
          exitStart,
        );
      }

      tl.to(
        card,
        {
          scale: 5.5,
          x: isLeft ? "-135vw" : "135vw",
          y: isLeft ? "-18vh" : "22vh",
          z: 1200,
          rotationY: isLeft ? -32 : 32,
          rotationX: -18,
          opacity: 0,
          filter: "blur(10px) brightness(1.4)",
          pointerEvents: "none",
          duration: cardSpan * 0.52,
          ease: "power3.in",
        },
        exitStart,
      );

      speedLines.forEach((line, lineIdx) => {
        const lineStart = exitStart + lineIdx * 0.012;
        tl.fromTo(
          line,
          { x: isLeft ? "20vw" : "-20vw", opacity: 0, scaleX: 0.2 },
          {
            x: isLeft ? "-90vw" : "90vw",
            opacity: 0.55,
            scaleX: 1,
            duration: 0.35,
            ease: "power2.in",
          },
          lineStart,
        ).to(line, { opacity: 0, duration: 0.15, ease: "power1.in" }, lineStart + 0.28);
      });
    }

    tl.set(card, { visibility: "hidden" }, start + cardSpan);
  });

  if (!config.mobile && refs.speedLines) {
    tl.to(
      refs.speedLines,
      { opacity: 0.9, duration: totalSpan * 0.3, ease: "power1.inOut" },
      0,
    );
  }

  return tl;
};

const Projects = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const speedLinesRef = useRef<HTMLDivElement>(null);

  const projectCount = PROJECTS.length;
  const paddedCount = String(projectCount).padStart(2, "0");

  useGSAP(
    () => {
      const refs = {
        trigger: triggerRef.current,
        bg: bgRef.current,
        grid: gridRef.current,
        vignette: vignetteRef.current,
        title: titleRef.current,
        speedLines: speedLinesRef.current,
        progress: progressRef.current,
        progressBar: progressBarRef.current,
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        createProjectTimeline(refs, {
          scrollMultiplier: 145,
          scrub: 0.65,
          mobile: false,
        }, paddedCount);
      });

      mm.add("(max-width: 767px)", () => {
        createProjectTimeline(refs, {
          scrollMultiplier: 90,
          scrub: 0.3,
          mobile: true,
        }, paddedCount);
      });

      return () => mm.revert();
    },
    { scope: triggerRef, dependencies: [paddedCount] },
  );

  return (
    <section
      className="relative bg-[#050505] overflow-hidden"
      id="projects"
    >
      <div
        ref={triggerRef}
        className="h-[100dvh] w-full relative flex items-center justify-center overflow-hidden md:[perspective:1400px]"
      >
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none opacity-0"
          aria-hidden
        >
          <div className="absolute top-[12%] left-[18%] w-[min(520px,60vw)] h-[min(520px,60vw)] rounded-full bg-green/[0.07] blur-[80px] md:blur-[130px]" />
          <div className="absolute bottom-[18%] right-[12%] w-[min(440px,50vw)] h-[min(440px,50vw)] rounded-full bg-green/[0.09] blur-[70px] md:blur-[110px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,80vw)] h-[min(700px,80vw)] rounded-full bg-[#1a2e00]/30 blur-[100px] md:blur-[160px]" />
        </div>

        <div
          ref={gridRef}
          className="hidden md:block absolute inset-x-[-20%] bottom-[-10%] h-[70%] pointer-events-none opacity-0 origin-bottom"
          style={{
            transform: "rotateX(72deg)",
            transformStyle: "preserve-3d",
            backgroundImage: `
              linear-gradient(rgba(144,255,3,0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(144,255,3,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
          }}
          aria-hidden
        />

        <div
          ref={speedLinesRef}
          className="hidden md:block absolute inset-0 pointer-events-none opacity-0"
          aria-hidden
        >
          {SPEED_LINES.map((line) => (
            <div
              key={line.id}
              className="speed-line absolute h-px bg-gradient-to-r from-transparent via-green/50 to-transparent opacity-0"
              style={{
                top: `${line.top}%`,
                left: "50%",
                width: `${line.width}px`,
                marginLeft: `-${line.width / 2}px`,
              }}
            />
          ))}
        </div>

        <div
          ref={vignetteRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 30%, rgba(5,5,5,0.85) 100%)",
          }}
          aria-hidden
        />

        <div
          ref={titleRef}
          className="absolute top-16 md:top-24 left-0 w-full z-40 text-center pointer-events-none px-4"
        >
          <p className="text-green uppercase tracking-[0.3em] text-xs font-semibold">
            Portfolio
          </p>
          <h2
            className={`${higuen.className} text-4xl md:text-7xl lg:text-8xl text-cWhite mt-3 md:mt-4`}
          >
            Selected Projects
          </h2>
          <p className="text-cWhite/40 text-xs md:text-sm mt-2 md:mt-3 tracking-wide">
            <span className="md:hidden">Swipe up to browse</span>
            <span className="hidden md:inline">Scroll to drive through the gallery</span>
          </p>
        </div>

        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3 pointer-events-none">
          <span
            ref={progressRef}
            className="text-cWhite/50 text-xs tracking-[0.35em] font-medium tabular-nums"
          >
            01 / {paddedCount}
          </span>
          <div className="w-32 md:w-52 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-full bg-green origin-left scale-x-0"
            />
          </div>
        </div>

        <div
          className="relative w-full h-full flex items-center justify-center md:[transform-style:preserve-3d]"
        >
          {PROJECTS.map((project) => (
            <div
              key={project.slug}
              className="project-card absolute w-[88vw] h-[52dvh] md:w-[46vw] md:h-[56vh] max-w-[620px] max-h-[430px] rounded-[20px] md:rounded-[24px] overflow-visible border border-white/10 bg-[#0c0c0c] select-none pointer-events-none will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="project-glow hidden md:block absolute -inset-8 rounded-[32px] bg-green/20 blur-[48px] opacity-0 pointer-events-none"
                aria-hidden
              />

              <div className="relative w-full h-full rounded-[20px] md:rounded-[24px] overflow-hidden group pointer-events-auto m-over">
                <Image
                  src={getProjectCoverImage(project.images)}
                  alt={project.name}
                  className="object-cover md:group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                  fill
                  sizes="(max-width: 768px) 88vw, 46vw"
                  priority={project.slug === PROJECTS[0].slug}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-[#010101]/30 to-transparent opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="project-info absolute inset-x-0 bottom-0 z-10 p-5 md:p-10 pointer-events-none opacity-0">
                  <div className="bg-[#010101]/75 backdrop-blur-md rounded-2xl border border-white/10 p-4 md:p-8 pointer-events-auto">
                    <span className="text-green text-[10px] md:text-sm font-semibold tracking-wider uppercase">
                      {project.category}
                    </span>
                    <div className="flex items-center justify-between mt-1.5 md:mt-2 gap-3 md:gap-4">
                      <h3
                        className={`${higuen.className} text-2xl md:text-4xl text-cWhite leading-tight`}
                      >
                        {project.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="size-10 md:size-12 shrink-0 rounded-full bg-green text-black-main flex items-center justify-center font-bold text-lg md:text-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:scale-110 transition-all duration-300 select-none"
                        aria-label={`View ${project.name} details`}
                      >
                        ↗
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-50 py-24 md:py-40 bg-black-main border-t border-white/5 text-center flex flex-col items-center gap-10">
        <div className="space-y-6">
          <p className="text-green uppercase tracking-[0.3em] text-sm">
            Let's Build Something Great
          </p>

          <h3
            className={`${higuen.className} text-5xl md:text-7xl lg:text-8xl leading-[1.1]`}
          >
            Ready To Work <br /> Together?
          </h3>

          <p className="text-cWhite/60 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
            Have an exciting project in mind or looking to hire a software
            engineer? Let's build something exceptional together.
          </p>
        </div>

        <a
          href="mailto:benjaminnkemfrancis@gmail.com"
          className="m-over inline-block"
        >
          <Button size="large" rounded="full" variant="filled">
            Get In Touch →
          </Button>
        </a>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};

export default Projects;