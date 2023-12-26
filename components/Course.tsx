"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";
import { AiFillContacts } from "react-icons/ai";
import Image from "next/image";

interface CourseProps {
  title: string;
  rating: string;
  capacity: string;
  course: any;
}

const AllCourses: React.FC<CourseProps> = ({
  title,
  rating,
  capacity,
  course,
}) => {
  let stars = [1, 1, 1, 1, 1];
  const starAmount = +rating;
  //const allImages = JSON.parse(post.imageSrc);
  //const firstImage = allImages[0].uid;
  const imagePath = useLoadImage(course);
  console.log(imagePath);

  return (
    <div className=" grid-rows-6 grid grid-cols-1 justify-center  aspect-[16/10] h-60 mt-4">
      <div
        className="
            bg-slate-200
            h-40
            row-span-4
            relative
          "
      >
        <Image
          src={imagePath || "/courseimg/tavle.jpg"}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <h2 className="font-semibold">{title}</h2>
        <div className="flex gap-1 items-center">
          <AiFillContacts />
          <span className="text-slate-600">{capacity}</span>
          <div className="flex ml-2">
            {stars.map((star) => (
              <StarFilledIcon key={star} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
