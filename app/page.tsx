// "use client";

import About from "@/components/About";
import Steps from "@/components/Steps";
import { Categories } from "@/components/sections/Categories";
import { Explore } from "@/components/sections/Explore";
// import { useEffect } from "react";
import Hero from "./Home";

export default function Home() {
  // useEffect(() => {
  //   let scroll: import("locomotive-scroll");
  //   import("locomotive-scroll").then((locomotiveModule) => {
  //     scroll = new locomotiveModule.default();
  //   });

  //   return () => {
  //     if (scroll) scroll.destroy();
  //   };
  // });

  return (
    <main>
      <Hero />
      <Categories />
      <Explore />
      <About />
      <Steps />
      {/* <Courses /> */}
    </main>
  );
}
