"use client";
import React, { useState } from "react";

import { CheckSquare } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

type InviteeProps = {
  id: string;
  email: string | undefined;
};

type ShareModalVariants = "action" | "grayDefault";

const ShareCourseModal = ({
  children,
  variant,
  courseSlug,
}: {
  children: React.ReactNode;
  variant: ShareModalVariants;
  courseSlug: string;
}) => {
  const [invitees, setInvitees] = useState<InviteeProps[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [currentText, setCurrentText] = useState<string>(
    `${"course.app/" + courseSlug}`
  );
  const searchParams = useSearchParams();
  console.log(searchParams, "SEARCHPARAMS");

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => setIsCopied(false)}
        className={buttonVariants({ variant: variant })}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Share the course</DialogTitle>
          <DialogDescription>
            Copy the link below so you can share!
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 justify-between flex-shrink max-w-xl">
          <Input
            className="hover:cursor-pointer text-zinc-500"
            readOnly
            value={currentText}
            onClick={async () => {
              navigator.clipboard.writeText(currentText);
              setIsCopied(true);
            }}
          />
          <Button
            variant={"default"}
            onClick={async () => {
              navigator.clipboard.writeText(currentText);
              setIsCopied(true);
            }}
          >
            {isCopied == true ? "Copied!" : "Copy"}
            {isCopied && <CheckSquare className="ml-2" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareCourseModal;
