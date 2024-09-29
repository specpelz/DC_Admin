import React from "react";
import { BtnProps } from "./PrimaryBtn";
import { Button } from "antd";

const SecondaryBtn: React.FC<BtnProps> = ({children }) => {
  return (
    <Button
      className="border border-BrandPrimary text-BrandPrimary"
    >
      {children}
    </Button>
  );
};

export default SecondaryBtn;
