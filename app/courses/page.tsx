import getCourses from "@/actions/getCourses";
import { motion, useMotionValueEvent } from "framer-motion";
import { useScroll } from "framer-motion";
export const revalidate = 0;

export default async function Courses() {
  const courses = await getCourses();
  return (
    <section className="">
      <div className="h-[12vh] z-100 fixed w-full bg-black"></div>
      <section className="bg-white h-[200vh]">
        <div className="bg-black pt-[12vh] h-24"></div>
      </section>
    </section>
  );
}
