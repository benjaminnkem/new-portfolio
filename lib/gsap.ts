import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export { gsap, ScrollTrigger, ScrollSmoother };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouchDevice = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

let mobileScrollConfigured = false;

export const setupNativeMobileScroll = () => {
  if (typeof window === "undefined" || mobileScrollConfigured) return;

  ScrollTrigger.config({ ignoreMobileResize: true });

  if (isTouchDevice()) {
    ScrollTrigger.normalizeScroll(true);
  }

  mobileScrollConfigured = true;
};

export const getScrollSmoother = () => ScrollSmoother.get();
