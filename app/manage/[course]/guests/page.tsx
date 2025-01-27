import ScrollAbleActions from "@/components/ScrollableActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourseById } from "@/lib/actions/course.actions";
import { CourseTypes } from "@/types";

export default async function Page({
  params,
}: {
  params: Promise<{ course: number }>;
}) {
  const courseId = (await params).course;
  const { data } = await getCourseById(courseId); // Extract 'data'

  const course = data as CourseTypes | null; // Explicitly assert the type

  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <div className="p-4 w-full max-w-5xl mx-auto gap-4 grid place-items-center min-h-52 rounded-[2px]">
      <Card className=" bg-background text-offblack border-none w-full">
        <CardContent>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Current guests</CardTitle>
              {/* <Button size={"sm"} variant="outline" className="bg-zinc-800 col-start-3 border-zinc-700 hover:bg-zinc-700  place-self-end">
              Invite more people
            </Button> */}
            </div>
          </CardHeader>
          <div className="my-4 text-xl text-zinc-400">
            2 / {Number(course.capacity)} guests
          </div>
          <ProgressBar guests={2} capacity={Number(course.capacity)} />
          <ScrollAbleActions />
        </CardContent>
      </Card>
    </div>
  );
}

const ProgressBar = ({
  guests,
  capacity,
}: {
  guests?: number;
  capacity: number;
}) => {
  const maxCapacity = 100;

  return (
    <div className="flex flex-col justify-center">
      <GuestProgressBar
        currentGuests={guests}
        maxCapacity={capacity}
        className="mb-6"
      />
    </div>
  );
};

interface GuestProgressBarProps {
  currentGuests?: number;
  maxCapacity: number;
  className?: string;
}

const GuestProgressBar: React.FC<GuestProgressBarProps> = ({
  currentGuests = 0,
  maxCapacity,
  className = "",
}) => {
  const percentage = Math.min((currentGuests / maxCapacity) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={currentGuests}
          aria-valuemin={0}
          aria-valuemax={maxCapacity}
        ></div>
      </div>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {percentage.toFixed(1)}% full
      </p>
    </div>
  );
};
