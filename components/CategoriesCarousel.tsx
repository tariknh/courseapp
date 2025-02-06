"use client";
import categories from "@/public/categories.json";
import { useMeasure } from "@uidotdev/usehooks";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface CategoryBoxProps {
  category: string;
  imageSrc: string;
}

const CategoryBox = ({ category, imageSrc }: CategoryBoxProps) => {
  return (
    <div className="bg-black shadow-inner relative text-white aspect-square h-40 md:h-64">
      <h2 className="bg-gradient-to-t from-zinc-900 to-zinc-transparent w-full absolute md:text-3xl z-5 bottom-0 left-0 p-2 font-bold">
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
  xOffset?: number;
}

const CategoriesCarousel = ({ xOffset }: CarouselProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll({
    target: targetRef,
  });
  const negx = useTransform(scrollY, [-5000, 3000], ["100%", "-55%"], {
    clamp: false,
  });
  const x = useTransform(scrollY, [500, 4000], ["-100%", "100%"], {
    clamp: false,
  });

  let [ref, { width }] = useMeasure();
  // useEffect(() => {
  //   let finalPosition = width && -width / 2;
  // }, [boostedScroll, width]);

  return (
    <motion.section
      style={xOffset && xOffset > 0 ? { x: negx } : { x: x }}
      ref={targetRef}
      className=" flex flex-row gap-6 overflow-visible w-full absolute"
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
