import { Button } from "antd";

interface NoDataProps {
  buttonFunction: () => void; // Function to be called when the button is clicked
  title?: string; // Title text, defaults to "No Data Uploaded"
  message?: string; // Message text, defaults to "Start Uploading Data"
  buttonText?: string; // Text for the button, defaults to "Upload Data"
  imageSrc?: string; // Image source, defaults to "/nodata.svg"
}

const NoData: React.FC<NoDataProps> = ({
  buttonFunction,
  title = "No Data Uploaded",
  message = "Start Uploading Data",
  buttonText = "Upload Data",
  imageSrc = "/nodata.svg",
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[212px] h-[206.94px] mb-[37px] mt-[114px]">
        <img src={imageSrc} alt="No Data" className="w-full h-[auto]" />
      </div>

      <div className="text-[18px] font-[600] text-BrandBlack1 mb-[10px]">
        {title}
      </div>
      <div className="text-[16px] font-[400] text-BrandBlack1">{message}</div>

      <Button
        type="primary"
        onClick={buttonFunction}
        className="w-[234px] h-[48px] text-[16px] font-[400] mt-[16px] bg-BrandPrimary"
      >
        <div className="flex gap-x-[16px] items-center">
          <img
            src="/cross.svg"
            alt="Upload Icon"
            className="w-[14px] h-[14px]"
          />
          <div className="text-[16px] font-[400]">{buttonText}</div>
        </div>
      </Button>
    </div>
  );
};

export default NoData;
