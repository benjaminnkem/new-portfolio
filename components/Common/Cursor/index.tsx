"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const INTERACTIVE_SELECTOR =
  "a, button, .m-over, [role='button'], .project-card";

const isInteractiveTarget = (target: Element | null) => {
  if (!target) return false;
  const match = target.closest(INTERACTIVE_SELECTOR);
  if (!match) return false;
  if (match.matches("button:disabled, [aria-disabled='true']")) return false;
  return true;
};

const Cursor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const hasAppeared = useRef(false);

  useGSAP(() => {
    const el = ref.current;
    const dot = dotRef.current;
    if (!el) return;

    const prefersFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!prefersFinePointer) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 1, force3D: true });

    const moveX = gsap.quickTo(el, "x", {
      duration: 0.16,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(el, "y", {
      duration: 0.16,
      ease: "power3.out",
    });
    const scaleTo = gsap.quickTo(el, "scale", {
      duration: 0.28,
      ease: "power3.out",
    });
    const dotScale = dot
      ? gsap.quickTo(dot, "scale", { duration: 0.22, ease: "power3.out" })
      : null;
    const dotOpacity = dot
      ? gsap.quickTo(dot, "opacity", { duration: 0.22, ease: "power3.out" })
      : null;

    const setHover = (hovering: boolean) => {
      if (isHovering.current === hovering) return;
      isHovering.current = hovering;
      scaleTo(hovering ? 2.25 : 1);
      dotScale?.(hovering ? 0 : 1);
      dotOpacity?.(hovering ? 0 : 1);
    };

    const handlePointerMove = (e: PointerEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);

      const target = document.elementFromPoint(e.clientX, e.clientY);
      setHover(isInteractiveTarget(target));

      if (!hasAppeared.current) {
        gsap.to(el, { visibility: "visible", opacity: 1, duration: 0.18 });
        hasAppeared.current = true;
      }
    };

    const handlePointerLeave = () => {
      setHover(false);
      gsap.to(el, {
        opacity: 0,
        duration: 0.18,
        onComplete: () => {
          gsap.set(el, { visibility: "hidden" });
          hasAppeared.current = false;
        },
      });
    };

    const handlePointerEnter = () => {
      gsap.to(el, { visibility: "visible", opacity: 1, duration: 0.18 });
      hasAppeared.current = true;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );
    document.documentElement.addEventListener(
      "pointerenter",
      handlePointerEnter,
    );

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      document.documentElement.removeEventListener(
        "pointerenter",
        handlePointerEnter,
      );
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ willChange: "transform" }}
      className="size-6 z-[4000] custom-cursor rounded-full fixed top-0 left-0 sm:flex items-center justify-center invisible opacity-0 pointer-events-none hidden"
    >
      <div
        ref={dotRef}
        className="size-1 bg-black rounded-full pointer-events-none"
      />
    </div>
  );
};

export default Cursor;
