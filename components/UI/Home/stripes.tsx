"use client";
import { skills, skills2 } from "@/lib/data";
import { useTransform, useScroll, MotionValue, motion, useSpring } from "framer-motion";
import { useRef } from "react";

const Stripes = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    target: ref,
  });

  return (
    <div className="py-40 relative uppercase" ref={ref}>
      <StripesContainer y={scrollYProgress} />
      <Stripes2Container y={scrollYProgress} />
    </div>
  );
};

const StripesContainer = ({ y }: { y: MotionValue<number> }) => {
  const value = useTransform(y, [0, 1], [-500, 0]);
  const position = useSpring(value);

  return (
    <div
      className={`py-4 bg-[#529200] text-black-main -rotate-[4deg] w-[calc(200%)] -translate-x-[10%] relative before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-40 before:bg-gradient-to-r before:from-black-main after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-40 after:bg-gradient-to-l after:from-black-main text-3xl`}
    >
      <motion.div
        style={{ translateX: position }}
        className="w-full flex items-center space-x-5 overflow-x-auto whitespace-nowrap font-extrabold hide-scroll"
      >
        {[...skills, ...skills].map((skill, index) => (
          <div key={index}>
            <div className="flex items-center gap-5">
              <p>{skill}</p>
              <div className="size-2 bg-black-main rounded-full"></div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Stripes2Container = ({ y }: { y: MotionValue<number> }) => {
  const value = useTransform(y, [0, 1], [600, 0]);
  const position = useSpring(value);

  return (
    <div
      className={`py-4 bg-green text-black-main rotate-[4deg] w-[calc(200%)] -translate-x-[10%] relative before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-40 before:bg-gradient-to-r before:from-black-main after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-40 after:bg-gradient-to-l after:from-black-main text-3xl`}
    >
      <motion.div
        style={{ translateX: position }}
        className="w-full flex items-center space-x-5 overflow-x-auto whitespace-nowrap font-extrabold hide-scroll"
      >
        {[...skills2, ...skills2].map((skill, index) => (
          <div key={index}>
            <div className="flex items-center gap-5">
              <p>{skill}</p>
              <div className="size-2 bg-black-main rounded-full"></div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Stripes;
