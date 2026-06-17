"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IoCloseOutline } from "react-icons/io5";
import { higuen } from "@/lib/utils/fonts";
import type { Project } from "@/lib/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
    );

    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 48, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
    );

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  const handleClose = () => {
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });

    gsap.to(panelRef.current, {
      opacity: 0,
      y: 32,
      scale: 0.98,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  if (!project) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 opacity-0"
      onClick={handleClose}
    >
      <div
        className="absolute inset-0 bg-black-main/80 backdrop-blur-xl"
        aria-hidden
      />

      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] rounded-[28px] border border-white/10 bg-[#0c0c0c] overflow-hidden opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 size-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Close project details"
        >
          <IoCloseOutline size={22} />
        </button>

        <div className="overflow-y-auto max-h-[90vh] hide-scroll">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={project.images[0]}
              alt={project.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <span className="text-green text-xs md:text-sm font-semibold tracking-wider uppercase">
                {project.category}
              </span>
              <h2
                className={`${higuen.className} text-4xl md:text-5xl text-cWhite mt-2`}
              >
                {project.name}
              </h2>
            </div>
          </div>

          <div className="p-8 md:p-10 space-y-10">
            <p className="text-cWhite/70 text-base md:text-lg leading-relaxed">
              {project.description}
            </p>

            <div className="space-y-4">
              <h3
                className={`${higuen.className} text-2xl text-cWhite`}
              >
                Overview
              </h3>
              <ul className="space-y-3">
                {project.overview.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-cWhite/60 text-sm md:text-base leading-relaxed"
                  >
                    <span className="text-green mt-1.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3
                className={`${higuen.className} text-2xl text-cWhite`}
              >
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1.5 rounded-full text-xs md:text-sm font-medium bg-white/5 border border-white/10 text-cWhite/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.images.length > 1 && (
              <div className="space-y-4">
                <h3
                  className={`${higuen.className} text-2xl text-cWhite`}
                >
                  Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.slice(1).map((src, idx) => (
                    <div
                      key={src}
                      className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10"
                    >
                      <Image
                        src={src}
                        alt={`${project.name} screenshot ${idx + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;