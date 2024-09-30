import { Button, Input } from "antd";
import AirMonitoringTable from "./AirMonitoringTable";

const AirMonitoringTableTop = () => {
  return (
    <div className="h-screen">
      {/* SEARCH. FILTER, SHARE,DOWNLOAD COMPONENTS------------------------------------------------- */}
      <div className="w-full flex items-center gap-x-[30px] mt-[32px]">
        <div className="w-[30%]">
          <Input
            placeholder="Search for data... "
            prefix={
              <img
                src="/search.svg"
                alt="image"
                className="w-[17.5px] h-[17.5px]"
              />
            }
            className="h-[46px] w-[100%] bg-transparent"
          />
        </div>
        <div className="flex w-[70%]">
          <div className="w-[70%]">
            <div className="flex items-center w-[100%] gap-x-[10px] border-r-[0.5px] pr-[10px] border-gray-300">
              <Button
                className="h-[46px] w-[18% bg-transparent"
                icon={
                  <img
                    src="/funel.svg"
                    alt="image"
                    className="w-[17.5px] h-[17.5px]"
                  />
                }
              >
                Filter
              </Button>
              <Button
                className="h-[46px] w-[18% bg-transparent"
                icon={
                  <img
                    src="/print.svg"
                    alt="image"
                    className="w-[17.5px] h-[17.5px]"
                  />
                }
              >
                Print
              </Button>
              <Button
                className="h-[46px] flex-grow bg-transparent"
                icon={
                  <img
                    src="/download.svg"
                    alt="image"
                    className="w-[17.5px] h-[17.5px]"
                  />
                }
              >
                Download
              </Button>
              <Button
                className="h-[46px] w-[18%] bg-transparent"
                icon={
                  <img
                    src="/share.svg"
                    alt="image"
                    className="w-[17.5px] h-[17.5px]"
                  />
                }
              >
                Share
              </Button>
            </div>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            icon={
              <img
                src="/cross.svg"
                alt="Upload Icon"
                className="w-[14px] h-[14px]"
              />
            }
            className="w-[30%] h-[48px] text-[16px] font-[400]  bg-BrandPrimary"
          >
            <div className="text-[16px] font-[400]">Upload data</div>
          </Button>
        </div>
      </div>
      {/* SEARCH. FILTER, SHARE,DOWNLOAD COMPONENTS ENDS HERE------------------------------------------------- */}
      <div className="mt-[16px]"><AirMonitoringTable /></div>
      
    </div>
  );
};

export default AirMonitoringTableTop;
