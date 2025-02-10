import { createClient } from "@/app/utils/supabase/server";
import BuyButton from "@/components/BuyButton";
import { categories } from "@/components/Categories";
import Collection from "@/components/Collection";
import EditListing from "@/components/EditListing";
import EmblaCarousel from "@/components/Embla/EmblaCarousel";
import { Button } from "@/components/ui/button";
import { getCourseById, getRelatedEvents } from "@/lib/actions/course.actions";
import { CourseTypes } from "@/types";
import { EmblaOptionsType } from "embla-carousel";
import { AiFillEdit } from "react-icons/ai";
import { MdDateRange, MdLocationOn } from "react-icons/md";

interface CoursePreviewProps {
  parameters: Promise<{ course: string }>;
}

const CoursePreview = async ({ parameters }: CoursePreviewProps) => {
  const params = await parameters;
  const supabase = await createClient();
  const getData = await getCourseById(parseInt(params.course));
  const { data: listingData } = getData;
  const listing: CourseTypes = listingData;
  const { category } = listing;
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();

  const isCourseCreator = sessionData.user?.id === listing.user;

  const relatedEvents = await getRelatedEvents({
    category: category,
    limit: 3,
    page: 1,
    currentEvent: listing.id,
  });

  const creatorId = listing?.user;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", creatorId);

  const images = JSON.parse(listing.imageSrc);
  const SLIDES: { id: Number; imageSrc: string }[] = [];

  images.map((image: any) => {
    const { data: imageData } = supabase.storage
      .from("images")
      .getPublicUrl(image.uid);
    SLIDES.push({
      id: image.id,
      imageSrc: imageData.publicUrl,
    });
  });

  const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

  const location = JSON.parse(listing.location);

  const fromDate = new Date(listing.date.from).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const toDate = new Date(listing.date.to).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="w-full flex flex-col items-left justify-start md:px-24">
      <article className="grid">
        <div className="px-6 pt-4 flex flex-col gap-4">
          <EmblaCarousel images={images} slides={SLIDES} options={OPTIONS} />
          <div className="flex gap-4 items-center">
            <h1 className="text-3xl font-bold">{listing.title}</h1>
            {isCourseCreator && (
              <AiFillEdit className="cursor-pointer scale-150 hover:scale-125" />
            )}
          </div>

          <h2>Hosted by {data && data[0].full_name}</h2>
          <div className="flex gap-2">
            <BuyButton
              disabled={new Date(listing.date.to) < new Date()}
              session={sessionData}
              listing={listing}
            />

            {isCourseCreator && <EditListing listingData={listing} />}
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <div className="flex gap-2">
              <MdDateRange size="20" />
              <span className="text-sm">
                {fromDate} - {toDate}
              </span>
            </div>
            <div className="flex gap-2">
              <MdLocationOn size="20" />
              <span className="text-sm">
                {location?.formatted_address
                  ? location.formatted_address
                  : "Undisclosed Location"}
              </span>
            </div>
            <div className="flex gap-2">
              {categories.find((cat) => cat.name === listing.category)?.icon}
              <span className="text-sm">{listing.category}</span>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5">
            <h2 className="text-xl font-medium">About the event</h2>
            <p className="text-sm">{listing.description}</p>
          </div>
          <div className="mt-10 flex justify-between items-center gap-5">
            <h2 className="text-xl font-medium">Other related courses</h2>
            <Button>View all courses</Button>
          </div>
          <div className="">
            <Collection
              data={relatedEvents?.data}
              emptyTitle="No related events"
              emptyStateSubText="We could not find any related events in this category, sorry!"
              collectionType="Courses_Organized"
              limit={3}
              page={1}
              totalPages={2}
              urlParamName={undefined}
            />
          </div>
        </div>
      </article>
    </main>
  );
};

export default CoursePreview;
