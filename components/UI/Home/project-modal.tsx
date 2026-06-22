"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { IoCloseOutline } from "react-icons/io5";
import { higuen } from "@/lib/utils/fonts";
import type { Project } from "@/lib/data/projects";
import { splitProjectImages } from "@/lib/utils/project-images";
import MobileFrame from "./mobile-frame";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
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
  }, [project]);

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
      onComplete: () => onCloseRef.current(),
    });
  };

  if (!project) return null;

  const { web: webImages, mobile: mobileImages } = splitProjectImages(
    project.images,
  );
  const heroImage = webImages[0] ?? project.images[0];
  const galleryImages = webImages.slice(1);

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
              src={heroImage}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
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

            {(project.liveUrl || project.githubUrl) && (
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="m-over inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium text-cWhite hover:border-green hover:text-green transition-colors"
                  >
                    Visit Live Site →
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="m-over inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium text-cWhite hover:border-green hover:text-green transition-colors"
                  >
                    View on GitHub →
                  </a>
                )}
              </div>
            )}

            <div className="space-y-4">
              <h3 className={`${higuen.className} text-2xl text-cWhite`}>
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
              <h3 className={`${higuen.className} text-2xl text-cWhite`}>
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

            {galleryImages.length > 0 && (
              <div className="space-y-4">
                <h3 className={`${higuen.className} text-2xl text-cWhite`}>
                  Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galleryImages.map((src, idx) => (
                    <div
                      key={src}
                      className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10"
                    >
                      <Image
                        src={src}
                        alt={`${project.name} screenshot ${idx + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 440px"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mobileImages.length > 0 && (
              <div className="space-y-4">
                <h3 className={`${higuen.className} text-2xl text-cWhite`}>
                  Mobile App
                </h3>
                <div className="flex gap-6 overflow-x-auto pb-2 hide-scroll">
                  {mobileImages.map((src, idx) => (
                    <MobileFrame
                      key={src}
                      src={src}
                      alt={`${project.name} mobile screenshot ${idx + 1}`}
                    />
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