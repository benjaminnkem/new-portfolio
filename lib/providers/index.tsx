"use client";

import Cursor from "@/components/Common/Cursor";
import SmoothScroll from "@/components/Common/Others/smooth-scroll";
import { ReactNode } from "react";
import useStore from "../store/global.store";

const Providers = ({ children }: { children: ReactNode }) => {
  const { isMenuOpen } = useStore();

  return (
    <>
      <SmoothScroll />
      <Cursor />
      {children}
    </>
  );
};

export default Providers;
