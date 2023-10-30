import React from "react";

import { LuChefHat } from "react-icons/lu";
import { MdLanguage, MdSportsMartialArts } from "react-icons/md";
import { PiPaintBrushBold } from "react-icons/pi";
import { FaMusic, FaDigitalTachograph, FaLightbulb } from "react-icons/fa";
import { GrYoga } from "react-icons/gr";

export const categories = [
  {
    label: "Cooking",
    icon: LuChefHat,
    description: "Explore a variety of culinary techniques and cuisines.",
  },
  {
    label: "Martial Arts",
    icon: MdSportsMartialArts,
    description: "Learn self-defense and discipline through martial arts.",
  },
  {
    label: "Languages",
    icon: MdLanguage,
    description: "Expand your communication skills with new languages.",
  },
  {
    label: "Art and Design",
    icon: PiPaintBrushBold,
    description: "Unleash your creativity through painting and design.",
  },
  {
    label: "Music",
    icon: FaMusic,
    description: "Discover the joy of music through instruments and voice.",
  },
  {
    label: "Digital Technology",
    icon: FaDigitalTachograph,
    description:
      "Stay ahead with courses on coding, design, and digital tools.",
  },
  {
    label: "Wellness",
    icon: GrYoga,
    description:
      "Enhance your well-being with yoga, meditation, and fitness courses.",
  },
  {
    label: "Entrepreneurship",
    icon: FaLightbulb,
    description:
      "Harness your business ideas with foundational and advanced entrepreneurship courses.",
  },
];
