"use client";

import { ReactNode, useLayoutEffect } from "react";
import {
  ScrollSmoother,
  ScrollTrigger,
  isTouchDevice,
  prefersReducedMotion,
  setupNativeMobileScroll,
} from "@/lib/gsap";

type Props = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: Props) => {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }

    if (isTouchDevice()) {
      setupNativeMobileScroll();
      ScrollTrigger.refresh();
      return;
    }

    ScrollSmoother.get()?.kill();

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.15,
      effects: true,
      ignoreMobileResize: true,
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
};

export default SmoothScroll;
