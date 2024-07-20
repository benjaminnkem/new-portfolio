"use client";

import Button from "@/components/Common/Button";
import { higuen } from "@/lib/utils/fonts";
import Link from "next/link";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav className={`fixed top-0 left-0 w-full z-[4000]`}>
      <div className="container flex items-center justify-between py-4">
        <div className="">
          <Link href="/" className={`text-xl font-extrabold ${higuen.className}`}>
            BN<span className="text-green">.</span>
          </Link>
        </div>

        <HiOutlineMenuAlt4 className="cursor-pointer" size={30} />
      </div>
    </nav>
  );
};

export default Navbar;
