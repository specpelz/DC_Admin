import FormItem from "antd/es/form/FormItem";
import Select from "../select/Select";
import { Button, Form, Input } from "antd";

const AirMonitoringForm = () => {
  return (
    <Form>
      <div className="w-full bg-white rounded-[4px] p-[20px] lg:h-[492px] mt-[16px]">
        <div className="lg:flex lg:gap-x-[27px]">
          <div className="lg:w-[50%] h-[100px]">
            <Select
              name="country"
              label="Country"
              placeholder="Enter the country"
              required={true}
              requiredMessage="Please enter the country!"
            />
          </div>
          <div className="lg:w-[50%] h-[100px]">
            <Select
              name="state"
              label="State"
              placeholder="Enter the state"
              required={true}
              requiredMessage="Please enter the state!"
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
              name="deviceurl"
              label={
                <span className="text-[16px] font-[400] text-BrandBlack1 ">
                  Device URL
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
                placeholder="Enter the device URL"
                className="text-[14px] px-[8px] py-[10px] rounded-[8px] text-BrandBlack1 h-[48px]"
              />
            </FormItem>
          </div>
        </div>

        <div className="flex justify-end">
          <FormItem>
            <Button
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
