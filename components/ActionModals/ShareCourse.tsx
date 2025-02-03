"use client";
import React, { useState } from "react";

import { CourseTypes } from "@/types";
import { CheckSquare } from "lucide-react";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { LuMessageSquareShare } from "react-icons/lu";
import { MdOutlineEmail, MdOutlineIosShare } from "react-icons/md";
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
  courseData,
}: {
  children: React.ReactNode;
  variant: ShareModalVariants;
  courseSlug: string;
  courseData: CourseTypes | undefined;
}) => {
  const [invitees, setInvitees] = useState<InviteeProps[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [currentText, setCurrentText] = useState<string>(
    `${"course.app/" + courseData?.id}`
  );

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
        <section className="flex gap-4 flex-wrap">
          <SocialShareIcon
            shareAbleLink={currentText}
            caption="Share"
            title={courseData?.title}
            type="facebook"
          />
          <SocialShareIcon
            shareAbleLink={currentText}
            caption="Tweet"
            title={courseData?.title}
            type="x"
          />

          <SocialShareIcon
            shareAbleLink={currentText}
            title={courseData?.title}
            caption="Mail"
            type="mail"
          />
          <SocialShareIcon
            caption="Share"
            shareAbleLink={currentText}
            title={courseData?.title}
            type="device"
          />
          <SocialShareIcon
            shareAbleLink={currentText}
            title={courseData?.title}
            caption="Text"
            type="text"
          />
        </section>
      </DialogContent>
    </Dialog>
  );
};

interface Sharetypes {
  type: "facebook" | "x" | "mail" | "device" | "text";
  shareAbleLink?: any;
  caption: string;
  title?: any;
}

const SocialShareIcon = ({
  type,
  shareAbleLink,
  caption,
  title,
}: Sharetypes) => {
  const handleShare = (type: Sharetypes["type"]) => {
    switch (type) {
      case "device":
        navigator.share({
          title: title || "Check out this course!",
          text: "Join me on this course!",
          url: shareAbleLink,
        });
      case "facebook":
    }
  };

  const shareLinks = (title: string, shareUrl: string) => ({
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      "Check out the course i want you to attend! " + title
    )}&url=${encodeURIComponent(shareUrl)}`,
    mail: `mailto:?subject=${encodeURIComponent(
      "Check this out!"
    )}&body=${encodeURIComponent(title + " " + shareUrl)}`,
    text: `sms:?&body=${encodeURIComponent(title + " " + shareUrl)}`,
  });

  const shareLink = shareLinks(title, shareAbleLink);

  return (
    <Link
      onClick={() => handleShare(type)}
      className=" p-3 rounded-md cursor-pointer  hover:scale-105 transition-all"
      href={type !== "device" ? shareLink[type] : "#"}
      target="_blank"
      rel="noopener noreferrer"
    >
      {type == "facebook" && <FaFacebook color="#a1a1aa" size={50} />}
      {type == "x" && <FaSquareXTwitter color="#a1a1aa" size={50} />}
      {type == "mail" && <MdOutlineEmail color="#a1a1aa" size={50} />}
      {type == "device" && <MdOutlineIosShare color="#a1a1aa" size={50} />}
      {type == "text" && <LuMessageSquareShare color="#a1a1aa" size={50} />}
      <p className="text-center text-xxs text-zinc-400 ">{caption}</p>
    </Link>
  );
};

export default ShareCourseModal;
