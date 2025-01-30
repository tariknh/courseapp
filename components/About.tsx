"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function About() {
  const firstRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: firstRef,
    offset: ["start start", "end start"],
  });

  const yValue = useTransform(scrollYProgress, [0, 1], ["0", "100vh"]);

  return (
    <motion.section
      ref={firstRef}
      style={{ translateY: yValue }}
      className="text-white w-full font-bold p-8 justify-center content-center h-screen grid bg-white gap-6 [text-wrap:balance]"
    >
      <h1 className="text-center  text-offblack max-w-4xl lg:text-8xl text-5xl">
        Learn <span className="opacity-50">a new talent</span> and teach
        <span className="opacity-50"> away </span>your talent.
      </h1>
      <span className="text-center font-light place-self-center text-md">
        have a look at courses in your area
      </span>
    </motion.section>
  );
}

export default About;
