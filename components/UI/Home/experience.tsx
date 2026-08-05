"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { higuen } from "@/lib/utils/fonts";
import {
  RESUME_FILENAME,
  RESUME_PATH,
  SOCIAL_LINKS,
  employment,
  freelancing,
  type ExperienceRole,
  type RoleType,
} from "@/lib/data/experience";
import { FaGithub } from "react-icons/fa";
import { HiOutlineDownload, HiOutlineExternalLink } from "react-icons/hi";
import { FiBriefcase, FiCode } from "react-icons/fi";
import { cn } from "@/lib/utils/ace";

type Filter = "all" | RoleType;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "full-time", label: "Full-time" },
  { id: "freelance", label: "Freelance" },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(employment[0]?.id ?? null);

  const roles = useMemo(() => {
    if (filter === "all") return [...employment, ...freelancing];
    if (filter === "full-time") return employment;
    return freelancing;
  }, [filter]);

  useEffect(() => {
    if (!roles.some((r) => r.id === openId)) {
      setOpenId(roles[0]?.id ?? null);
    }
  }, [roles, openId]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const header = headerRef.current;
    const cards = listRef.current
      ? Array.from(listRef.current.querySelectorAll<HTMLElement>("[data-role-card]"))
      : [];

    const ctx = gsap.context(() => {
      if (header) {
        gsap.fromTo(
          header,
          { y: 36 },
          {
            y: 0,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 28 },
          {
            y: 0,
            stagger: 0.08,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden"
    >
      <div
        className="absolute left-0 top-1/3 w-[min(520px,80vw)] h-[min(520px,80vw)] rounded-full bg-green/[0.035] blur-[110px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute right-0 bottom-0 w-[min(360px,60vw)] h-[min(360px,60vw)] rounded-full bg-green/[0.025] blur-[90px] pointer-events-none"
        aria-hidden
      />

      <div className="container relative">
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16"
        >
          <div className="max-w-2xl space-y-5">
            <p className="text-green uppercase tracking-[0.3em] text-xs md:text-sm font-semibold">
              Career
            </p>
            <h2
              className={`${higuen.className} text-4xl sm:text-5xl md:text-7xl leading-[1.05]`}
            >
              Experience <br className="hidden sm:block" />
              <span className="text-cWhite/40">&amp; Craft</span>
            </h2>
            <p className="text-cWhite/55 text-sm md:text-base leading-relaxed max-w-xl">
              Full-time product engineering across marketplaces and AI fintech,
              plus independent freelance work shipping real products for clients
              worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="m-over inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green text-black-main text-sm font-semibold hover:scale-[1.03] transition-transform"
            >
              <HiOutlineDownload size={18} />
              Download Resume
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="m-over inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-sm text-cWhite/80 hover:border-green hover:text-green transition-colors"
            >
              <FaGithub size={18} />
              GitHub
              <HiOutlineExternalLink size={14} className="opacity-60" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-14">
          {[
            { label: "Years building", value: "5+" },
            { label: "Full-time roles", value: String(employment.length) },
            { label: "Freelance track", value: "Active" },
            { label: "Focus", value: "Full Stack" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 md:px-5 md:py-5"
            >
              <p
                className={`${higuen.className} text-2xl md:text-3xl text-green`}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-xs md:text-sm text-cWhite/45 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center gap-2 mb-8 md:mb-10"
          role="tablist"
          aria-label="Filter experience"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "m-over px-4 py-2 rounded-full text-sm border transition-colors",
                filter === f.id
                  ? "bg-green text-black-main border-green font-semibold"
                  : "border-white/15 text-cWhite/60 hover:border-white/30 hover:text-cWhite",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div ref={listRef} className="relative max-w-3xl">
          <div
            className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-green/50 via-white/10 to-transparent"
            aria-hidden
          />

          <div className="space-y-5 md:space-y-6">
            {roles.map((role, index) => (
              <RoleCard
                key={role.id}
                role={role}
                index={index}
                isOpen={openId === role.id}
                onToggle={() =>
                  setOpenId((prev) => (prev === role.id ? null : role.id))
                }
              />
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-16 rounded-[28px] border border-white/10 bg-gradient-to-br from-green/[0.08] via-white/[0.02] to-transparent p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <p className={`${higuen.className} text-2xl md:text-3xl`}>
              Prefer the full story on paper?
            </p>
            <p className="text-cWhite/55 text-sm md:text-base">
              Grab the PDF resume, or open GitHub to browse how I build in the
              open.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="m-over inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green text-black-main text-sm font-semibold hover:scale-[1.03] transition-transform"
            >
              <HiOutlineDownload size={18} />
              Resume PDF
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="m-over inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-sm hover:border-green hover:text-green transition-colors"
            >
              <FaGithub size={18} />
              github.com/benjaminnkem
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const RoleCard = ({
  role,
  index,
  isOpen,
  onToggle,
}: {
  role: ExperienceRole;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const isFreelance = role.type === "freelance";
  const padded = String(index + 1).padStart(2, "0");

  return (
    <article data-role-card className="relative pl-10 sm:pl-12">
      <div
        className="absolute left-0 top-7 z-10 flex items-center justify-center"
        aria-hidden
      >
        <span
          className={cn(
            "size-[23px] rounded-full border-2 flex items-center justify-center bg-black-main transition-colors",
            isFreelance ? "border-cWhite/40" : "border-green",
            isOpen && "border-green",
          )}
        >
          <span
            className={cn(
              "size-2.5 rounded-full transition-transform",
              isFreelance && !isOpen ? "bg-cWhite/70" : "bg-green",
              isOpen && "scale-125",
            )}
          />
        </span>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "m-over w-full text-left rounded-[24px] border p-5 sm:p-6 md:p-7 transition-all duration-300 group",
          "bg-[#0a0a0a] hover:border-green/30",
          isOpen
            ? "border-green/35 shadow-[0_0_40px_-12px_rgba(144,255,3,0.25)]"
            : "border-white/10",
        )}
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border",
              isFreelance
                ? "bg-white/5 text-cWhite/70 border-white/15"
                : "bg-green/10 text-green border-green/20",
            )}
          >
            {isFreelance ? <FiCode size={12} /> : <FiBriefcase size={12} />}
            {isFreelance ? "Freelance" : "Full-time"}
          </span>
          <span className="text-cWhite/35 text-xs tabular-nums">{padded}</span>
          <span className="text-cWhite/40 text-xs ml-auto">{role.period}</span>
        </div>

        <div className="space-y-1.5 mb-3">
          <h3
            className={`${higuen.className} text-2xl sm:text-3xl text-cWhite group-hover:text-green transition-colors`}
          >
            {role.company}
          </h3>
          <p className="text-sm md:text-base text-cWhite/70 font-medium">
            {role.title}
          </p>
          <p className="text-xs text-cWhite/40">{role.location}</p>
        </div>

        <p className="text-sm text-cWhite/55 leading-relaxed">{role.summary}</p>

        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            isOpen ? "grid-rows-[1fr] mt-5" : "grid-rows-[0fr] mt-0",
          )}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2.5 border-t border-white/10 pt-5">
              {role.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm text-cWhite/60 leading-relaxed"
                >
                  <span className="mt-2 size-1.5 rounded-full bg-green shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/[0.06]">
              {role.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full text-[11px] border border-white/10 text-cWhite/50 bg-white/[0.02]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-cWhite/40 group-hover:text-green/80 transition-colors">
          <span>{isOpen ? "Collapse details" : "Expand details"}</span>
          <span
            className={cn(
              "inline-block transition-transform duration-300",
              isOpen && "rotate-90",
            )}
            aria-hidden
          >
            →
          </span>
        </div>
      </button>
    </article>
  );
};

export default Experience;
