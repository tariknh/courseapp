import { getAllCourses } from "@/actions/getCourses";
import Link from "next/link";
import { Suspense } from "react";
import Collection from "../Collection";
import { Button } from "../ui/button";

export const Explore = async () => {
  const courses = await getAllCourses();
  return (
    <section className="h-[150vh] overflow-hidden grid p-8  grid-cols-2 grid-rows-12 md:grid-cols-3">
      <div className="flex mb-12 col-span-2 xl:col-span-1 flex-col gap-4 text-balance">
        <h2 className="text-3xl md:text-4xl font-bold">
          Take a look at some of the active courses
        </h2>
        <span>
          These courses have been made by people, and are available for you to
          sign up for!{" "}
        </span>
        <Button className="w-48">
          <Link href="/courses">View all courses</Link>
        </Button>
      </div>
      <div className="col-span-full sm:row-start-3 row-start-3">
        <Suspense fallback={"Loading.."}>
          <Collection
            data={courses?.data}
            emptyTitle="No courses found"
            emptyStateSubText="Change the filters to find more courses!"
            collectionType="Courses_Organized"
            limit={3}
            page={1}
            totalPages={2}
            urlParamName={undefined}
          />
        </Suspense>
      </div>
      {/* 
      CLICKABLE CITIES AND REDIRECT TO /COURSES?CITY AND THE CITY CLICKED
      <div className="text-3xl text-center justify-self-center col-span-full row-start-12 md:text-4xl font-bold">
        <h2>Explore by cities</h2>
      </div> */}
    </section>
  );
};
