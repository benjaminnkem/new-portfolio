"use client";

import SmoothScroll from "@/components/Common/smooth-scroll";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SmoothScroll />
      {children}
    </>
  );
};

export default Providers;
