import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { MdStarRate } from "react-icons/md";

function Card(props: any) {
  return (
    <div className="bg-white text-sm grid grid-rows-6 md:w-2/5 min-w-40 max-w-[20rem] aspect-[4/5] rounded-lg">
      <div className="overflow-hidden relative row-span-4 rounded-b-none bg-black rounded-lg mb-2">
        <Image
          className="object-cover"
          fill={true}
          src={`${props.image}`}
          alt={""}
        />
      </div>
      <div className="h-fit bg-white z-10 rounded-xl p-6 self-center flex flex-col">
        <h1 className="font-bold text-xl md:text-3xl">Konfektlaging</h1>
        <span className="block md:text-lg">tors. 19 okt @3.00 PM</span>
        <span className="mt-1 md:text-lg block">DNB Arena, Stavanger</span>
        <div className="flex my-2">
          <div className="flex">
            <MdStarRate />
            <MdStarRate />
            <MdStarRate />
            <MdStarRate />
            <MdStarRate />
          </div>
          <span className="">117</span>
        </div>
        <motion.button className="md:text-lg w-full place-self-start justify-self-center px-4 py-2 text-md border rounded-full bg-offblack max-w-fit text-white p-8">
          {props.price} kr
        </motion.button>
      </div>
    </div>
  );
}

export default Card;
