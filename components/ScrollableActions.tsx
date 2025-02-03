"use client";
import { Button } from "@/components/ui/button";
import { CourseTypes } from "@/types";
import { FaShare } from "react-icons/fa";
import InviteButtonModal from "./ActionModals/InviteButtonModal";
import ShareCourseModal from "./ActionModals/ShareCourse";

const ScrollAbleActions = ({ data }: { data: CourseTypes }) => {
  const slug = "71";
  return (
    <div className="overflow-auto flex justify-evenly gap-2 pt-4 px-4 w-full">
      <ActionComponent type="invite" />
      <ActionComponent type="announcement" />
      <ActionComponent slug={slug} type="share" />
    </div>
  );
};

type ActionVariants = "invite" | "announcement" | "share";

const ActionComponent = ({
  type,
  onClick,
  slug,
}: {
  type: ActionVariants;
  onClick?: (e: any) => void;
  slug?: string;
}) => {
  if (type == "invite") {
    return (
      <InviteButtonModal>
        <div className="bg-[#ef233c] rounded-[2px] p-2 bg-opacity-15">
          <FaShare className=" opacity-80" color="#ef233c" />
        </div>
        Send an invite
      </InviteButtonModal>
    );
  }
  if (type == "announcement") {
    return (
      <Button
        onClick={onClick}
        name="announcement"
        className=" border-[#23dbef]"
        size={"wide"}
        variant={"action"}
      >
        <div className="bg-[#23dbef] rounded-[2px] p-2 bg-opacity-15">
          <FaShare className=" opacity-80" color="#23dbef" />
        </div>
        Create an announcement
      </Button>
    );
  }
  if (type == "share") {
    return (
      <ShareCourseModal courseSlug={`${slug}`} variant="action">
        <div className="bg-[#4D5DEF] rounded-[2px] p-2 bg-opacity-15">
          <FaShare className=" opacity-80" color="#4D5DEF" />
        </div>
        Share the course
      </ShareCourseModal>
    );
  }
};

export default ScrollAbleActions;
