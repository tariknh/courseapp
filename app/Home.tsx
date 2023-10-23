"use client";
import { motion, useMotionValueEvent } from "framer-motion";
import { useScroll } from "framer-motion";
import { useState } from "react";
export default function Hero() {
  const { scrollY } = useScroll();

  const [scrollStatus, setScrollstatus] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) {
      setScrollstatus(false);
    } else {
      setScrollstatus(true);
    }
  });

  return (
    <section>
      <motion.video
        variants={{
          initial: { borderRadius: 0 },
          animate: { borderBottomLeftRadius: 50, borderBottomRightRadius: 50 },
        }}
        animate={scrollStatus ? "initial" : "animate"}
        className="overflow-hidden absolute w-screen h-screen object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/fjell.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>
      <section className="p-8 justify-start h-screen grid bg-accent overflow-hidden">
        <div className="z-10 place-self-end grid gap-8">
          <h1 className="max-w-[16rem] md:max-w-[20rem] text-balance font-bold text-6xl font-sans text-white">
            your next course awaits you.
          </h1>
          <button className="px-8 py-4 font-bold text-xl border rounded-full bg-white max-w-fit text-black p-8">
            <a href="/courses">view all courses</a>
          </button>
        </div>
      </section>
    </section>
  );
}
