"use client";

import Cursor from "@/components/Common/Cursor";
import SmoothScroll from "@/components/Common/Others/smooth-scroll";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      {children}
    </>
  );
};

export default Providers;
