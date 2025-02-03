"use client";
import { buttonVariants } from "@/components/ui/button";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Divider } from "antd";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type InviteeProps = {
  id: string;
  email: string | undefined;
};

const InviteButtonModal = ({ children }: { children: React.ReactNode }) => {
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
        return "Invite more people";
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
      <DialogTrigger className={buttonVariants({ variant: "action" })}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{titleSwitch()}</DialogTitle>
          <DialogDescription>
            Invite one or more to your course!
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addUser(currentUser);
          }}
        >
          {currentStep == 0 && (
            <>
              <Input
                type="email"
                value={currentUser}
                onChange={(e) => setCurrentUser(e.target.value)}
                placeholder="Type an email..."
              />
              <Button
                type="submit"
                size={"default"}
                variant="outline"
                className="bg-zinc-800 col-start-3 border-zinc-700 hover:text-white hover:bg-zinc-700  place-self-end"
              >
                Add
              </Button>
            </>
          )}

          {currentStep == 1 && (
            <>
              <div className="flex flex-col w-full">
                <Textarea placeholder="Write an invitation message..." />
                <Divider />
                <h2 className="text-xxs text-muted-foreground">
                  Sending invitation to:
                </h2>
                {invitees.map((user, key) => {
                  return (
                    <InvitingUser
                      size="small"
                      setInvitees={setInvitees}
                      invitees={invitees}
                      key={key}
                      invitee={user}
                    />
                  );
                })}
              </div>
            </>
          )}
        </form>

        {currentStep == 0 &&
          invitees.map((user, key) => {
            return (
              <InvitingUser
                size="default"
                setInvitees={setInvitees}
                invitees={invitees}
                key={key}
                invitee={user}
              />
            );
          })}
        <div className="flex justify-between w-full">
          <Button
            disabled={invitees.length < 1}
            onClick={() => {
              if (currentStep != 0) {
                setCurrentStep(currentStep - 1);
              }
            }}
            className={`${
              currentStep < 1 && " hidden"
            } bg-zinc-800  border-zinc-700 hover:bg-zinc-700 hover:text-white`}
            variant="outline"
            size="default"
          >
            <ChevronLeftIcon className="h-4 w-4 " />
            Previous
          </Button>
          <Button
            disabled={invitees.length < 1}
            onClick={() => {
              if (currentStep != 1) {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="ml-auto bg-zinc-800  border-zinc-700 hover:bg-zinc-700 hover:text-white"
            variant="outline"
            size="default"
          >
            {currentStep == 0 && "Next"}
            {currentStep == 1 && "Send invitations"}
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
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

export default InviteButtonModal;
