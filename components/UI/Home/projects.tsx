import { useScroll, useTransform, motion } from "framer-motion";
import BdMeds from "../../../public/images/bdmeds.jpg";
import NaijaWrapped from "../../../public/images/9ja-wrapped.png";
import MovieMex from "../../../public/images/moviemex1.png";
import BSolar from "../../../public/images/bsolar.png";
import DashFd from "../../../public/images/dash-fd.png";
import Portfolio from "../../../public/images/astro-portfolio.png";

import Image from "next/image";
import { useRef } from "react";

const Projects = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale7 = useTransform(scrollYProgress, [0, 1], [1, 6.8]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 8.5]);
  const scale10 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  return (
    <section className="pt-20 bg-[#0b0b0b]">
      <div className="space-y-2 container">
        <p className="text-green">Projects</p>
        <p className={`text-4xl font-medium`}>
          <span className="text-green">Dive</span> into some of the projects <br /> I have worked on
          <span className="text-green">.</span>
        </p>
      </div>

      <div className="h-[300vh] relative" ref={container}>
        <div className="h-[100vh] top-0 sticky w-full overflow-hidden">
          {/* BdMeds */}
          <motion.div
            style={{ scale: scale4 }}
            className="absolute top-0 w-full h-full flex items-center justify-center"
          >
            <div className="w-[25vw] h-[25vh] rounded-md overflow-hidden relative text-center">
              <Image src={BdMeds} alt="image" className="object-cover" fill placeholder="blur" />
            </div>
          </motion.div>
          {/* NaijaWrapped */}
          <motion.div
            style={{ scale: scale8 }}
            className="absolute top-0 w-full h-full flex items-center justify-center"
          >
            <div className="w-[30vw] h-[30vh] -top-[220px] left-[28px] rounded-md overflow-hidden relative">
              <Image src={NaijaWrapped} alt="image" className="object-cover" fill placeholder="blur" />
            </div>
          </motion.div>
          {/* MovieMex */}
          <motion.div
            style={{ scale: scale5 }}
            className="absolute top-0 w-full h-full flex items-center justify-center"
          >
            <div className="w-[35vw] h-[25vh] top-[200px] -left-[160px] relative rounded-md overflow-hidden">
              <Image src={MovieMex} alt="image" className="object-cover" fill placeholder="blur" />
            </div>
          </motion.div>
          {/* Portfolio */}
          <motion.div
            style={{ scale: scale10 }}
            className="absolute w-full h-full top-0 flex items-center justify-center"
          >
            <div className="w-[25vw] h-[25vh] top-[200px] left-[278px] relative rounded-md overflow-hidden">
              <Image src={Portfolio} alt="image" className="object-cover" fill placeholder="blur" />
            </div>
          </motion.div>
          {/* bsolar*/}
          <motion.div
            style={{ scale: scale9 }}
            className="absolute top-0 w-full h-full flex items-center justify-center"
          >
            <div className="w-[20vw] h-[45vh] -top-[60px] -left-[350px] rounded-md overflow-hidden relative">
              <Image src={BSolar} alt="image" className="object-cover" fill placeholder="blur" />
            </div>
          </motion.div>
          {/* DashFd */}
          <motion.div
            style={{ scale: scale7 }}
            className="absolute top-0 w-full h-full flex items-center justify-center"
          >
            <div className="w-[25vw] h-[25vh] top-0 left-[380px] rounded-md overflow-hidden relative">
              <Image src={DashFd} alt="image" className="object-cover" fill placeholder="blur" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
