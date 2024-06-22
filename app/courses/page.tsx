import { getAllCourses } from "@/actions/getCourses";
import Collection from "@/components/Collection";
import Course from "@/components/Course";
import Link from "next/link";

export const revalidate = 0;

const courseJSON = [
  {
    title: "Hvordan lære å bygge en bedrift",
    description:
      "I dette kurset skal vi forsøke å lære å lage bedrifter og mye mer.",
    slug: "hvordan-laere-aa-bygge-en-bedrift",
    location: "Stavanger, Norway",
    rating: "5",
    capacity: "20",
    duration: "2t 30",
    price: "2500",
    host: "Tarik",
  },
  {
    title: "Hvordan lære å bygge en bedrift",
    description:
      "I dette kurset skal vi forsøke å lære å lage bedrifter og mye mer.",
    slug: "hvordan-laere-aa-bygge-en-bedrift",
    location: "Stavanger, Norway",
    rating: "5",
    capacity: "20",
    duration: "2t 30",
    price: "2500",
    host: "Tarik",
  },
];

export default async function Courses() {
  const courses = await getAllCourses();

  return (
    <section className="">
      <div className="h-[10vh] z-[100] fixed w-full bg-black"></div>
      <section className="bg-white grid justify-center h-fit pt-[12vh]">
        <Collection
          data={courses.data}
          emptyTitle="No courses yet"
          emptyStateSubText="You have not created any courses yet."
          collectionType="Courses_Organized"
          limit={3}
          page={1}
          totalPages={2}
          urlParamName={undefined}
        />
      </section>
    </section>
  );
}
