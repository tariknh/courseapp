"use client";
import React, { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { motion, stagger } from "framer-motion";
import Hamburger from "./hamburgermenu";

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

  /*
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      if (!open) {
        if (tl.reversed()) {
          tl.play();
        } else {
          tl.reverse();
        }
      }
      tl.from(".topbar", {
        y: -300,
        autoAlpha: 0,
        duration: 1,
      });
      tl.from(
        ".bottombar",
        {
          y: 300,
          autoAlpha: 0,
          duration: 1,
        },
        "<"
      );
    });

    return () => ctx.revert();
  }, [open]);
  */
  return (
    <div className="absolute grid grid-rows-8 h-screen max-h-screen w-screen overflow-hidden z-20">
      <motion.div
        initial="initial"
        animate="open"
        exit="initial"
        variants={topMobile}
        className="p-8 pt-24 flex flex-col justify-between bg-white row-span-6 rounded-b-3xl font-bold text-5xl font-sans text-black"
      >
        <motion.div variants={staggerChildren}>
          <motion.h1 variants={textAnimate}>products</motion.h1>
          <motion.h1 variants={textAnimate}>explore</motion.h1>
          <motion.h1 variants={textAnimate}>community</motion.h1>
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
        className="bg-white row-span-1 p-8 rounded-t-3xl"
      >
        <motion.div
          variants={delayChildren}
          className="font-bold max-w-[15rem] gap-5 flex flex-col"
        >
          <motion.span variants={up} className="text-xl">
            Subscribe and never miss Mate Libre again
          </motion.span>
          <motion.button
            variants={up}
            onClick={() => setOpen(!open)}
            className="px-8 py-4 text-xl border rounded-full bg-black max-w-fit text-white p-8"
          >
            build your box
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Header;
