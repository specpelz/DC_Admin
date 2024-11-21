import React, { ReactNode } from "react";

interface InputWithIconProps {
  icon: ReactNode;
  iconPosition?: "left" | "right";
  placeholder: string;
  className?: string;
}

const Input: React.FC<InputWithIconProps> = ({
  icon,
  iconPosition = "left",
  placeholder,
  className
}) => {
  return (
    <div className={`flex space-x-3 items-center px-[1.9rem] py-[1.3rem]  w-full ${className}`}>
      {iconPosition === "left" && <div className="">{icon}</div>}
      <input
        type="text"
        className="text-[#000] bg-BrandLightGray text-Sixteen outline-none w-[100%]"
        placeholder={placeholder}
      />
      {iconPosition === "right" && <div className="">{icon}</div>}
    </div>
  );
};

export default Input;
