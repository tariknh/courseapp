import React from "react";
import CategoriesCarousel from "../CategoriesCarousel";

export const Categories = () => {
  return (
    <section className="h-screen grid mt-24 p-8  sm:grid-cols-2 grid-rows-12 md:grid-cols-3">
      <div className="flex col-span-2 xl:col-span-1 flex-col gap-4 text-balance">
        <h2 className="text-3xl md:text-4xl font-bold">
          Explore a World of Learning Opportunities
        </h2>
        <span>
          Find the perfect course for you and embark on a journey of knowledge
          and skill development.{" "}
        </span>
      </div>

      <div className="row-start-4 relative row-span-full flex flex-col gap-6 col-span-full">
        <CategoriesCarousel xOffset={0} />
        <CategoriesCarousel xOffset={0.5} />
      </div>
      <div className="row-start-8 relative row-span-full flex flex-col gap-6 col-span-full">
        <CategoriesCarousel xOffset={0} />
        <CategoriesCarousel xOffset={1} />
      </div>
    </section>
  );
};
