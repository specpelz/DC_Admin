import React from "react";

interface TextProps {
  text: string;
  color?: string;
  font?: string;
  className?: string;
}

const PText: React.FC<TextProps> = ({
  text,
  className = `text-Twelve md:text-Fourteen text-BrandTextColor`,
}) => {
  return <p className={className}>{text}</p>;
};

export default PText;
