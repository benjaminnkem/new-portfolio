"use client";

import { skills, skills2 } from "@/lib/data";
import { cn } from "@/lib/utils/ace";
import { useTransform, useScroll, motion, useSpring } from "framer-motion";
import { useRef } from "react";

const Stripes = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className="py-32 relative overflow-hidden">
      <StripeRow
        y={scrollYProgress}
        items={skills}
        direction={1}
        base="-rotate-2 bg-green text-black"
      />
      <StripeRow
        y={scrollYProgress}
        items={skills2}
        direction={-1}
        base="rotate-2 bg-black-main text-green border-y border-green/20 mt-10"
      />
    </div>
  );
};

const StripeRow = ({
  y,
  items,
  direction,
  base,
}: {
  y: any;
  items: string[];
  direction: number;
  base: string;
}) => {
  const x = useTransform(y, [0, 1], [direction * -300, direction * 300]);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });

  return (
    <div className={cn(`w-[200%] py-5 whitespace-nowrap`, base)}>
      <motion.div
        style={{ x: springX }}
        className="flex items-center gap-10 font-semibold text-sm md:text-base uppercase tracking-wider"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span>{item}</span>
            <span className="size-1.5 rounded-full bg-current opacity-60" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Stripes;

/**
 * "use client";

import { skills, skills2 } from "@/lib/data";
import { cn } from "@/lib/utils/ace";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const Stripes = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="relative py-40 overflow-hidden flex items-center justify-center"
    >
      <div className="relative w-full">
        <StripeRow
          y={scrollYProgress}
          items={skills}
          rotate="-12"
          bg="bg-green"
          text="text-black-main"
          direction={1}
          offset="-20%"
          z="z-20"
        />

        <StripeRow
          y={scrollYProgress}
          items={skills2}
          rotate="12"
          bg="bg-black-main"
          text="text-green"
          direction={-1}
          offset="20%"
          border="border-y border-green/20"
          z="z-10"
        />
      </div>
    </section>
  );
};

const StripeRow = ({
  y,
  items,
  rotate,
  bg,
  text,
  direction,
  offset,
  border,
  z,
}: {
  y: any;
  items: string[];
  rotate: string;
  bg: string;
  text: string;
  direction: number;
  offset: string;
  border?: string;
  z: string;
}) => {
  const x = useTransform(y, [0, 1], [direction * -250, direction * 250]);
  const springX = useSpring(x, { stiffness: 70, damping: 22 });

  return (
    <div
      className={cn(
        `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] py-5 ${bg} ${text} ${border} ${z}`,
      )}
      style={{
        transform: `translate(-50%, -50%) rotate(${rotate}deg) translateY(${offset})`,
      }}
    >
      <motion.div
        style={{ x: springX }}
        className="flex items-center gap-10 whitespace-nowrap font-semibold uppercase tracking-wider text-sm md:text-base"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span>{item}</span>
            <span className="size-1 rounded-full bg-current opacity-60" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Stripes;

 */
