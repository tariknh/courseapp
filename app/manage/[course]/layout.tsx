// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <main className="overflow-hidden h-screen flex justify-between flex-col">
//         <div className="pt-[10vh]">

//         {children}
//         </div>
//         <Footer />

//         </main>

//     </>
//   );
// }

import CheckInGuestModal from "@/components/ActionModals/CheckInModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getCourseById,
  getOrdersByCourseId,
} from "@/lib/actions/course.actions";

import { MapPin, Plus } from "lucide-react";
import Link from "next/link";

type Props = {};

const tabs = ["Overview", "Guests", "Registration", "Invites"];

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ course: any }>;
}) {
  const courseId = (await params).course;

  const orders = await getOrdersByCourseId(courseId);
  const course = await getCourseById(courseId);
  const currentTab = (await courseId.currentTab) || "overview";

  return (
    <div className="pt-[10vh]">
      <div className="p-4 font-bold bg-accent text-white text-xl">
        <h2>
          Orders for <span className="text-offblack">{course.data.title}</span>
        </h2>
      </div>
      {/* Tabs */}
      <div className="px-6 border-b border-slate-400">
        <Tabs defaultValue="overview" className="w-full overflow-auto">
          <TabsList className="bg-transparent  w-full justify-start h-auto p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="px-4 py-2 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none text-slate-400 "
              >
                <Link href={`/manage/${courseId}/${tab.toLowerCase()}`}>
                  {tab}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="bg-zinc-100">{children}</div>
    </div>
  );
}

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

        <CheckInGuestModal>Check in guests</CheckInGuestModal>
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
