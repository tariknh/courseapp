import Course from "@/components/Course";
import { CourseTypes } from "@/types";
import SkeletonImage from "antd/es/skeleton/Image";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "./ui/button";

type CollectionProps = {
  data: CourseTypes[];
  emptyTitle: string;
  emptyStateSubText: string;
  collectionType?: "Courses_Organized" | "My_Tickets" | "All_Courses";
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubText,
  collectionType,
  limit,
  page,
  totalPages,
  urlParamName,
}: CollectionProps) => {
  let coursesList = data.slice(0, limit);

  return (
    <div className="w-full">
      {coursesList.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid gap-8 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 xl:gap-10">
            {coursesList.map((course) => {
              const hasBuyButton = collectionType === "Courses_Organized";
              const hidePrice = collectionType === "My_Tickets";
              return (
                <li key={course.id} className="flex justify-center">
                  <Suspense fallback={<SkeletonImage />}>
                    <Course
                      course={course}
                      capacity={course.capacity}
                      rating={course.capacity}
                      title={course.title}
                      hasBuyButton={hasBuyButton}
                      hidePrice={hidePrice}
                    />
                  </Suspense>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col text-balance justify-center min-h-[150px] w-full text-center bg-zinc-100">
          <h3 className="font-bold text-2xl">{emptyTitle}</h3>
          <p>{emptyStateSubText}</p>
          <Button className="mt-4 max-w-lg mx-auto">
            <Link href={"/courses"}>View Courses</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Collection;
