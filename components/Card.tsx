import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

function Card() {
  return (
    <div className="bg-white text-sm flex flex-col md:w-2/5 min-w-40 max-w-[20rem] aspect-[4/5] rounded-lg h-fit">
      <div className="h-24 md:h-40 overflow-hidden relative rounded-b-none bg-black rounded-lg mb-2">
        <Image fill={true} src="/third.png" alt={""} />
      </div>
      <div className="p-2 flex flex-col">
        <h1 className="font-bold text-xl md:text-3xl">Konfektlaging</h1>
        <span className="block md:text-lg">tors. 19 okt @3.00 PM</span>
        <span className="mt-1 md:text-lg block">DNB Arena, Stavanger</span>
        <span className="font-bold block md:text-lg mt-1">kr2299</span>
        <motion.button className="md:text-lg w-full place-self-center mt-4 px-4 py-2 text-md border rounded-full bg-black max-w-fit text-white p-8">
          kjøp billett
        </motion.button>
      </div>
    </div>
  );
}

export default Card;
