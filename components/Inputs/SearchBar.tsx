"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { CategoriesTypes } from "../Categories";
import { ComboBoxResponsive } from "../ui/Combobox";
import { PlaceAutocomplete } from "./PlacesAutoComplete";

type Props = {};
type SearchVariants = {
  variant: string;
  searchParams: { city: string; category: string };
  setSearchParams: React.Dispatch<
    React.SetStateAction<{ city: string; category: string }>
  >;
};

const SearchInput = ({
  variant,
  searchParams,
  setSearchParams,
}: SearchVariants) => {
  const mapsKey = process.env.mapsKey as string;
  return variant === "Category" ? (
    <div className="flex flex-col">
      <h2 className="text-sm mb-2 text-offblack">I wanna learn:</h2>
      {/* <Input
        onChange={(e) =>
          setSearchParams({ ...searchParams, category: e.target.value })
        }
        className="text-xs border-none"
        placeholder="Enter a category"
      /> */}
      <ComboBoxResponsive
        setCategory={""}
        category={""}
        onChange={(e: any) => {
          setSearchParams({ ...searchParams, category: e });
        }}
        value={searchParams.category}
        setValue={function (status: CategoriesTypes | null): void {
          return;
        }}
      />
    </div>
  ) : (
    <div className="">
      <h2 className="text-sm mb-2 text-offblack">In the city of:</h2>
      {/* <Input
        onChange={(e) =>
          setSearchParams({ ...searchParams, city: e.target.value })
        }
        className="text-xs border-none"
        placeholder="Enter a City"
      /> */}
      <APIProvider apiKey={mapsKey}>
        <PlaceAutocomplete
          className="text-offblack"
          onPlaceSelect={(e) =>
            e?.formatted_address &&
            setSearchParams({ ...searchParams, city: e.formatted_address })
          }
        />
      </APIProvider>
    </div>
  );
};

const SearchBar = (props: Props) => {
  const [searchParams, setSearchParams] = useState({
    city: "",
    category: "",
  });
  return (
    <div className="bg-white max-w-2xl rounded-md text-black flex gap-6 flex-col sm:flex-row sm:items-center p-5">
      <SearchInput
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        variant="Category"
      />
      <SearchInput
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        variant="City"
      />
      <motion.button
        whileHover={{
          backgroundColor: "Background",
          color: "#121212",
          border: "1px solid #121212",
        }}
        className="px-8 py-4 text-xl border bg-black max-w-fit text-white p-8 rounded-md"
      >
        <Link
          href={`/courses?category=${searchParams.category}&city=${searchParams.city}`}
        >
          Search
        </Link>
      </motion.button>
    </div>
  );
};

export default SearchBar;
