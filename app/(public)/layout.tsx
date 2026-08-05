import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import SmoothScroll from "@/components/Common/Others/smooth-scroll";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        {children}
        <Footer />
      </SmoothScroll>
    </>
  );
};

export default Layout;
