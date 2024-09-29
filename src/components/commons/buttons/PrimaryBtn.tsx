import { Button } from "antd";
import { ReactNode } from "react";

export interface BtnProps {
  children: ReactNode;
  bg?: string;
  text?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type?: any;
  onClick?: () => void;
}
const PrimaryBtn: React.FC<BtnProps> = ({
  children,
  onClick,
  bg = "BrandPrimary",
  text = "white",
  type = "primary",
}) => {
  return (
    <Button onClick={onClick} type={type} className={`bg-${bg} text-${text}`}>
      {children}
    </Button>
  );
};

export default PrimaryBtn;
