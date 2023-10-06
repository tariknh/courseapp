"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { AnimatePresence } from "framer-motion";
import Hamburger from "./hamburgermenu";

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    open
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");

    return () => {};
  }, [open]);
  return (
    <>
      <div className="z-50 flex justify-end" onClick={() => setOpen(!open)}>
        <Hamburger open={open} setOpen={setOpen} />
      </div>
      <AnimatePresence>
        {open && <Header open={open} setOpen={setOpen} />}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
