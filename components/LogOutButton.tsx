"use client";
import React from "react";
import { Button } from "./ui/button";
import { logout } from "@/app/login2/actions";
import { toast } from "sonner";

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
