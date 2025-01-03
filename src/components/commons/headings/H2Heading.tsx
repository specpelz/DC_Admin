import { HeadingTextProps } from "../../../types/Heading";

const H2Heading: React.FC<HeadingTextProps> = ({ title }) => {
  return (
    <h2 className="text-[1.6rem] md:text-[2rem] font-[600] text-BrandBlack1">
      {title}
    </h2>
  );
};

export default H2Heading;
