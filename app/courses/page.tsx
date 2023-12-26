import getCourses from "@/actions/getCourses";
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
  const courses = await getCourses();

  return (
    <section className="">
      <div className="h-[12vh] z-100 fixed w-full bg-black"></div>
      <section className="bg-white grid justify-center h-fit pt-[12vh]">
        {courses.map((course, key) => (
          <Link key={key} href={`/courses/${course.id}`}>
            <Course
              course={course}
              capacity={course.capacity}
              rating={course.capacity}
              title={course.title}
            />
          </Link>
        ))}
      </section>
    </section>
  );
}
