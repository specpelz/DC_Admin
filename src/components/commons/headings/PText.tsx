import React from "react";

interface TextProps {
  text: string;
  color?: string;
  font?: string;
  className?: string;
}

const PText: React.FC<TextProps> = ({
  text,
  className = `text-[1.2rem] md:text-[1.4rem] text-BrandText`,
}) => {
  return <p className={className}>{text}</p>;
};

export default PText;
