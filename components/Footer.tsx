"use client";

import Link from "next/link";
import CreateCourseButton from "./CreateCourseButton";

const Footer = () => {
  return (
    <footer className="pb-4 self-end md:grid-cols-3 h-[50vh] px-4 pt-12  grid text-white bg-[#0e0e0e]">
      <div className="flex row-span-1 font-bold">
        <span>CAPP</span> <span className="-mt-.5 ml-[.2rem] text-xs">®</span>
      </div>
      <span className="row-span-4 col-start-1 h-fit text-sm md:text-md max-w-lg text-balance opacity-50 font-medium">
        Courseapp's goal was for people to be able to expand their skills and
        easily contribute to the community, being able to share their courses
        online.
      </span>
      <div className="row-span-5 md:col-start-3 md:row-start-1">
        <h2 className="font-bold mb-2">NAVIGATE</h2>
        <ul className="flex font-normal flex-col gap-1 ">
          <Link href="/courses">All courses</Link>

          <Link href="/profile">Profile</Link>
          <CreateCourseButton />
        </ul>
      </div>
      <div className="self-end col-span-full font-bold justify-self-center text-6xl">
        <h2>COURSEAPP</h2>
      </div>
    </footer>
  );
};

export default Footer;
