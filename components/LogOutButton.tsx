"use client";
import { logout } from "@/app/login/actions";
import { toast } from "sonner";
import { Button } from "./ui/button";

const LogOutButton = () => {
  return (
    <Button
      variant={"category"}
      className="font-bold text-lg"
      onClick={() => {
        logout();
        toast.success("Logged out successfully");
      }}
    >
      Log Out
    </Button>
  );
};

export default LogOutButton;
