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
import { logout } from "@/app/login2/actions";

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

    uploadModal.onOpen();
  };

  return (
    <>
      <nav className="flex justify-between z-[3000] text-black fixed w-screen h-[10vh] ">
        <h1 className="mix-blend-difference text-white justify-self-start self-center z-50 p-6 text-3xl font-bold">
          <Link className="mix-blend-difference " href={"/"}>
            courseapp
          </Link>
        </h1>
        <div className="flex items-center">
          <h1 className="hidden md:flex p-6 text-xl align-baseline text-white font-bold  gap-4">
            <span className="cursor-pointer" onClick={onClick}>
              Create a listing
            </span>
            <Link href={"/login2"}>Log in</Link>
            <Link href={"/login2"}>Sign Up</Link>
            <span className="cursor-pointer" onClick={() => logout()}>
              Log out
            </span>
          </h1>
          <div className="justify-self-end" onClick={() => setOpen(!open)}>
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
