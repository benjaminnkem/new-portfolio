"use client";
import Button from "@/components/Common/Button";
import { higuen, montserrat } from "@/lib/utils/fonts";
import { PiCubeDuotone } from "react-icons/pi";

const AboutMe = () => {
  return (
    <section className="min-h-[30rem] flex items-center">
      <div className="grid grid-cols-2 gap-10 container">
        <div className="space-y-8 relative">
          <div className="space-y-2">
            <h2 className="text-green">About Me</h2>
            <p className={`text-4xl`}>I can deliver results that exceeds your expectations.</p>

            <PiCubeDuotone className="opacity-60 absolute bottom-0 -left-20 -rotate-12" size={140} />
          </div>

          <button className="border px-6 py-[10px] border-white/50 text-white/50 duration-300 hover:text-white hover:border-white">
            Hire Me Now
          </button>
        </div>

        <div className="space-y-40 pt-10">
          <PiCubeDuotone className="ml-auto opacity-60" size={100} />
          <div className="space-y-4">
            <p className="text-gray-300">
              Hi, I&apos;m Benjamin Nkem Tochi, a web developer with a keen understanding of the relationship between
              design and users. I specialize in delivering detailed execution and optimal user experiences. I&apos;m
              passionate about working on interesting and meaningful projects that I can be proud of, always striving to
              create clean, pixel-perfect interfaces with smooth animations. I prioritize not only writing quality code
              but also ensuring perfect graphic design and optimized development.
            </p>
            <div className={`flex gap-4 items-center ${montserrat.className}`}>
              <div className="space-y-1 text-center">
                <div className="flex items-center justify-center text-4xl">
                  <p>312</p>
                  <p className="text-green">+</p>
                </div>
                <p className="opacity-50 text-xs">Projects Complete</p>
              </div>
              <div className="space-y-1 text-center">
                <div className="flex items-center justify-center text-4xl">
                  <p>280</p>
                  <p className="text-green">+</p>
                </div>
                <p className="opacity-50 text-xs">Happy Client</p>
              </div>
              <div className="space-y-1 text-center">
                <div className="flex items-center justify-center text-4xl">
                  <p>4</p>
                  <p className="text-green">+</p>
                </div>
                <p className="opacity-50 text-xs">Years of experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
