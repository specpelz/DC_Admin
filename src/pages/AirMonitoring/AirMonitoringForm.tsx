import useCountries from "@hooks/useCountries";
import useLGAs from "@hooks/useLGAs";
import useStates from "@hooks/useStates";
// import useAirMonitoringStore from "@store/airMonitoring";
import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import Select from "../../components/dashboard/select/Select";
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
  // const set_component = useAirMonitoringStore((state) => state.set_component);

  const countries = useCountries(); // Fetch countries
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const states = useStates(selectedCountry); // Fetch states based on selected country
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const lgas = useLGAs(selectedState); // Fetch LGAs based on selected state

  const handleCountryChange = (value: string | number) => {
    setSelectedCountry(value as string);
    setSelectedState(null); // Reset selected state when country changes
    console.log("Selected Country:", value);
  };

  const handleStateChange = (value: string | number) => {
    setSelectedState(value.toString());
    console.log("Selected State:", value);
  };
  // Log countries, states, and lgas to debug
  console.log("Countries:", countries);
  console.log("States:", states);
  console.log("LGAs:", lgas);

  const { postData, isLoading } = usePostAirMonitoring();
  const [city, set_city] = useState<string>("");
  const handleSubmit = async (values: AirMonitoring_data_type) => {
    const { country, state, lga, city, latitude, longitude, deviceUrl } =
      values;
    set_city(city);
    console.log({ country, state, lga, city, latitude, longitude, deviceUrl });
    await postData({
      country,
      state,
      lga,
      city,
      latitude,
      longitude,
      deviceUrl,
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
          <div className="lg:w-[50%] h-[100px]">
            <Select
              name="country"
              label="Country"
              placeholder="Select the country"
              required={true}
              requiredMessage="Please select the country!"
              options={countries} // Ensure countries is an array of { value, label }
              onChange={handleCountryChange}
              showSearch={true}
            />
          </div>
          <div className="lg:w-[50%] h-[100px]">
            <Select
              name="state"
              label="State"
              placeholder="Enter the state"
              required={true}
              requiredMessage="Please enter the state!"
              options={states.map((state) => ({
                value: state.value, // Use 'state.value' here
                label: state.label, // Use 'state.label' here
              }))}
              onChange={handleStateChange} // This should now work
              disabled={!selectedCountry || states.length === 0}
              showSearch={true}
            />
          </div>
        </div>
        <div className="lg:flex lg:gap-x-[27px]">
          <div className="lg:w-[50%] h-[100px]">
            <Select
              name="lga"
              label="L.G.A"
              placeholder="Enter the Local Government"
              required={true}
              requiredMessage="Please enter the L.G.A!"
              options={lgas} // Use the mapped LGAs
              disabled={!selectedState} // Disable until a state is selected
              showSearch={true}
            />
          </div>
          <div className="lg:w-[50%] h-[100px]">
            <FormItem
              layout="vertical"
              name="city"
              label={
                <span className="text-[16px] font-[400] text-BrandBlack1 ">
                  City
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter the city",
                },
              ]}
            >
              <Input
                placeholder="Enter the city"
                className="text-[14px] px-[8px] py-[10px] rounded-[8px] text-BrandBlack1 h-[48px]"
              />
            </FormItem>
          </div>
        </div>
        <div className="lg:flex lg:gap-x-[27px]">
          <div className="lg:w-[50%] h-[100px]">
            <FormItem
              layout="vertical"
              name="latitude"
              label={
                <span className="text-[16px] font-[400] text-BrandBlack1 ">
                  Latitude
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter the latitude",
                },
              ]}
            >
              <Input
                placeholder="Enter the latitude"
                className="text-[14px] px-[8px] py-[10px] rounded-[8px] text-BrandBlack1 h-[48px]"
              />
            </FormItem>
          </div>
          <div className="lg:w-[50%] h-[100px]">
            <FormItem
              layout="vertical"
              name="longitude"
              // className="bg-red-700 h-fit"
              label={
                <span className="text-[16px] font-[400] text-BrandBlack1 ">
                  Longitude
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter the longitude",
                },
              ]}
            >
              <Input
                placeholder="Enter the longitude"
                className="text-[14px] px-[8px] py-[10px] rounded-[8px] text-BrandBlack1 h-[48px]"
              />
            </FormItem>
          </div>
        </div>
        <div className="lg:flex lg:gap-x-[27px]">
          <div className="lg:w-[49%] h-[100px]">
            <FormItem
              layout="vertical"
              name="deviceUrl"
              label={
                <span className="text-[16px] font-[400] text-BrandBlack1 ">
                  Device URL
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter the device URL",
                },
                {
                  pattern:
                    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
                  message: "Please enter a valid device URL",
                },
              ]}
            >
              <Input
                placeholder="Enter the device URL"
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
