import NoData from "@components/dashboard/NoData";
import Select from "@components/dashboard/select/Select";
import UploadMessage from "@components/dashboard/UploadMessage";
import { contentData } from "@utils/Data";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import UploadedContent from "./UploadedContent";

const WebsiteContent = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleUploadClick = () => {
    setIsUploading(true);
  };

  const pageOptions = [
    { label: "About Us", value: "about-us" },
    { label: "Contact Us", value: "contact-us" },
    { label: "Services", value: "services" },
  ];

  // Function to check form validity
  const onValuesChange = () => {
    setIsFormValid(
      form.isFieldsTouched(true) &&
        form.getFieldsError().every(({ errors }) => errors.length === 0)
    );
  };

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedData, setUploadedData] = useState(false);

  const UploadContent = () => {
    setUploadSuccess(true);

    setTimeout(() => {
      setUploadSuccess(false);
      setUploadedData(true);
    }, 2000);
  };

  const HandleRemoveUploadMessage = () => {
    setUploadSuccess(false);
  };

  return (
    <div>
      {isUploading && !uploadedData ? (
        <div>
          <div className=" pb-[16px]">
            {isUploading && !uploadedData ? (
              <div className="flex w-full justify-between items-center">
                <h2 className="text-[20px] font-[600] text-BrandBlack1">
                  {isEditing
                    ? " Edit  Website Content"
                    : " Upload Website Content"}
                </h2>
                {uploadSuccess && (
                  <UploadMessage
                    imageName={"content"}
                    onClose={HandleRemoveUploadMessage}
                  />
                )}
              </div>
            ) : (
              <h2 className="text-[20px] font-[600] text-BrandBlack1">
                Multimedia
              </h2>
            )}
          </div>

          <div className="bg-[#fff] p-[20px] rounded-[4px]">
            <Form
              layout="vertical"
              form={form}
              onValuesChange={onValuesChange} // Track form changes
            >
              <div className="flex flex-col justify-center items-center h-full">
                <div className="flex flex-col w-full h-full cursor-pointer">
                  <div className="w-[100%] h-[100px]">
                    <Select
                      name="page"
                      label="Where do you want to see this content displayed?"
                      placeholder="Select the page you want to display content in?"
                      required={true}
                      options={pageOptions}
                      requiredMessage="Please enter the page you want to display content in!"
                    />
                  </div>

                  <div className="w-[100%] mb-[20px]">
                    <Form.Item
                      label={
                        <p className="text-[16px] font-[400]">
                          Website Content Details
                        </p>
                      }
                      name="contentDetails"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the content details!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={10}
                        placeholder="Enter the website content details here..."
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="w-full flex justify-end items-end ">
                  <Button
                    onClick={UploadContent}
                    type="primary"
                    className="w-[234px] h-[48px] text-[16px] font-[400] mt-[16px] bg-BrandPrimary"
                    disabled={!isFormValid}
                  >
                    <div className="text-[16px] font-[400]">Upload Content</div>
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-[20px] font-[600] text-BrandBlack1 pb-[16px]">
            Website Content
          </h2>

          {contentData && contentData.length > 0 ? (
            <UploadedContent
              setUploadedData={setUploadedData}
              setIsUploading={setIsUploading}
              setIsEditing={setIsEditing}
            />
          ) : (
            <NoData
              buttonFunction={handleUploadClick}
              title="No Content Displayed"
              message="Start adding text more to create a captivating experience for your visitors."
              buttonText="Upload Content"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WebsiteContent;
