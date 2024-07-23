"use client";

import { higuen } from "@/lib/utils/fonts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const Navbar = () => {
  const [passed, setPassed] = useState(false);

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
    <nav className={`fixed top-0 left-0 w-full z-[2000] duration-300 ${passed ? "opacity-0" : ""}`}>
      <div className="container flex items-center justify-between py-4">
        <div className="">
          <Link href="/" className={`text-xl font-extrabold ${higuen.className}`}>
            BN<span className="text-green">.</span>
          </Link>
        </div>

        <HiOutlineMenuAlt4 className="m-over" size={30} />
      </div>
    </nav>
  );
};

export default Navbar;
