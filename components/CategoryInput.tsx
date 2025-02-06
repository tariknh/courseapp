import React from "react";

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
      rounded-[2px]
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
