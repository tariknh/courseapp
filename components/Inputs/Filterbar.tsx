"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";

const Filterbar = () => {
  const [open, setOpen] = useState(true);

  const searchVariants = {
    default: {
      height: "5vh",
      transition: { duration: 0.2, ease: "easeOut" },
    },
    open: {
      height: "30vh",
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <div
      onClick={() => setOpen(!open)}
      className="cursor-pointer w-full px-6 col-span-full"
    >
      <motion.div
        initial="default"
        animate={open ? "open" : "default"}
        variants={searchVariants}
        className="bg-primary text-primary-foreground hover:bg-primary/90 p-3 flex gap-3"
      >
        <Search />
        <h2 className={open ? `hidden` : "inline-block w-full"}>
          Technology - Stavanger, Norway
        </h2>
        <SearchInputs />
      </motion.div>

      <hr className="w-full" />
    </div>
  );
};

export const SearchInputs = () => {
  const inputVariants = {
    default: {
      y: "100%",
      opacity: 0,
      visibility: "collapse",
      transition: {
        duration: 0.4,
        ease: [0.83, 0, 0.17, 1],
      },
    },
    open: {
      y: "0%",
      opacity: 1,
      visibility: "visible",
      transition: {
        duration: 0.4,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };
  return (
    <motion.div variants={inputVariants} className="">
      <div>
        <h2 className="font-bold">Category</h2>
        <Input placeholder="Technology" />
      </div>
      <div>
        <h2 className="font-bold">City</h2>
        <Input placeholder="Stavanger, Norway" />
      </div>
    </motion.div>
  );
};

export default Filterbar;
