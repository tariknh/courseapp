import { createClient } from "@/app/utils/supabase/server";
import CheckInGuestModal from "@/components/ActionModals/CheckInModal";
import InviteButtonModal from "@/components/ActionModals/InviteButtonModal";
import ScrollAbleActions from "@/components/ScrollableActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCourseById } from "@/lib/actions/course.actions";
import { CourseTypes } from "@/types";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { IoMdMailOpen } from "react-icons/io";

export default async function Page({
  params,
}: {
  params: Promise<{ course: number }>;
}) {
  const courseId = (await params).course;

  const { data } = await getCourseById(courseId); // Extract 'data'

  const course = data as CourseTypes; // Explicitly assert the type

  return (
    <div className="bg-zinc-100 min-h-screen max-w-4xl mx-auto">
      <ScrollAbleActions data={course} />
      <CourseDetails data={course} />
    </div>
  );
}

const extractCityAndCountry = (formattedAddress: string) => {
  // Ensure we only work with the string portion of the address
  const cleanAddress = formattedAddress.split('","')[0]; // Remove everything after the country
  const parts = cleanAddress.split(", "); // Split the clean address by ", "

  const country = parts[parts.length - 1]; // The last part is the country
  const city = parts.length > 1 ? parts[parts.length - 2] : ""; // Second-to-last is the city

  return { city, country };
};

const formatDateRange = (from: string, to: string) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  // Detect user's preferred language from the browser
  const userLocale =
    typeof navigator !== "undefined" ? navigator.language : "en-US";

  // Format date for full day and abbreviated month
  const optionsDay = {
    weekday: "long",
    day: "2-digit",
    month: "short",
  } as const;
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  } as const;

  // Format day and month separately
  const dayFormatter = new Intl.DateTimeFormat(userLocale, { day: "2-digit" });
  const monthFormatter = new Intl.DateTimeFormat(userLocale, {
    month: "short",
  });

  // Use the detected locale for formatting full date and time
  const fullDayFormatter = new Intl.DateTimeFormat(userLocale, optionsDay);
  const timeFormatter = new Intl.DateTimeFormat(userLocale, optionsTime);

  // Get full formatted strings (without period after day)
  const fromDayFull = fullDayFormatter.format(fromDate); // e.g., "Tuesday 29 Oct"
  const fromTime = timeFormatter.format(fromDate); // e.g., "18:00 GMT"
  const toDayFull = fullDayFormatter.format(toDate); // e.g., "Saturday 30 Nov"
  const toTime = timeFormatter.format(toDate); // e.g., "19:00 GMT"

  // Get just day and month for day number and month abbreviation
  const fromDay = dayFormatter.format(fromDate); // e.g., "29"
  const fromMonth = monthFormatter.format(fromDate).toUpperCase(); // e.g., "OCT"
  const toDay = dayFormatter.format(toDate); // e.g., "30"
  const toMonth = monthFormatter.format(toDate).toUpperCase(); // e.g., "NOV"

  return {
    fromDayFull,
    fromTime,
    toDayFull,
    toTime,
    fromDay,
    fromMonth,
    toDay,
    toMonth,
  };

  /*
{
  fromDayFull: "Tuesday 29 Oct.",
  fromTime: "18:00 GMT",
  toDayFull: "Saturday 30 Nov.",
  toTime: "19:00 GMT",
  fromDay: "29",
  fromMonth: "OCT",
  toDay: "30",
  toMonth: "NOV"
}
*/
};

const CourseDetails = async ({ data }: { data: CourseTypes }) => {
  const supabase = await createClient();
  const { city, country } = extractCityAndCountry(data.location);
  const { id, title } = data;
  const {
    fromDay,
    fromTime,
    toDay,
    toTime,
    fromMonth,
    fromDayFull,
    toDayFull,
  } = formatDateRange(data.date.from, data.date.to);
  let images = JSON.parse(data.imageSrc);
  let isCreator = false;

  return (
    <div className="p-4 w-full gap-4 grid place-items-center min-h-52 rounded-[2px]">
      <div className="aspect-square w-full bg-background rounded-[2px]">
        <div className="w-full grid ">
          <Card className=" rounded-[2px] w-full  bg-background shadow-sm border-none  text-white">
            <CardContent className="p-3 md:flex gap-4">
              <div className="relative md:aspect-square h-96 max-h-full">
                <Image
                  className="object-cover"
                  fill
                  src={images[0] || "/courseimg/tavle.jpg"}
                  alt={"Course image"}
                />
              </div>

              <div>
                <CardTitle className="text-offblack my-4">{title}</CardTitle>

                {/* Info Div */}
                <div className="flex gap-3 mb-4 items-start">
                  <div className="bg-zinc-800 rounded-lg p-2 w-8 h-8 flex flex-col items-center justify-center">
                    <span className="text-[0.4rem] text-primary text-center bg-opacity-50 bg-zinc-400 w-8 rounded-t-lg  uppercase">
                      {fromMonth}
                    </span>

                    <span className="text-md">{fromDay}</span>
                  </div>
                  <div className="space-y-1 text-offblack flex flex-col">
                    <span>{fromDayFull}</span>
                    <span className="text-zinc-400 text-sm">
                      {fromDayFull == toDayFull
                        ? `${fromTime} - ${toTime}`
                        : `${fromTime} - ${toDayFull} ${toTime}`}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 items-start ">
                  <div className="bg-zinc-800 rounded-lg p-2 w-8 h-8 flex items-center justify-center">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div className="flex text-offblack flex-col">
                    <span>{city}</span>
                    <span className="text-zinc-400">{country}</span>
                    <p className="text-sm text-zinc-400 mt-2">
                      Adressen vises offentlig på arrangementsiden.
                    </p>
                  </div>
                </div>
                <div className="my-6 flex gap-6">
                  <CheckInGuestModal id={String(id)}>
                    Check in guests
                  </CheckInGuestModal>
                  <CheckInGuestModal id={String(id)}>
                    Edit Course
                  </CheckInGuestModal>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background text-offblack border-none">
            <CardContent>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Invitations</CardTitle>
                  {/* <Button size={"sm"} variant="outline" className="bg-zinc-800 col-start-3 border-zinc-700 hover:bg-zinc-700  place-self-end">
              Invite more people
            </Button> */}
                  <InviteButtonModal variant="grayDefault">
                    Invite more people
                  </InviteButtonModal>
                </div>
                <CardDescription>
                  These are the current invites that has been sent!
                </CardDescription>
              </CardHeader>
              <Invitations />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Invitations = () => {
  return (
    <Card className="my-4 shadow-md rounded-[2px]">
      <CardContent className="flex items-center gap-4 text-muted-foreground">
        <IoMdMailOpen className="w-12 h-12" />
        <div>
          <CardTitle className="text-xl">
            You haven't sent any invites
          </CardTitle>
          <CardDescription>
            You can send invites to friends, family and others you may think are
            interested in the course!
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};
