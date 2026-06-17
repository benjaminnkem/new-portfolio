"use client";

import BdMeds from "../../../public/images/bdmeds.jpg";
import NaijaWrapped from "../../../public/images/9ja-wrapped.png";
import MovieMex from "../../../public/images/moviemex1.png";
import BSolar from "../../../public/images/bsolar.png";
import DashFd from "../../../public/images/dash-fd.png";
import Portfolio from "../../../public/images/astro-portfolio.png";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { higuen } from "@/lib/utils/fonts";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  name: string;
  src: any;
  category: string;
  link: string;
}

const PROJECT_ITEMS: ProjectItem[] = [
  {
    name: "BdMeds",
    src: BdMeds,
    category: "Healthcare Platform",
    link: "#",
  },
  {
    name: "NaijaWrapped",
    src: NaijaWrapped,
    category: "Year-End Wrapped",
    link: "#",
  },
  {
    name: "MovieMex",
    src: MovieMex,
    category: "Streaming Directory",
    link: "#",
  },
  {
    name: "Portfolio",
    src: Portfolio,
    category: "Creative Space",
    link: "#",
  },
  {
    name: "BSolar",
    src: BSolar,
    category: "Clean Energy Solutions",
    link: "#",
  },
  {
    name: "DashFd",
    src: DashFd,
    category: "Food Delivery App",
    link: "#",
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".project-card");
    if (!cards.length) return;

    // Immersion: Pinned ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${cards.length * 150}%`, // scroll track scale matches project length dynamically
        scrub: 1.2,
        pin: true,
      },
    });

    cards.forEach((card, idx) => {
      const isLeft = idx % 2 === 0;
      // Parallax pass-by variables: odd ones fly left, even ones fly right
      const xStart = 0;
      const xEnd = isLeft ? "-120vw" : "120vw";
      const yEnd = "30vh"; // push down slightly as they pass the camera for dynamic depth

      // We animate cards:
      // 1. Zooming in from the distant horizon (from scale 0.05, opacity 0, to scale 1, opacity 1)
      // 2. Staying fully visible/active in the center
      // 3. Zooming past the camera (to scale 4.5, opacity 0, offset xEnd)
      tl.fromTo(
        card,
        {
          scale: 0.05,
          x: xStart,
          y: 0,
          z: -1000,
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
        },
        {
          scale: 1,
          x: 0,
          y: 0,
          z: 0,
          opacity: 1,
          visibility: "visible",
          pointerEvents: "auto",
          duration: 1,
          ease: "power2.out",
        },
        idx * 0.75 // enter overlap ratio creates continuous highway flow
      ).to(
        card,
        {
          scale: 4.5,
          x: xEnd,
          y: yEnd,
          z: 500,
          opacity: 0,
          pointerEvents: "none",
          duration: 1.2,
          ease: "power2.in",
          // Set to hidden at the end of zoom to avoid blocking layout
          onComplete: () => {
            gsap.set(card, { visibility: "hidden" });
          },
        },
        `>-0.1` // zoom past starts shortly after reaching full view
      );
    });
  }, { scope: triggerRef });

  return (
    <section ref={containerRef} className="relative bg-[#050505] overflow-hidden">
      {/* Title section - stays fixed on top */}
      <div className="absolute top-24 left-0 w-full z-40 text-center pointer-events-none px-4">
        <p className="text-green uppercase tracking-[0.3em] text-xs font-semibold">
          Portfolio
        </p>
        <h2 className={`${higuen.className} text-5xl md:text-7xl lg:text-8xl text-cWhite mt-4`}>
          Selected Projects
        </h2>
        <p className="text-cWhite/40 text-sm mt-3 tracking-wide">
          (Scroll down to drive through the gallery)
        </p>
      </div>

      {/* Pinned Scroll container */}
      <div
        ref={triggerRef}
        className="h-screen w-full relative flex items-center justify-center overflow-hidden"
        style={{ perspective: "1000px" }} // enable 3D depth context for translations
      >
        {PROJECT_ITEMS.map((project, idx) => (
          <div
            key={project.name}
            className="project-card absolute w-[80vw] h-[45vh] md:w-[45vw] md:h-[55vh] max-w-[600px] max-h-[420px] rounded-[24px] overflow-hidden border border-white/10 bg-[#0c0c0c] select-none pointer-events-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative w-full h-full group pointer-events-auto">
              <Image
                src={project.src}
                alt={project.name}
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                fill
                placeholder="blur"
              />

              {/* Glassmorphic Project Overlay card */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-[#010101]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 md:p-10 pointer-events-auto m-over">
                <span className="text-green text-xs md:text-sm font-semibold tracking-wider uppercase mb-1">
                  {project.category}
                </span>
                
                <div className="flex items-center justify-between">
                  <h3 className={`${higuen.className} text-3xl md:text-4xl text-cWhite`}>
                    {project.name}
                  </h3>
                  <a
                    href={project.link}
                    className="size-12 rounded-full bg-green text-black-main flex items-center justify-center font-bold text-xl hover:scale-110 transition-transform select-none"
                  >
                    ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
