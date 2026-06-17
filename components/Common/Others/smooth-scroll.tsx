"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const SmoothScroll = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;