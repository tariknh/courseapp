"use client";
import AuthModal from "@/components/AuthModal";
import CourseModal from "@/components/CourseModal";
import React, { useEffect, useState } from "react";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <CourseModal />
    </>
  );
}

export default ModalProvider;
