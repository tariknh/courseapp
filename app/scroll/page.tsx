"use client";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";

const ScrollElement = (progress: any, left: any) => {
  //const x = useTransform(progress, [0,1], [0,300])
  return (
    <motion.div
      style={{ left, x: progress }}
      className="relative overflow-hidden whitespace-nowrap"
    >
      <Slider />
      <Slider />
      <Slider />
    </motion.div>
  );
};

const Slider = () => {
  return (
    <h1 className="text-6xl whitespace-nowrap">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem?{" "}
    </h1>
  );
};

const Page = () => {
  const container = useRef(null);

  const inView = useInView(container);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  return (
    <section className="bg-white">
      <div className="h-screen"></div>
      <div ref={container} className="h-screen relative flex mb-40">
        {/* <ScrollElement left="-20%" progress={scrollYProgress}/>
            <ScrollElement left="0%" progress={scrollYProgress}/>
            <ScrollElement left="20%" progress={scrollYProgress}/> */}
      </div>
    </section>
  );
};

export default Page;
