import { getFilteredCourses } from "@/actions/getCourses";
import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import UpdatedFilterBar from "@/components/ui/Filter/UpdatedFilterBar";
import { Suspense } from "react";
import Loading from "./loading";

export const revalidate = 0;

export default async function Courses(props: {
  searchParams?: Promise<{
    city?: string;
    category?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const city = searchParams?.city || "";
  const category = searchParams?.category || "";

  const coursesFiltered = await getFilteredCourses(city, category);

  return (
    <section>
      <div className="h-[10vh] z-[100] fixed w-full bg-black"></div>
      <Suspense fallback={"loading!"}>
        <section className="bg-white w-full flex flex-col mb-48  h-fit pt-[12vh]">
          {/* <Filterbar /> */}
          <UpdatedFilterBar />
          <section className="pt-16 px-2">
            <Suspense fallback={<Loading />}>
              <Collection
                data={coursesFiltered?.data}
                emptyTitle="No courses found"
                emptyStateSubText="Change filters, or click below to reset filters!"
                collectionType="Courses_Organized"
                limit={20}
                page={1}
                totalPages={2}
                urlParamName={undefined}
              />
            </Suspense>
          </section>
        </section>
      </Suspense>
      <Footer />
    </section>
  );
}
