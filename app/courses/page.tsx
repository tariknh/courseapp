import { getAllCourses, getFilteredCourses } from "@/actions/getCourses";
import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import Filterbar from "@/components/Inputs/Filterbar";
import UpdatedFilterBar from "@/components/ui/Filter/UpdatedFilterBar";

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

export default async function Courses(
  props: {
    searchParams?: Promise<{
      city?: string;
      category?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const courses = await getAllCourses();
  //console.log(courses, "courses");
  const currentCategory = undefined;
  const currentCity = undefined;

  const city = searchParams?.city || "";
  const category = searchParams?.category || "";

  //const currentPage = Number(searchParams?.page) || 1;

  const coursesFiltered = await getFilteredCourses(city, category);

  return (
    <section>
      <div className="h-[10vh] z-[100] fixed w-full bg-black"></div>
      <section className="bg-white w-full flex flex-col mb-48  h-fit pt-[12vh]">
        {/* <Filterbar /> */}
        <UpdatedFilterBar/>
        <section className="pt-16 px-2">
          <Collection
            data={
              city === "" && category === ""
                ? courses?.data
                : coursesFiltered?.data
            }
            emptyTitle="No courses found"
            emptyStateSubText="Change filters, or click below to reset filters!"
            collectionType="Courses_Organized"
            limit={20}
            page={1}
            totalPages={2}
            urlParamName={undefined}
          />
        </section>
      </section>
      <Footer />
    </section>
  );
}
