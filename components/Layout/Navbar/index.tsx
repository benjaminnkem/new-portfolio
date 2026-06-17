"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import gsap from "gsap";
import useStore from "@/lib/store/global.store";
import { higuen } from "@/lib/utils/fonts";

const Navbar = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const { isMenuOpen, updateIsMenuOpen } = useStore();

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isMenuOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.inOut",
      });

      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[600]">
        <div className="flex items-center gap-8 px-6 py-3 rounded-full bg-gray-shade/70 backdrop-blur-md border border-white/10">
          <Link href="/" className={`font-bold ${higuen.className}`}>
            BN<span className="text-green">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-cWhite/80">
            <Link href="#about" className="hover:text-green transition-colors">
              About
            </Link>
            <Link
              href="#services"
              className="hover:text-green transition-colors"
            >
              Services
            </Link>
            <Link
              href="#projects"
              className="hover:text-green transition-colors"
            >
              Projects
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => updateIsMenuOpen(!isMenuOpen)}>
              {!isMenuOpen ? (
                <HiOutlineMenuAlt4 size={24} />
              ) : (
                <IoCloseOutline size={26} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[1000] bg-black-main/80 backdrop-blur-md opacity-0 pointer-events-none"
      />

      <div
        ref={menuRef}
        className="fixed top-0 right-0 z-[1100] h-full w-full md:w-[60%] bg-gray-shade translate-x-full"
      >
        <div className="container py-24 flex flex-col gap-8 text-3xl font-semibold">
          <Link href="/" onClick={() => updateIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/#about" onClick={() => updateIsMenuOpen(false)}>
            About
          </Link>
          <Link href="/#services" onClick={() => updateIsMenuOpen(false)}>
            Services
          </Link>
          <Link href="/#projects" onClick={() => updateIsMenuOpen(false)}>
            Projects
          </Link>
          <Link href="/#contact" onClick={() => updateIsMenuOpen(false)}>
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
