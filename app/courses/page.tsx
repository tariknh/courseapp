import { getAllCourses, getFilteredCourses } from "@/actions/getCourses";
import Collection from "@/components/Collection";
import Course from "@/components/Course";
import Filterbar from "@/components/Inputs/Filterbar";
import { GMap } from "@/components/Inputs/PlacesAutoComplete";
import { DatePicker } from "@/components/ui/DatePicker";
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

export default async function Courses({
  searchParams,
}: {
  searchParams?: {
    city?: string;
    category?: string;
  };
}) {
  const courses = await getAllCourses();
  //console.log(courses, "courses");
  const currentCategory = undefined;
  const currentCity = undefined;

  const city = searchParams?.city || "";
  const category = searchParams?.category || "";

  //const currentPage = Number(searchParams?.page) || 1;

  const coursesFiltered = await getFilteredCourses(city, category);

  return (
    <section className="">
      <div className="h-[10vh] z-[100] fixed w-full bg-black"></div>
      <section className="bg-white w-full flex flex-col   h-fit pt-[12vh]">
        <Filterbar />
        <section className="pt-16 px-2">
          <Collection
            data={
              city === "" && category === ""
                ? courses?.data
                : coursesFiltered?.data
            }
            emptyTitle="No courses found"
            emptyStateSubText="Change the filters to find more courses!"
            collectionType="Courses_Organized"
            limit={3}
            page={1}
            totalPages={2}
            urlParamName={undefined}
          />
        </section>
      </section>
    </section>
  );
}
