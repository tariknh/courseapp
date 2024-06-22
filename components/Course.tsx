import useLoadImage from "@/hooks/useLoadImage";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";
import { AiFillContacts } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { CourseTypes } from "@/types";
import { createClient } from "@/app/utils/supabase/server";
import { get } from "http";
import { getNameById } from "@/lib/actions/course.actions";
import { AiFillEdit } from "react-icons/ai";
import { DeleteConfirmation } from "./DeleteConfirmation";

interface CourseProps {
  title: string;
  rating: string;
  capacity: string;
  course: CourseTypes;
  hasBuyButton?: boolean;
  hidePrice?: boolean;
}

export function formatDateTime(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const AllCourses: React.FC<CourseProps> = async ({
  title,
  rating,
  capacity,
  course,
  hasBuyButton,
  hidePrice,
}) => {
  const supabase = createClient();
  const images = JSON.parse(course.imageSrc);
  let isCreator = false;
  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(images[0].uid);

  const arranger = await getNameById(course.user);

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();

  const isCourseCreator = sessionData.user?.id === course.user;

  let stars = [1, 1, 1, 1, 1];
  //const allImages = JSON.parse(post.imageSrc);
  //const firstImage = allImages[0].uid;
  //const imagePath = useLoadImage(course);

  return (
    // <Link className="w-full" href={`/courses/${course.id}`}>
    <div className="grid-rows-1 w-full grid grid-cols-1 justify-center mt-2 ">
      {/* IS COURSE CREATOR*/}

      <div
        className="
            bg-slate-200
            aspect-video
            row-span-3
            relative
          "
      >
        <Link href={`/courses/${course.id}`}>
          <Image
            src={imageData.publicUrl || "/courseimg/tavle.jpg"}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </Link>
        {isCourseCreator && (
          <div className="absolute right-2 top-2 flex flex-col gap-4 bg-white p-3 shadow-sm z-20   transition-all">
            <Link href={`/courses/${course.id}/update`}>
              <AiFillEdit className="hover:scale-125" />
            </Link>
            <DeleteConfirmation courseId={course.id} />
          </div>
        )}
        <div className="bg-offblack absolute bottom-2 right-2 py-2 px-5">
          <h3 className="text-white font-bold">
            {/* {hidePrice ? "200kr" : "Edit Course"} */}
            {course.isFree ? "Free" : "200kr"}
          </h3>
        </div>
      </div>

      <div className="flex flex-col mt-2">
        <div className="flex text-nowrap  text-sm justify-between text-zinc-500">
          <h2>{formatDateTime(course.date.from)}</h2>
          {/* Created by firstname lastname */}
          <h2>
            Hosted by{" "}
            <p className="text-offblack font-bold inline-block">
              {isCourseCreator ? "You" : arranger.name}
            </p>
          </h2>
        </div>

        <h2 className="font-semibold text-xl">{title}</h2>
      </div>
      {hasBuyButton && (
        <Link href={`/orders?eventId=${course.id}`}>
          <p className="">Order Details</p>
          <Image
            src="/assets/icons/arrow.svg"
            alt="search"
            width={10}
            height={10}
          />
        </Link>
      )}
    </div>
  );
};

export default AllCourses;
