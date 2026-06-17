"use client";

import { skills, skills2 } from "@/lib/data";
import { cn } from "@/lib/utils/ace";
import { useTransform, useScroll, motion } from "framer-motion";
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
  y: ReturnType<typeof useScroll>["scrollYProgress"];
  items: string[];
  direction: number;
  base: string;
}) => {
  const x = useTransform(y, [0, 1], [direction * -300, direction * 300]);
  const duplicated = [...items, ...items];

  return (
    <div className={cn(`w-[200%] py-5 whitespace-nowrap`, base)}>
      <motion.div
        style={{ x }}
        className="flex items-center gap-10 font-semibold text-sm md:text-base uppercase tracking-wider"
      >
        {duplicated.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-3">
            <span>{item}</span>
            <span className="size-1.5 rounded-full bg-current opacity-60" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Stripes;