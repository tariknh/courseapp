import { createClient } from "@/app/utils/supabase/client";
import { UserResponse } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CreateCourseButton from "./CreateCourseButton";
import { useUser } from "@/hooks/useUser";

type openStates = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ open, setOpen }: openStates) {
  const links = [
    {
      name: "about us",
      href: "/",
    },
    {
      name: "retailers",
      href: "/",
    },
    {
      name: "wholesale",
      href: "/",
    },
    {
      name: "faq",
      href: "/",
    },
    {
      name: "contact",
      href: "/",
    },
    {
      name: "login",
      href: "/",
    },
  ];
  const topMobile = {
    initial: {
      y: "-100vh",
      transition: {
        duration: 1,
        ease: [0.83, 0, 0.17, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  const bottomMobile = {
    initial: {
      y: "50vh",
      transition: {
        duration: 1,
        ease: [0.83, 0, 0.17, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  const staggerChildren = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.2,
        staggerDirection: 0.5,
      },
    },
  };

  const delayChildren = {
    initial: {
      transition: {
        staggerChildren: 0.09,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.2,
      },
    },
  };

  const up = {
    initial: {
      y: "10vh",
      transition: {
        duration: 1,
        ease: [0.83, 0, 0.17, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  const textAnimate = {
    initial: {
      x: "-60vw",
      transition: {
        duration: 1,
        ease: [0.83, 0, 0.17, 1],
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 1,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  const session = useUser()

  // const supabase =  createClient();
  // const { data: session, error: sessionError } =
  //    supabase.auth.getUser();

  // useEffect(() => {
  //   supabase.auth.getUser().then((session) => {
  //     // do something here with the session like  ex: setState(session)
  //     return setSession(session);
  //   });
  // }, []);

  return (
    <div className="z-[1000] fixed grid grid-rows-8 h-screen max-h-screen w-screen overflow-hidden">
      <motion.div
        initial="initial"
        animate="open"
        exit="initial"
        variants={topMobile}
        className="p-8 pt-24 flex flex-col justify-between bg-white row-span-5 rounded-b-3xl font-bold text-4xl sm:text-5xl font-sans text-black"
      >
        <motion.div className="flex gap-2 flex-col" variants={staggerChildren}>
          <motion.h1 variants={textAnimate}>
            <Link onClick={() => setOpen(!open)} href={"/courses"}>
              View courses
            </Link>
          </motion.h1>
          <motion.h1 onClick={() => setOpen(!open)} variants={textAnimate}>
            <CreateCourseButton session={session}></CreateCourseButton>
          </motion.h1>
          {session?.user && (
            <motion.h1 variants={textAnimate}>
              <Link onClick={() => setOpen(!open)} href={"/profile"}>
                My profile
              </Link>
            </motion.h1>
          )}
        </motion.div>
        <motion.div className="text-lg justify-end grid grid-cols-2">
          {links.map((value, key) => (
            <motion.h1 variants={textAnimate} className="" key={key}>
              {value.name}
            </motion.h1>
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        variants={bottomMobile}
        initial="initial"
        animate="open"
        exit="initial"
        className="bg-white row-span-3 p-8 rounded-t-3xl"
      >
        <motion.div
          variants={delayChildren}
          className="font-bold w-full gap-1 flex flex-col"
        >
          {session?.user ? (
            <div className="flex gap-2 flex-col max-w-fit">
              <motion.span className="text-center justify-self-center w-full text-xl">
                <Link onClick={() => setOpen(!open)} href={"/profile"}>
                  My profile
                </Link>
              </motion.span>
              <motion.button
                onClick={() => {
                  
                  setOpen(!open);
                }}
                className="px-8 py-4 text-xl border bg-black max-w-fit text-white p-8"
              >
                Log out
              </motion.button>
            </div>
          ) : (
            <>
              <motion.span variants={up} className="text-xl mb-4">
                Ready to get started?
              </motion.span>
              <motion.button
                variants={up}
                onClick={() => {
                  setOpen(!open);
                  //authModal.onOpen();
                }}
                className="px-8 py-4 text-xl border rounded-sm bg-black w-full text-white p-8"
              >
                <Link href="/login">Log in</Link>
              </motion.button>
              <motion.button
                variants={up}
                className="px-8 py-4 text-xl border rounded-sm bg-black w-full text-white p-8"
                onClick={() => {
                  setOpen(!open);
                  //authModal.onOpen();
                }}
              >
                <Link href="/login">Sign up</Link>
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Header;
