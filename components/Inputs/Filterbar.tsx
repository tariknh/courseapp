"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { ComboBoxResponsive } from "../ui/Combobox";

const Filterbar = () => {
  const [open, setOpen] = useState(false);

  const searchVariants = {
    default: {
      height: "20%",
      transition: { duration: 0.2, ease: "easeOut" },
    },
    open: {
      height: "100%",
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <div className={` row-span-2 w-full px-6 col-span-full`}>
      <motion.div
        initial="default"
        onClick={() => !open && setOpen(true)}
        animate={open ? "open" : "default"}
        variants={searchVariants}
        className={`${
          !open && "cursor-pointer"
        } bg-primary h-[20%] text-primary-foreground hover:bg-primary/90 p-3 flex gap-3 items-center`}
      >
        {!open && <Search size={24} />}
        <h2 className={open ? `hidden` : "inline-block w-full"}>
          Technology - Stavanger, Norway
        </h2>
        <SearchInputs state={setOpen} />
      </motion.div>

      <hr className="w-full" />
    </div>
  );
};

interface SProps {
  state: Dispatch<SetStateAction<boolean>>;
}

export const SearchInputs = (props: SProps) => {
  const { state } = props;
  const handleSearch = (value: string) => {
    console.log(value);
  };
  const inputVariants = {
    default: {
      y: "50%",
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
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Technology"
        />
        <ComboBoxResponsive />
      </div>
      <div>
        <h2 className="font-bold">City</h2>
        <Input placeholder="Stavanger, Norway" />
      </div>
      <Button onClick={() => state(false)}>Apply Filters</Button>
    </motion.div>
  );
};

export default Filterbar;
