"use client";

import { higuen } from "@/lib/utils/fonts";

const Hero = () => {
  return (
    <header>
      <div className="container min-h-screen grid gap-4 relative">
        <div className="flex items-center">
          <div className="space-y-8">
            <h1 className={`${higuen.className} lg:text-9xl md:text-8xl text-5xl tracking-wider font-medium`}>
              Fullstack <br /> Developer
            </h1>

            <p className="max-w-lg opacity-60">
              Hello, my name is Benjamin Nkem, nice to meet you I would like to welcome you with my personal portfolio.
              Get Ready!
            </p>

            {/* <Button size="large"> Hire Me</Button> */}
          </div>
        </div>

        {/* image placeholder */}
        <div className="size-[30rem] absolute top-20 right-20 rounded-full border opacity-20 flex items-center justify-center">
          <p>Image of me</p>
        </div>
      </div>
    </header>
  );
};

export default Hero;
