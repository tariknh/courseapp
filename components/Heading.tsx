import React from "react";

interface HeadingProps {
  title: string;
  subTitle: string;
  className?: React.ComponentProps<"h1">["className"];
}

const Heading: React.FC<HeadingProps> = ({ title, subTitle, className }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1
        className={`
  ${className}
  text-xl
  font-bold
  `}
      >
        {title}
      </h1>
      <h2 className=" opacity-80">{subTitle}</h2>
    </div>
  );
};

export default Heading;
