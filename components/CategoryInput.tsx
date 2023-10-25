import Image from "next/image";
import React, { useState } from "react";
import { IconBase, IconType } from "react-icons";
import Heading from "./Heading";

interface CategoryProps {
  label: string;
  description: string;
  icon?: any;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryProps> = ({
  label,
  description,
  icon,
  selected,
  onClick,
}) => {
  return (
    <div
      className={`
      rounded-xl
      border-2
      p-4
      flex
      flex-col
      gap-3
     hover:border-neutral-600
      transition
      cursor-pointer
      ${selected ? "!border-black" : "border-neutral-200"}
      `}
      onClick={() => {
        onClick(label);
      }}
    >
      {icon}
      <div className="font-medium">{label}</div>
    </div>
  );
};

export default CategoryInput;
