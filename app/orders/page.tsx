import { TableDemo } from "@/components/Table";
import { Button } from "@/components/ui/button";
import {
  getCourseById,
  getOrdersByCourseId,
} from "@/lib/actions/course.actions";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import { MapPin, Plus } from "lucide-react";

type Props = {};

const OrdersPage = async (params: any) => {
  const { searchParams } = params;
  //console.log(searchParams.eventId, "searchParams");
  const orders = await getOrdersByCourseId(searchParams.eventId);
  const course = await getCourseById(searchParams.eventId);

  //console.log(orders, "orders");
  return (
    <div className="pt-[10vh]">
      <div className="p-4 font-bold bg-accent text-white text-xl">
        <h2>
          Orders for <span className="text-offblack">{course.data.title}</span>
        </h2>
      </div>
      <Tabs className="h-fit" aria-label="Basic tabs" defaultValue={0}>
        <TabList>
          <Tab className="p-4">Overview</Tab>
          <Tab className="p-4">Guests</Tab>
          <Tab className="p-4">Registration</Tab>
        </TabList>
        <TabPanel value={0}>
          <CourseOverview course={course} />
        </TabPanel>
        <TabPanel value={1}>
          <TableDemo orders={orders} />
        </TabPanel>
        <TabPanel value={2}>
          <b>Third</b> tab panel
        </TabPanel>
      </Tabs>
    </div>
  );
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
        <Button size={"sm"} className="w-full">
          Edit course
        </Button>
        <Button size={"sm"} className="w-full">
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
