"use client";
import { CourseTypes } from "@/types";
import { FaShare } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdAnnouncement } from "react-icons/md";
import InviteButtonModal from "./ActionModals/InviteButtonModal";
import ShareCourseModal from "./ActionModals/ShareCourse";

const ScrollAbleActions = ({ data }: { data: CourseTypes }) => {
  const slug = "71";
  return (
    <div className="overflow-auto flex justify-evenly gap-2 pt-4 px-4 w-full">
      <ActionComponent type="invite" />
      <ActionComponent type="announcement" />
      <ActionComponent courseData={data} slug={slug} type="share" />
    </div>
  );
};

type ActionVariants = "invite" | "announcement" | "share";

const ActionComponent = ({
  type,
  onClick,
  slug,
  courseData,
}: {
  type: ActionVariants;
  onClick?: (e: any) => void;
  slug?: string;
  courseData?: CourseTypes;
}) => {
  if (type == "invite") {
    return (
      <InviteButtonModal>
        <div className="bg-[#ef233c] rounded-[2px] p-1 bg-opacity-15">
          <IoIosMail size={30} className=" opacity-80" color="#ef233c" />
        </div>
        Send an invite
      </InviteButtonModal>
    );
  }
  if (type == "announcement") {
    return (
      <ShareCourseModal
        courseData={courseData}
        courseSlug={`${slug}`}
        variant="action"
      >
        <div className="bg-[#23dbef] rounded-[2px] p-1 bg-opacity-15">
          <MdAnnouncement size={30} className=" opacity-80" color="#23dbef" />
        </div>
        Create an announcement
      </ShareCourseModal>
    );
  }
  if (type == "share") {
    return (
      <ShareCourseModal
        courseData={courseData}
        courseSlug={`${slug}`}
        variant="action"
      >
        <div className="bg-[#4D5DEF] rounded-[2px] p-1 bg-opacity-15">
          <FaShare size={30} className=" opacity-80" color="#4D5DEF" />
        </div>
        Share the course
      </ShareCourseModal>
    );
  }
};

export default ScrollAbleActions;
