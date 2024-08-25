"use client";
import SearchBar from "@/components/Inputs/SearchBar";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
export default function Hero() {
  const { scrollY } = useScroll();

  const [scrollStatus, setScrollStatus] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) {
      setScrollStatus(false);
    } else {
      setScrollStatus(true);
    }
  });

  return (
    <section className="bg-offblack">
      {/* <motion.video
        variants={{
          initial: { borderRadius: 0 },
          animate: { borderBottomLeftRadius: 50, borderBottomRightRadius: 50 },
        }}
        animate={scrollStatus ? "initial" : "animate"}
        className="border-none z-[250] overflow-hidden absolute w-screen h-screen object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/fjell.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video> */}
      {/* <Image
        className="object-cover blur-sm"
        fill
        src="/heroimage.jpg"
        alt={"Hero image"}
      /> */}
      <section className="z-[260] p-8 justify-start h-screen grid overflow-hidden">
        <div className="text-5xl lg:text-7xl font-bold text-white self-center text-balance z-[260] grid gap-10 max-w-2xl">
          <h1>The number one place for learning and teaching skills</h1>
          <SearchBar />
        </div>
      </section>
    </section>
  );
}
