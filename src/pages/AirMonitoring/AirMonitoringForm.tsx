import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";

import UploadMessage from "../../components/dashboard/UploadMessage";
import { AirMonitoring_data_type } from "../../types/airMonitoringDataType";
import usePostAirMonitoring from "@hooks/usePostAirMonitoring";
import useAirMonitoringStore from "@store/airMonitoring";
import { useQueryClient } from "@tanstack/react-query";

import useFetchUpdatedData from "@hooks/useFetchUpdatedData";

const AirMonitoringForm: React.FC = () => {


  const queryClient = useQueryClient();
  const { fetchUpdatedData } = useFetchUpdatedData();
  const successMessage = useAirMonitoringStore(
    (state) => state.upload_air_monitoring_success
  );
  const set_success_message = useAirMonitoringStore(
    (state) => state.set_upload_air_monitoring_success
  );

  const { postData, isLoading } = usePostAirMonitoring();
  const [city, set_city] = useState<string>("");

  const handleSubmit = async (values: AirMonitoring_data_type) => {
    const { deviceUid } = values;
    set_city(city);

    await postData({
      deviceUid,
    });
    await fetchUpdatedData();
    queryClient.invalidateQueries(["get_all_air_monitoring_data"]);
  };

  return (
    <Form onFinish={handleSubmit}>
      {successMessage && (
        <div className="fixed right-0 z-[999] top-[12.5%]">
          <UploadMessage
            imageName={`You have successfully uploaded data for ${city}`}
            onClose={() => set_success_message(false)}
          />
        </div>
      )}

      <div className="w-full bg-white rounded-[4px] p-[20px] lg:h-[492px] mt-[16px]">
        <div className="lg:flex lg:gap-x-[27px]">
          <div className="lg:w-[49%] h-[100px]">
            <FormItem
              layout="vertical"
              name="deviceUrl"
              label={
                <span className="text-[16px] font-[400] text-BrandBlack1 ">
                  Device Uid
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter the device Uid",
                },
                {
                  pattern:
                    /^\d+$/,
                    // /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
                  message: "Please enter a valid device Uid",
                },
              ]}
            >
              <Input
                placeholder="Enter the device Uid"
                className="text-[14px] px-[8px] py-[10px] rounded-[8px] text-BrandBlack1 h-[48px]"
              />
            </FormItem>
          </div>
        </div>

        <div className="flex justify-end">
          <FormItem>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="w-[234px] h-[48px] text-[16px] font-[400]  bg-BrandPrimary"
            >
              <div className="text-[16px] font-[400]">Upload Data</div>
            </Button>
          </FormItem>
        </div>
      </div>
    </Form>
  );
};

export default AirMonitoringForm;
