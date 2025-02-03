"use client";
import { AvatarIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { GuestCheckInTable } from "./GuestCheckInTable";

type InviteeProps = {
  id: string;
  email: string | undefined;
};

const CheckInGuestModal = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "grayDefault" })}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Check in guests!</DialogTitle>
          <DialogDescription>Choose the guests to check in!</DialogDescription>
        </DialogHeader>
        <GuestCheckInTable id={id} />
      </DialogContent>
    </Dialog>
  );
};

const InvitingUser = ({
  invitee,
  setInvitees,
  invitees,
  size,
}: {
  invitee: InviteeProps;
  setInvitees: any;
  invitees: InviteeProps[];
  size: string;
}) => {
  const removeUser = () => {
    setInvitees((invitees: InviteeProps[]) => {
      return invitees.filter((item: InviteeProps) => item.id !== invitee.id);
    });
  };
  return (
    <div className="p-2 flex items-center gap-2">
      <div
        className={`${
          size == "small" ? "p-1" : "p-2"
        } rounded-full bg-zinc-200`}
      >
        <AvatarIcon className={`${size == "small" ? "h-4 w-4" : "h-6 w-6"}`} />
      </div>
      <span className={`${size == "small" ? "text-xs" : ""}`}>
        {invitee.email}
      </span>
      <Button className=" ml-auto" variant="outline" size="icon">
        <TrashIcon onClick={() => removeUser()} />
      </Button>
    </div>
  );
};

export default CheckInGuestModal;
