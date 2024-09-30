import { HeadingTextProps } from "../../../types/Heading";


const H4Heading: React.FC<HeadingTextProps> = ({ title }) => {
  return <h4 className="text-Fourteen md:text-Sixteen font-[400] text-BrandBlack1">{title}</h4>;
};

export default H4Heading;
