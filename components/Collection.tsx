import { CourseTypes } from "@/types";
import React from "react";
import Course from "@/components/Course";

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
  const coursesList = data;
  //console.log(coursesList, "coursesList");
  return (
    <div className="w-full">
      {coursesList.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 xl:gap-10">
            {coursesList.map((course) => {
              const hasBuyButton = collectionType === "Courses_Organized";
              const hidePrice = collectionType === "My_Tickets";
              return (
                <li key={course.id} className="flex justify-center">
                  <Course
                    course={course}
                    capacity={course.capacity}
                    rating={course.capacity}
                    title={course.title}
                    hasBuyButton={hasBuyButton}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col justify-center min-h-[150px] w-full text-center bg-zinc-100">
          <h3 className="font-bold">{emptyTitle}</h3>
          <p>{emptyStateSubText}</p>
        </div>
      )}
    </div>
  );
};

export default Collection;
