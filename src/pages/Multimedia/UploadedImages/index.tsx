import { UploadedImagesProps } from "../../../types/UploadedImages";
import { Button } from "antd";
import { IoSearch } from "react-icons/io5";

const UploadedImages: React.FC<UploadedImagesProps> = ({
  isUploading,
  setIsUploading,
  setUploadedData,
}) => {
  const handleUploadClick = () => {
    setUploadedData(false);
    setIsUploading(true);
  };

  return (
    <>
      {isUploading && (
        <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-0 justify-between lg:items-center">
          <div
            className={`flex space-x-3 items-center px-[1.9rem] py-[1.3rem]  w-full border border-BrandTextColor rounded-[8px] lg:w-[30%]`}
          >
            <IoSearch size={24} />
            <input
              type="text"
              className="text-[#000] bg-BrandLightPrimary border-BrandTextColor  text-Sixteen outline-none w-[100%]"
              placeholder={"Search..."}
            />
          </div>

          <Button
            type="primary"
            onClick={handleUploadClick}
            className="lg:w-[234px] h-[48px] text-[16px] font-[400] bg-BrandPrimary"
          >
            <div className="flex gap-x-[16px] items-center">
              <img
                src="/cross.svg"
                alt="Upload Icon"
                className="w-[14px] h-[14px]"
              />
              <div className="text-[16px] font-[400]">Upload Image</div>
            </div>
          </Button>
        </div>
      )}

      <div className="bg-[#fff] my-[16px] py-[30px] px-[20px]">
        <h2 className="text-center text-Twenty"> Uploaded Images</h2>
      </div>
    </>
  );
};

export default UploadedImages;
