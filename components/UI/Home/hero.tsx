"use client";

import { higuen } from "@/lib/utils/fonts";

const Hero = () => {
  return (
    <header>
      <div className="container min-h-screen grid gap-4">
        <div className="flex items-center">
          <div className="space-y-8">
            <h1 className={`${higuen.className} text-9xl tracking-wider font-medium`}>
              Fullstack <br /> Developer
            </h1>

            <p className="max-w-lg opacity-60">
              Hello, my name is Benjamin Nkem, nice to meet you I would like to welcome you with my personal portfolio.
              Get Ready!
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
