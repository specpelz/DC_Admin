import { HeadingTextProps } from "../../../types/Heading";


const H4Heading: React.FC<HeadingTextProps> = ({ title }) => {
  return <h5 className="text-[1.4rem] md:text-[1.6rem] font-[400] text-BrandBlack1">{title}</h5>;
};

export default H4Heading;
