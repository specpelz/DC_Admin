import { HeadingTextProps } from "../../../types/Heading";


const H5Heading: React.FC<HeadingTextProps> = ({ title }) => {
  return <h5 className="text-[1.4rem] md:text-[1.6rem] font-bold">{title}</h5>;
};

export default H5Heading;
