import { Button, DatePicker, Divider, Input, Modal, Space } from "antd";
import AirMonitoringTable from "./AirMonitoringTable";
import { useState } from "react";
import Select from "../select/Select";
import useAirMonitoringStore from "@store/airMonitoring";



const AirMonitoringTableTop = () => {


  const set_component = useAirMonitoringStore(
    (state) => state.set_component
  );

 const clickFunction =()=>{
  set_component({value:"upload"})
 }

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log("Winnings confirmed");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    console.log("Modal closed without confirmation");
  };

  return (
    <div className="h-screen ">
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
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
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
                onClick={showModal}
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
            onClick={clickFunction}
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

      <div className="mt-[16px] relative">
        {showFilter === true ? (
          <div className="absolute  w-full h-[209px] z-[999] px-[25px] bg-white">
            <div className="flex gap-x-[20px]  mt-[20px]">
              <div className="lg:w-[20%] ">
                <Space direction="vertical" className=" w-full">
                  <label
                    htmlFor="date-picker"
                    className="text-[16px] font-[400] text-BrandBlack1 "
                  >
                    Date
                  </label>
                  <DatePicker
                    className="h-[48px] w-full"
                    placeholder="Select date"
                  />
                </Space>
              </div>
              <div className="lg:w-[20%] ">
                <Select
                  name="state"
                  label="State"
                  placeholder="Select state"
                  required={false}
                />
              </div>
              <div className="lg:w-[20%] ">
                <Select
                  name="lga"
                  label="L.G.A"
                  placeholder="Select L.G.A"
                  required={false}
                />
              </div>
              <div className="lg:w-[20%] ">
                <Select
                  name="community"
                  label="Commuinity"
                  placeholder="Select commuinity"
                  required={false}
                />
              </div>
              <div className="lg:w-[20%] ">
                <Select
                  name="date"
                  label="Date"
                  placeholder="Select date"
                  required={false}
                />
              </div>
            </div>

            <Divider className="mt-[15px] mb-[10px]" />
            <div className="flex justify-end gap-x-[16px]">
              <Button className="w-[234px] h-[48px] text-[16px] font-[400] bg-transparent text-[#9B9B9B]">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="w-[234px] h-[48px] text-[16px] font-[400]  bg-BrandPrimary"
              >
                <div className="text-[16px] font-[400]">Apply Filter</div>
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
        <AirMonitoringTable />
      </div>

      <Modal
        title="Download File"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Download"
        okButtonProps={{
          style: { width: "150px" , height:"40px"}
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
      >
        <Divider className="mt-0" />
        <div className="w-full">
          <Select
            name="fileType"
            label="File Type"
            placeholder="Select file type"
            required={false}
          />
        </div>
        <div className="flex w-full gap-x-[30px]  mb-[28px]">
          <div className="w-[50%]">
            <Space direction="vertical" className=" w-full">
              <label
                htmlFor="date-picker"
                className="text-[16px] font-[400] text-BrandBlack1 "
              >
                From
              </label>
              <DatePicker
                className="h-[48px] w-full"
                placeholder="Select date"
              />
            </Space>
          </div>
          <div className="w-[50%]">
            <Space direction="vertical" className=" w-full">
              <label
                htmlFor="date-picker"
                className="text-[16px] font-[400] text-BrandBlack1 "
              >
                To
              </label>
              <DatePicker
                className="h-[48px] w-full"
                placeholder="Select date"
              />
            </Space>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AirMonitoringTableTop;
