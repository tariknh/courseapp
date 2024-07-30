import React, { ReactElement } from "react";

import { LuChefHat } from "react-icons/lu";
import { MdLanguage, MdSportsMartialArts } from "react-icons/md";
import { PiPaintBrushBold } from "react-icons/pi";
import { FaMusic, FaDigitalTachograph, FaLightbulb } from "react-icons/fa";
import { GrYoga } from "react-icons/gr";
import {
  FaUtensils,
  FaHeartbeat,
  FaPaintBrush,
  FaLaptopCode,
  FaUserTie,
  FaChartLine,
  FaLanguage,
  FaHome,
  FaLeaf,
  FaGamepad,
  FaBrain,
  FaTshirt,
  FaFilm,
  FaChild,
  FaTools,
} from "react-icons/fa";

export type Categories = {
  id: number;
  name: string;
  imageSrc: string;
  icon: ReactElement;
};

export const newCategories: Categories[] = [
  {
    id: 1,
    name: "Culinary Arts",
    imageSrc: "culinary_arts.jpg",
    icon: <FaUtensils />,
  },
  {
    id: 2,
    name: "Health and Wellness",
    imageSrc: "health_wellness.jpg",
    icon: <FaHeartbeat />,
  },
  {
    id: 3,
    name: "Creative Arts",
    imageSrc: "art.jpg",
    icon: <FaPaintBrush />,
  },
  {
    id: 4,
    name: "Technology and IT",
    imageSrc: "technology_it.jpg",
    icon: <FaLaptopCode />,
  },
  {
    id: 5,
    name: "Personal Development",
    imageSrc: "personal_development.jpg",
    icon: <FaUserTie />,
  },
  {
    id: 6,
    name: "Business and Finance",
    imageSrc: "business_finance.jpg",
    icon: <FaChartLine />,
  },
  {
    id: 7,
    name: "Languages and Culture",
    imageSrc: "languages_culture.jpg",
    icon: <FaLanguage />,
  },
  {
    id: 8,
    name: "DIY and Home Improvement",
    imageSrc: "diy_home_improvement.jpg",
    icon: <FaHome />,
  },
  {
    id: 9,
    name: "Science and Nature",
    imageSrc: "science_nature.jpg",
    icon: <FaLeaf />,
  },
  {
    id: 10,
    name: "Hobbies and Recreation",
    imageSrc: "hobbies_recreation.jpg",
    icon: <FaGamepad />,
  },
  {
    id: 11,
    name: "Social Sciences",
    imageSrc: "social_sciences.jpg",
    icon: <FaBrain />,
  },
  {
    id: 12,
    name: "Fashion and Beauty",
    imageSrc: "fashion_beauty.jpg",
    icon: <FaTshirt />,
  },
  {
    id: 13,
    name: "Entertainment",
    imageSrc: "entertainment.jpg",
    icon: <FaFilm />,
  },
  {
    id: 14,
    name: "Parenting and Family",
    imageSrc: "parenting_family.jpg",
    icon: <FaChild />,
  },
  {
    id: 15,
    name: "Professional Skills",
    imageSrc: "professional_skills.jpg",
    icon: <FaTools />,
  },
];

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
