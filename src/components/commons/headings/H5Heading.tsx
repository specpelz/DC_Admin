import { HeadingTextProps } from "../../../types/Heading";

const H5Heading: React.FC<HeadingTextProps> = ({ title }) => {
  return (
    <h5 className="text-Fourteen md:text-Sixteen font-[600] text-BrandBlack1">
      {title}
    </h5>
  );
};

export default H5Heading;
