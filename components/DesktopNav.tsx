"use client";
import React, { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { motion, stagger } from "framer-motion";
import Hamburger from "./hamburgermenu";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DesktopNav = () => {
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };
  return (
    <nav className="fixed h-[7%] z-50 text-white w-full flex justify-between">
      <div>
        <h1></h1>
      </div>
      <div></div>
    </nav>
  );
};

export default DesktopNav;
