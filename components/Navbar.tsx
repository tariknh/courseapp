"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { AnimatePresence } from "framer-motion";
import Hamburger from "./hamburgermenu";
import DesktopNav from "./DesktopNav";
import Link from "next/link";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useCourseModal";
import { usePathname, useRouter } from "next/navigation";

function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    open
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");

    return () => {};
  }, [open]);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    if (typeof window !== "undefined") {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => {
      // remove event listener when the component is unmounted to not cause any memory leaks
      // otherwise the event listener will continue to be active
      window.removeEventListener("resize", handleResize);
    };
    // add `isMobile` state variable as a dependency so that
    // it is called every time the window is resized
  }, [isMobile]);

  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const router = useRouter();

  const onClick = () => {
    if (pathname !== "/courses") {
      router.push("/courses");
      console.log("not courses");
    }
    if (!user) {
      return authModal.onOpen();
    }
    uploadModal.onOpen();
  };

  return (
    <>
      <nav className="flex justify-between text-black fixed z-50 w-screen h-[12vh]">
        <h1 className=" bg-blend-overlay text-white justify-self-start self-center z-50 p-6 text-3xl font-bold">
          <Link className=" " href={"/"}>
            courseapp
          </Link>
        </h1>
        <div className="flex items-center">
          <h1 className="hidden md:block p-6 text-xl align-baseline text-white font-bold">
            <span className="cursor-pointer" onClick={onClick}>
              List your course
            </span>
          </h1>
          <div className="justify-self-end z-50" onClick={() => setOpen(!open)}>
            <Hamburger open={open} setOpen={setOpen} />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && <Header open={open} setOpen={setOpen} />}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
