import InviteButtonModal from "@/components/InviteButtonModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { FaShare } from "react-icons/fa";
import { IoMdMailOpen } from "react-icons/io";

export default async function Page({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const slug = (await params).course;
  return (
    <div className="bg-zinc-100 min-h-screen max-w-4xl mx-auto">
      <ScrollAbleActions />
      <CourseDetails parameters={params} />
    </div>
  );
}

const CourseDetails = ({ parameters }: any) => {
  return (
    <div className="p-4 w-full gap-4 grid place-items-center min-h-52 rounded-[2px]">
      <div className="aspect-square w-full bg-background rounded-[2px]">
        <div className="dark w-full grid ">
          <Card className=" rounded-[2px] w-full  bg-primary shadow-sm border-none  text-white">
            <CardContent className="p-3 md:flex gap-4">
              {/* <div className="aspect-square shadow-md p-2 grid-cols-5 grid-rows-9 gap-2 grid w-full bg-primary rounded-[2px]">
            <div className="relative col-start-1 col-span-2 row-span-4 overflow-hidden rounded-[2px]">
              <Image className="object-cover" fill src="/courseimg/art.jpg" alt={"Course Image"}/>
            </div>
            <h2 className="text-xl row-start-1 col-start-3 text-offblack font-semibold col-span-full ">Course Title</h2>

            <div className="col-span-2 space-y-2">

            
            <div className="flex gap-2">
              <div className="border-[1px] scale-75 border-opacity-50 border-zinc-400 rounded-lg p-2 w-8 h-8 flex flex-col items-center justify-center">
                <span className="text-[0.5rem] text-primary text-center bg-opacity-50 bg-zinc-400 w-8 rounded-t-lg  uppercase">DES</span>
                <span className="text-sm text-zinc-400">26</span>
              </div>
              <div className=" flex flex-col">
                <span className="text-offblack space-y-[1px] text-xs font-semibold">Torsdag 26. des.</span>
                <span className="text-zinc-400 text-[0.5rem]">18:00 - 29. des., 19:00 GMT</span>
              </div>
            </div>
            <div className="flex gap-2">
            <div className="border-[1px] scale-75 border-opacity-50 border-zinc-400 rounded-lg p-2 w-8 h-8 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-zinc-400" />
              </div>
              <div className="flex space-y-[1px] flex-col">
                <span className="text-offblack text-xs font-semibold">London</span>
                <span className="text-zinc-400 text-[0.5rem]">London, England</span>
                <p className="text-[0.5rem] text-zinc-400">
                  Address shown on course page
                </p>
              </div>
            </div>
            </div>
           
          </div>  */}
              <div className="relative md:aspect-square h-60">
                <Image
                  className="object-cover"
                  fill
                  src="/courseimg/art.jpg"
                  alt={"Course Image"}
                />
              </div>

              <div>
                <CardTitle className="text-offblack my-4">
                  When and where
                </CardTitle>

                {/* Info Div */}
                <div className="flex gap-3 mb-4 items-start">
                  <div className="bg-zinc-800 rounded-lg p-2 w-8 h-8 flex flex-col items-center justify-center">
                    <span className="text-[0.4rem] text-primary text-center bg-opacity-50 bg-zinc-400 w-8 rounded-t-lg  uppercase">
                      DES
                    </span>

                    <span className="text-md">26</span>
                  </div>
                  <div className="space-y-1 text-offblack flex flex-col">
                    <span>torsdag 26. des.</span>
                    <span className="text-zinc-400 text-sm">
                      18:00 - 29. des., 19:00 GMT
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 items-start ">
                  <div className="bg-zinc-800 rounded-lg p-2 w-8 h-8 flex items-center justify-center">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div className="flex text-offblack flex-col">
                    <span>London</span>
                    <span className="text-zinc-400">UK</span>
                    <p className="text-sm text-zinc-400 mt-2">
                      Adressen vises offentlig på arrangementsiden.
                    </p>
                  </div>
                </div>
                <div className="my-6 flex gap-6">
                  <button className="bg-zinc-800 flex-auto text-xs text-nowrap col-start-3 h-9 rounded-[2px] px-3 text-zinc-600 border-input bg-background bg-opacity-20 hover:text-accent-foreground border-zinc-700 hover:bg-zinc-700  place-self-end">
                    Check in guests
                  </button>
                  <button className="bg-zinc-800 text-xs flex-auto text-nowrap col-start-3 h-9 rounded-[2px] px-3 text-zinc-600 border-input bg-background bg-opacity-20 hover:text-accent-foreground border-zinc-700 hover:bg-zinc-700  place-self-end">
                    Edit course
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary text-offblack border-none">
            <CardContent>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Invitations</CardTitle>
                  {/* <Button size={"sm"} variant="outline" className="bg-zinc-800 col-start-3 border-zinc-700 hover:bg-zinc-700  place-self-end">
              Invite more people
            </Button> */}
                  <InviteButtonModal>Invite more people</InviteButtonModal>
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

const ScrollAbleActions = () => {
  return (
    <div className="overflow-scroll flex justify-evenly gap-2 pt-4 px-4 w-full">
      <ActionComponent type="invite" />
      <ActionComponent type="announcement" />
      <ActionComponent type="share" />
    </div>
  );
};

type ActionVariants = "invite" | "announcement" | "share";

const ActionComponent = ({ type }: { type: ActionVariants }) => {
  if (type == "invite") {
    return (
      <Button className=" border-[#ef233c]" size={"wide"} variant={"action"}>
        <div className="bg-[#ef233c] rounded-[2px] p-2 bg-opacity-15">
          <FaShare className=" opacity-80" color="#ef233c" />
        </div>
        Send an invite
      </Button>
    );
  }
  if (type == "announcement") {
    return (
      <Button className=" border-[#23dbef]" size={"wide"} variant={"action"}>
        <div className="bg-[#23dbef] rounded-[2px] p-2 bg-opacity-15">
          <FaShare className=" opacity-80" color="#23dbef" />
        </div>
        Create an announcement
      </Button>
    );
  }
  if (type == "share") {
    return (
      <Button className=" border-[#4D5DEF]" size={"wide"} variant={"action"}>
        <div className="bg-[#4D5DEF] rounded-[2px] p-2 bg-opacity-15">
          <FaShare className=" opacity-80" color="#4D5DEF" />
        </div>
        Share the course
      </Button>
    );
  }
};
