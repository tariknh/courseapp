"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Cross, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { ComboBoxResponsive } from "../ui/Combobox";

import { Categories } from "../Categories";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { PlaceAutocomplete } from "./PlacesAutoComplete";
import { APIProvider } from "@vis.gl/react-google-maps";

const Filterbar = () => {
  //Later add types for the currentCategory and currentCity instead of string
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category")?.toString();
  const currentCity = searchParams.get("city")?.toString();

  const mobileSearchVariants = {
    default: {
      height: "6vh",
      transition: { duration: 0.1, ease: "easeOut" },
    },
    open: {
      height: "35vh",
      transition: { duration: 0.1, ease: "easeIn" },
    },
  };

  const desktopSearchVariants = {
    default: {
      height: "6vh",
      transition: { duration: 0.1, ease: "easeOut" },
    },
    open: {
      height: "11vh",
      transition: { duration: 0.1, ease: "easeIn" },
    },
  };

  return (
    <div className={`absolute z-50 row-span-2 w-full px-2 col-span-full`}>
      <motion.div
        initial="default"
        onClick={() => !open && setOpen(true)}
        animate={open ? "open" : "default"}
        variants={isMobile ? mobileSearchVariants : desktopSearchVariants}
        className={`${
          !open && "cursor-pointer hover:bg-primary/90"
        } bg-offblack overflow-hidden h-[20%] text-primary-foreground  p-3 flex gap-3 items-center`}
      >
        {!open && <Search size={24} />}
        <h2 className={open ? `hidden` : "inline-block w-full"}>
          {currentCategory && currentCity
            ? currentCategory + " - " + currentCity
            : "Any Category - Any City"}
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
type Status = {
  value: string;
  label: string;
};

export const SearchInputs = (props: SProps) => {
  const { state } = props;

  const [value, setValue] = React.useState<Categories | null>(null);
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string | undefined) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("city", term);
    } else {
      params.delete("city");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  function handleCategory(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("category", term);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const searchParams = useSearchParams();

  const inputVariants = {
    default: {
      y: "30%",
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
    <motion.div
      variants={inputVariants}
      className="md:flex w-full h-full  gap-5 items-center"
    >
      <X
        onClick={() => state(false)}
        scale={2}
        className="absolute top-0 right-0 cursor-pointer"
      />
      <div className="md:w-1/4 mb-4 md:mb-0 self-end">
        <h2 className="font-bold mb-2">Choose a Category:</h2>
        {/* <Input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Technology"
        /> */}
        <ComboBoxResponsive
          value={searchParams.get("category")?.toString()}
          setValue={setValue}
          setCategory={""}
          category={""}
          onChange={(category) => handleCategory(category)}
        />
      </div>
      <div className="self-end  md:w-1/4">
        <h2 className="font-bold mb-2">Search for a city:</h2>
        {/* <Input
          defaultValue={searchParams.get("city")?.toString()}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className="text-offblack "
          placeholder="Stavanger, Norway"
        /> */}
        <APIProvider apiKey={`AIzaSyBuMu7Z7uz7-75yeLUHEkBgIXDyIOHxDhE`}>
          <PlaceAutocomplete
            className="text-offblack"
            defaultValue={searchParams.get("city")?.toString()}
            onPlaceSelect={(e) => handleSearch(e?.formatted_address)}
          />
        </APIProvider>
      </div>
      <Button
        className=" self-end mt-4 md:mt-0"
        variant={"secondary"}
        onClick={() => state(false)}
      >
        Apply Filters
      </Button>
    </motion.div>
  );
};

export default Filterbar;
