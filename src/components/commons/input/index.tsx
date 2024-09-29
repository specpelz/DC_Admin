import React, { ReactNode } from "react";

interface InputWithIconProps {
  icon: ReactNode;
  iconPosition?: "left" | "right";
  placeholder: string;
}

const Input: React.FC<InputWithIconProps> = ({
  icon,
  iconPosition = "left",
  placeholder,
}) => {
  return (
    <div className="flex space-x-3 items-center border px-[1.9rem] py-[1.3rem] rounded-[0.8rem] shadow-md shadow-BrandBg w-full">
      {iconPosition === "left" && <div className="">{icon}</div>}
      <input
        type="text"
        className="text-[#000] text-[1.6rem] outline-none w-[100%]"
        placeholder={placeholder}
      />
      {iconPosition === "right" && <div className="">{icon}</div>}
    </div>
  );
};

export default Input;
