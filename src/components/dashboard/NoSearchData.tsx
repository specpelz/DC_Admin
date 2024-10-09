import { FaExclamationTriangle } from "react-icons/fa";

const NoSearchData = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[50vh] ">
      <FaExclamationTriangle className="text-yellow-500 mb-4 text-4xl" />{" "}
      <p className="text-[20px] font-[600] text-BrandTextColor mb-2">
        No Data Available
      </p>
    </div>
  );
};

export default NoSearchData;
