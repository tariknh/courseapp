"use client";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ComboBoxResponsive } from "../ui/Combobox";
import { Button } from "../ui/button";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { APIProvider } from "@vis.gl/react-google-maps";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoriesTypes } from "../Categories";
import { PlaceAutocomplete } from "./PlacesAutoComplete";

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
        <h2 className={open ? `hidden` : "inline-block w-full  text-nowrap"}>
          {currentCategory && currentCity
            ? currentCategory + " - " + currentCity
            : "Any Category - Any City"}
        </h2>
        <SearchInputs setState={setOpen} open={open} />
      </motion.div>

      <hr className="w-full" />
    </div>
  );
};

interface SProps {
  setState: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}
type Status = {
  value: string;
  label: string;
};

export const SearchInputs = (props: SProps) => {
  const { open, setState } = props;

  const [value, setValue] = React.useState<CategoriesTypes | null>(null);
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

  return (
    <motion.div
      initial={{
        y: "80%",
        opacity: 0,
        visibility: "collapse",
      }}
      variants={{
        initial: {
          y: "80%",
          opacity: 0,
        },
        open: {
          y: "0%",
          opacity: 1,
          visibility: "visible",
          transition: {
            duration: 0.2,
            ease: [0.83, 0, 0.17, 1],
          },
        },
      }}
      animate={open ? "open" : "initial"}
      // animate={{
      //   y: "0%",
      //   opacity: 0.2,
      //   visibility: "visible",
      //   transition: {
      //     duration: 0.4,
      //     ease: [0.83, 0, 0.17, 1],
      //   },
      // }}
      className="md:flex w-full h-full collapse gap-5 items-center"
    >
      <X
        onClick={() => setState(false)}
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
        className="w-full md:max-w-48 self-end mt-4 md:mt-0"
        variant={"secondary"}
        onClick={() => setState(false)}
      >
        Apply Filters
      </Button>
    </motion.div>
  );
};

export default Filterbar;
