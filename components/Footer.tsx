import { motion } from "framer-motion";
import React from "react";

function Footer() {
  return (
    <section className="p-8 rounded-t-3xl font-bold h-[50vh] grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 text-white bg-[#0e0e0e]">
      <div className="col-start-1 row-start-1 flex flex-col gap-2 max-w-fit">
        <h1 className="text-white text-2xl">settle for quality</h1>
        <motion.button className="px-6 py-2 text-lg border rounded-full bg-white text-black p-2">
          build your supplement
        </motion.button>
      </div>
      <div className="col-start-2 md:justify-self-end lg:pr-20 row-start-1 flex flex-col gap-2 max-w-fit">
        <span>home</span>
        <span>about</span>
        <span>FAQ</span>
      </div>
      <div className="col-start-1 row-start-2 col-span-2 flex place-self-end flex-col gap-2 w-full">
        <div className="flex justify-between flex-wrap gap-2">
          <span>Stavanger-Norway</span>
          <span>©2023</span>
          <div className="">
            <span>hello@mysup.no</span>
          </div>
        </div>
        <h1 className="text-center text-7xl w-full">mysup</h1>
      </div>
    </section>
  );
}

export default Footer;
