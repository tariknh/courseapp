"use client";
import React, { useEffect } from "react";
import categories from "@/public/categories.json";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMeasure } from "@uidotdev/usehooks";
import { X } from "lucide-react";

interface CategoryBoxProps {
  category: string;
  imageSrc: string;
}

const CategoryBox = ({ category, imageSrc }: CategoryBoxProps) => {
  return (
    <div className="bg-black shadow-inner relative text-white aspect-square h-40 md:h-64">
      <h2 className="bg-gradient-to-t from-zinc-900 to-zinc-transparent w-full absolute text-3xl z-5 bottom-0 left-0 p-2 font-bold">
        {category}
      </h2>
      <Image
        height={500}
        width={500}
        alt={``}
        src={`/CategoryImages/${imageSrc}`}
        className="shadow-inner aspect-square object-cover"
      />
    </div>
  );
};

interface CarouselProps {
  xOffset: number;
}

const CategoriesCarousel = ({ xOffset }: CarouselProps) => {
  console.log(categories, "categories");
  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();
  const boostedScroll = useTransform(scrollY, [0, 5], [0, 1], {
    clamp: false,
  });

  let [ref, { width }] = useMeasure();
  useEffect(() => {
    let finalPosition = width && -width / 2;
  }, [boostedScroll, width]);

  return (
    <motion.section
      style={{
        translateX: boostedScroll,
        x: width ? (xOffset ? xOffset * -width : width) : 0,
      }}
      ref={ref}
      className="translate-x-8 flex flex-row gap-6 overflow-visible w-full absolute"
    >
      {categories.map((category) => (
        <CategoryBox
          key={category.id}
          category={category.name}
          imageSrc={category.imageSrc}
        />
      ))}
    </motion.section>
  );
};

export default CategoriesCarousel;
