"use client";

import Cursor from "@/components/Common/Cursor";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Cursor />
      {children}
    </>
  );
};

export default Providers;
