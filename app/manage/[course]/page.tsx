import { Button } from "@/components/ui/button";
import {
  getCourseById,
  getOrdersByCourseId,
} from "@/lib/actions/course.actions";

import { MapPin, Plus } from "lucide-react";

type Props = {};

const tabs = [
  "Overview",
  "Guests",
  "Registration",
  "Invites",
  "Innsikt",
  "Mer",
];

const OrdersPage = async (params: any) => {
  const { searchParams } = params;

  const orders = await getOrdersByCourseId(searchParams.eventId);
  const course = await getCourseById(searchParams.eventId);
  const currentTab = searchParams.currentTab || "overview";

  return "/overview";
};

const CourseOverview = ({ course }: { course: any }) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-bold">When and where</h3>
      <div className="flex items-center gap-6">
        {/* <CalendarIcon size={45} /> */}
        <div className="h-fit max-w-[45px] rounded-xl overflow-hidden flex flex-col bg-white border-zinc-400 border">
          <span className="bg-zinc-300 text-zinc-500 text-xs px-3 py-1">
            SEP
          </span>
          <span className="text-center text-md font-medium">10</span>
        </div>
        <div className="flex basis-3/4 flex-col gap-1">
          <span className="font-bold">Tommorow</span>
          <span className="text-sm">22:30 - 23:30 GMT +1</span>
          <span className="opacity-70 text-sm">22:30 - 23:30 GMT +1</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <MapPin size={45} color="#d4d4d8 " className="scale-100" />
        <div className="flex basis-3/4 flex-col gap-1">
          <span className="font-bold">London</span>

          <span className="opacity-70 text-sm">UK</span>
        </div>
      </div>
      <div className="w-full gap-2 flex justify-evenly">
        <Button variant={"grayDefault"} className="w-full">
          Edit course
        </Button>
        <Button variant={"grayDefault"} className="w-full">
          Check in guests
        </Button>
      </div>
      <div className="flex justify-between align-middle items-baseline">
        <h3 className="text-xl font-bold">Invitations</h3>
        <Button size={"sm"} className="flex justify-between items-center gap-2">
          <Plus size={15} />
          Invite guests{" "}
        </Button>
      </div>
      <p>{course.data.description}</p>
    </div>
  );
};

export default OrdersPage;
