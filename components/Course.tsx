import { createClient } from "@/app/utils/supabase/server";
import { getNameById } from "@/lib/actions/course.actions";
import { CourseTypes } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AiFillEdit } from "react-icons/ai";
import { DeleteConfirmation } from "./DeleteConfirmation";
interface CourseProps {
  title: string;
  rating: string;
  capacity: string;
  course: CourseTypes;
  hasBuyButton?: boolean;
  hidePrice?: boolean;
  imageSrc: any;
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
  imageSrc,
}) => {
  const supabase = await createClient();

  //let images = await JSON.parse(course.imageSrc);
  let isCreator = false;
  // const { data: imageData } = supabase.storage
  //   .from("images")
  //   .getPublicUrl(images[0].uid);
  const arrangerID = course.user;

  const arranger = await getNameById(arrangerID);
  //console.log(JSON.parse(imageSrc), "IMAGE SOURCE");
  const images = JSON.parse(imageSrc);

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();

  const isCourseCreator = sessionData.user?.id === course.user;

  let stars = [1, 1, 1, 1, 1];
  //const allImages = JSON.parse(post.imageSrc);
  //const firstImage = allImages[0].uid;
  //const imagePath = useLoadImage(course);

  return (
    // <Link className="w-full" href={`/courses/${course.id}`}>
    <div className="grid-rows-1 items-stretch w-full grid grid-cols-1 justify-center mt-2 h-fit">
      {/* IS COURSE CREATOR*/}
      <div
        className="
            bg-slate-200
            aspect-video
            w-full
            relative
           
            overflow-hidden
            grid
          "
      >
        <Suspense fallback={"loading image.."}>
          <Link href={`/courses/${course.id}`}>
            <Image src={images[0]} alt={title} fill className="object-cover" />
          </Link>
        </Suspense>
        {isCourseCreator && (
          <div className="absolute right-2 top-2 flex flex-col gap-4 bg-white p-3 shadow-sm transition-all">
            <Link href={`/courses/${course.id}/update`}>
              <AiFillEdit className="hover:scale-125" />
            </Link>
            <DeleteConfirmation courseId={course.id} />
          </div>
        )}
        <div className="bg-offblack absolute bottom-2 right-2 py-2 px-5">
          <h3 className="text-white font-bold">
            {/* {hidePrice ? "200kr" : "Edit Course"} */}
            {course.isFree ? "Free" : course.price + "kr"}
          </h3>
        </div>
      </div>
      <div className="flex flex-col mt-2 gap-2 h-2/6">
        <div className="flex text-nowrap  text-sm justify-between text-zinc-500">
          <h2>{formatDateTime(course.date.from)}</h2>
          {/* Created by firstname lastname */}
          <h2>
            Hosted by{" "}
            <p className="text-offblack font-bold inline-block">
              {isCourseCreator ? "You" : arranger ? arranger.name : "Anonymous"}
            </p>
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl max-w-56 md:max-w-none">
            {title}
          </h2>
          {isCourseCreator && (
            <Link className="justify-self-end" href={`/manage/${course.id}`}>
              <div className="w-full justify-self-end flex gap-2 items-center">
                <p className="bg-zinc-800 transition-all text-xs h-9 text-nowrap rounded-[2px] px-3 text-zinc-600 items-center flex border-input bg-background bg-opacity-20 hover:text-background border-zinc-700 hover:bg-zinc-700 place-self-end">
                  Manage Event
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
