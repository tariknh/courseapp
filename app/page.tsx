"use client";

import Hero from "./Home";
import About from "@/components/About";
import Steps from "@/components/Steps";
import Courses from "@/components/Courses";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { getAllCourses } from "@/actions/getCourses";

export default function Home() {
  useEffect(() => {
    let scroll: import("locomotive-scroll");
    import("locomotive-scroll").then((locomotiveModule) => {
      scroll = new locomotiveModule.default();
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  });

  return (
    <main>
      <Hero />
      <About />
      <Steps />
      <Courses />
    </main>
  );
}
