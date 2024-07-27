"use client";

import { higuen } from "@/lib/utils/fonts";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import useStore from "@/lib/store/global.store";
import { opacityVariant } from "@/lib/utils/variants";

const Navbar = () => {
  const [passed, setPassed] = useState(false);

  const menuRef = useRef(null);

  const { isMenuOpen, updateIsMenuOpen } = useStore();

  const openMenu = () => {
    updateIsMenuOpen(true);
  };
  const closeMenu = () => {
    updateIsMenuOpen(false);
  };
  const toggle = () => updateIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    let prev = window.scrollY;
    window.addEventListener("scroll", () => {
      const current = window.scrollY;

      if (current > prev) {
        setPassed(true);
      } else {
        setPassed(false);
      }

      prev = window.scrollY;
    });
  }, []);

  return (
    <div ref={menuRef}>
      <nav
        className={`fixed top-0 left-0 z-[500] duration-300 ${passed ? "opacity-0" : ""} ${
          isMenuOpen ? "w-1/2" : "w-full"
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          <div className="">
            <Link href="/" className={`text-xl font-extrabold ${higuen.className}`}>
              BN<span className="text-green">.</span>
            </Link>
          </div>

          {isMenuOpen && <IoCloseOutline className="m-over" size={30} onClick={closeMenu} />}
          {!isMenuOpen ? <HiOutlineMenuAlt4 className="m-over" size={30} onClick={openMenu} /> : <p>something</p>}
        </div>
      </nav>

      <aside
        id="menu-container"
        className={`fixed top-0 right-0 overflow-hidden z-[1000] min-h-screen duration-300 backdrop-blur-md ${
          isMenuOpen ? "w-3/4" : "w-0"
        }`}
      ></aside>
    </div>
  );
};

export default Navbar;
