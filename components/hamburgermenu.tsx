"use client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Header from "./Header";
import styles from "./hamburger.module.css";

function Hamburger() {
  const [color, setColor] = useState("white");
  const [open, setOpen] = useState(false);

  open
    ? setTimeout(() => {
        setColor("black");
      }, 500)
    : setTimeout(() => {
        setColor("white");
      }, 500);

  let COLOR_VAR = color;

  return (
    <>
      <AnimatePresence>
        {open && <Header open={open} setOpen={setOpen} />}
      </AnimatePresence>
      <div
        onClick={() => setOpen(!open)}
        className={`${styles.container} absolute right-0 z-[50001] ${
          open && styles.active
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 200 200"
        >
          <g strokeWidth="6.5" strokeLinecap="round">
            <path
              d="M72 82.286h28.75"
              fill="#009100"
              fillRule="evenodd"
              stroke={color}
            />
            <path
              d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
              fill="none"
              stroke={color}
            />
            <path
              d="M72 125.143h28.75"
              fill="#009100"
              fillRule="evenodd"
              stroke={color}
            />
            <path
              d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
              fill="none"
              stroke={color}
            />
            <path
              d="M100.75 82.286h28.75"
              fill="#009100"
              fillRule="evenodd"
              stroke={color}
            />
            <path
              d="M100.75 125.143h28.75"
              fill="#009100"
              fillRule="evenodd"
              stroke={color}
            />
          </g>
        </svg>
      </div>
    </>
  );
}

export default Hamburger;
