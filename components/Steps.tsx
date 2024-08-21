"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "./ui/button";

const Steps = () => {
  const circleClip = {
    initial: {
      clipPath: "circle(0% at 49% 100%)",
    },
    animate: {
      clipPath: "circle(76.0% at 50% 57%)",
    },
  };

  const sectionRef: any = useRef();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center start"],
  });

  const opacityValue = useTransform(scrollYProgress, [0, 1], ["0", "1"]);
  const clipValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["circle(0% at 52% 100%)", "circle(100% at 52% 100%)"]
  );

  return (
    <>
      <motion.section
        ref={sectionRef}
        transition={{ duration: 1 }}
        style={{ clipPath: clipValue }}
        className="text-white font-bold p-8 justify-center content-center relative h-screen z-50 overflow-visible grid bg-accent gap-6 [text-wrap:balance]"
      ></motion.section>
      <div className="text-white w-full font-bold p-8 justify-center content-center h-screen grid bg-accent gap-6 [text-wrap:balance]">
        <h1 className="text-center text-white max-w-4xl lg:text-8xl text-5xl">
          Ready to learn that skill you always wanted?
        </h1>
        <Button className="md:h-24 h-12 w-2/4  self-center justify-self-center md:text-4xl text-2xl font-bold ">
          <Link href={"/login"}>Sign up today</Link>
        </Button>
      </div>

      {/* <section className="md:px-44 justify-center items-center grid h-screen md:h-[200vh] gap-y-5 md:gap-y-10 grid-rows-3 grid-cols-2 bg-accent text-white">
        <div
          data-scroll
          data-scroll-speed="0.3"
          className="col-start-1 row-start-1 text-left grid gap-3 text-3xl md:text-6xl lg:text-7xl p-8 font-bold"
        >
          <h1 className="text-6xl md:text-9xl">1.</h1>
          <h1>Choose a category</h1>
        </div>
        <div
          data-scroll
          data-scroll-speed="0.3"
          className="col-start-1 row-start-2 text-left md:text-6xl lg:text-7xl grid gap-3 text-3xl p-8 font-bold"
        >
          <h1 className="text-6xl md:text-9xl">2.</h1>
          <h1>Fill out the fields</h1>
        </div>
        <div
          data-scroll
          data-scroll-speed="0.3"
          className="col-start-1 row-start-3 text-left md:text-6xl lg:text-7xl grid gap-3 text-3xl p-8 font-bold"
        >
          <h1 className="text-6xl md:text-9xl">3.</h1>
          <h1>Publish your course!</h1>
        </div>
        <div className="bg-black col-start-2 rounded-[3rem] w-full max-h-full  md:h-full md:w-full aspect-[3/4] overflow-hidden grid items-center">
          <video
            className="object-cover h-full"
            autoPlay
            muted
            loop
            src="/first.mp4"
          ></video>
        </div>
        <div className="bg-black col-start-2 rounded-[3rem] w-full max-h-full overflow-hidden relative md:w-full md:h-full aspect-[3/4]">
          <Image
            className="object-cover"
            fill={true}
            src={"/second.png"}
            alt={""}
            data-scroll
            data-scroll-speed="0.01"
          />
        </div>
        <div className="bg-black col-start-2 rounded-[3rem] w-full max-h-full relative overflow-hidden md:w-full md:h-full aspect-[3/4]">
          <Image
            className="object-cover"
            fill={true}
            src={"/third.png"}
            alt={""}
          />
        </div>
      </section> */}
    </>
  );
};

export default Steps;
