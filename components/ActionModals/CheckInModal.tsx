"use client";
import { AvatarIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
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

const CheckInGuestModal = ({ children }: { children: React.ReactNode }) => {
  const [invitees, setInvitees] = useState<InviteeProps[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  useEffect(() => {
    if (invitees.length < 1) {
      setCurrentStep(0);
    }
    return () => {};
  }, [invitees]);

  const titleSwitch = () => {
    switch (currentStep) {
      case 0:
        return "Check in guests";
      case 1:
        return "Customize your invite";
    }
  };
  const addUser = (currentUser: string | undefined) => {
    setInvitees([
      ...invitees,
      {
        id: uuidv4(),
        email: currentUser,
      },
    ]);
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-zinc-800 text-xs col-start-3 h-9 rounded-[2px] px-3 text-zinc-600 border-input bg-background bg-opacity-20 hover:text-accent-foreground border-zinc-700 hover:bg-zinc-700  place-self-end">
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{titleSwitch()}</DialogTitle>
          <DialogDescription>Choose the guests to check in!</DialogDescription>
        </DialogHeader>
        <GuestCheckInTable />
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
