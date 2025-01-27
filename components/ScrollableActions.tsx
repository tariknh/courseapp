import { Button } from "@/components/ui/button";
import { FaShare } from "react-icons/fa";

const ScrollAbleActions = async () => {
  return (
    <div className="overflow-auto flex justify-evenly gap-2 pt-4 px-4 w-full">
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

export default ScrollAbleActions;
