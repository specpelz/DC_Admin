import { NoDataProps } from "../../types/NoData";
import { Button } from "antd";

const NoData: React.FC<NoDataProps> = ({
  buttonFunction,
  title = "No Data Uploaded",
  message = "Start Uploading Data",
  buttonText = "Upload Data",
  imageSrc = "/nodata.svg",
  loading
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[212px] h-[206.94px] mb-[37px] mt-[114px]">
        <img src={imageSrc} alt="No Data" className="w-full h-[auto]" />
      </div>

      <div className="text-[18px] font-[600] text-BrandBlack1 mb-[10px]">
        {title}
      </div>
      <div className="text-[16px] font-[400] text-BrandBlack1 lg:w-[300px] text-center">
        {message}
      </div>

      <Button
        icon={
          <img
            src="/cross.svg"
            alt="Upload Icon"
            className="w-[14px] h-[14px]"
          />
        }
        type="primary"
        onClick={buttonFunction}
        className="w-[234px] h-[48px] text-[16px] font-[400] mt-[16px] bg-BrandPrimary"
        loading={loading}
      >
        <div className="text-[16px] font-[400]">{buttonText}</div>
      </Button>
    </div>
  );
};

export default NoData;
