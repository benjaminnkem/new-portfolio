"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const Cursor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const hasAppeared = useRef(false);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    // Use quickTo for high-performance tick-based translation (no layout reflows)
    const moveX = gsap.quickTo(el, "x", { duration: 0.15, ease: "power3.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.15, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      moveX(e.clientX - el.clientWidth / 2);
      moveY(e.clientY - el.clientHeight / 2);

      if (!hasAppeared.current) {
        gsap.to(el, { visibility: "visible", opacity: 1, duration: 0.15 });
        hasAppeared.current = true;
      }
    };

    // Event delegation handles dynamic buttons/links rendered in client layouts
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .m-over, [role='button']")) {
        el.classList.add("custom-cursor--link");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .m-over, [role='button']")) {
        el.classList.remove("custom-cursor--link");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ willChange: "transform" }}
      className="size-6 z-[4000] custom-cursor rounded-full fixed top-0 left-0 sm:flex items-center justify-center invisible opacity-0 pointer-events-none hidden mix-blend-difference"
    >
      <div className="size-1 bg-black rounded-full pointer-events-none" />
    </div>
  );
};

export default Cursor;
