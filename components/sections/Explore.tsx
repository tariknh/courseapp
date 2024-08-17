import { getAllCourses } from "@/actions/getCourses";
import Collection from "../Collection";

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
      </div>
      <div className="col-span-full row-start-3">
        <Collection
          data={courses?.data}
          emptyTitle="No courses found"
          emptyStateSubText="Change the filters to find more courses!"
          collectionType="Courses_Organized"
          limit={6}
          page={1}
          totalPages={2}
          urlParamName={undefined}
        />
      </div>
    </section>
  );
};
