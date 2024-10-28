import { BASE_URL } from "@api/index";
// import NoData from "@components/dashboard/NoData";
import Select from "@components/dashboard/select/Select";
import UploadMessage from "@components/dashboard/UploadMessage";
import { Button, Form, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { ContentDetail } from "../../types/UploadedImages";
import UploadedContent from "./UploadedContent";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import RichEditor from "@components/dashboard/richEditor/RichEditor";

const WebsiteContent = () => {
  const token = localStorage.getItem("DC_Token") || "";
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [content, setContent] = useState<string>("");
  // const handleUploadClick = () => {
  //   setIsEditing(false);
  //   setUploadedData(false);
  //   setIsUploading(true);
  // };
  const handleContentChange = (content: string) => {
    setContent(content);

  };

  const pageOptions = [
    { label: "About Us", value: "About Us" },
    { label: "Contact Us", value: "Contact Us" },
    { label: "Services", value: "Services" },
  ];

  // Function to check form validity
  const onValuesChange = () => {
    const fieldsTouched = form.isFieldsTouched(true);
    const allFieldsValid = form
      .getFieldsError()
      .every(({ errors }) => errors.length === 0);
    const fieldsValues = form.getFieldsValue();

    setIsFormValid(fieldsTouched && allFieldsValid);

    // In edit mode, consider the form non-empty if it's pre-filled with data
    if (isEditing) {
      setIsFormEmpty(false);
    } else {
      setIsFormEmpty(
        !fieldsTouched || Object.values(fieldsValues).every((value) => !value)
      );
    }
  };

  // When entering edit mode, set the form as valid and non-empty
  useEffect(() => {
    if (isEditing) {
      const fieldsValues = form.getFieldsValue();
      const allFieldsValid = form
        .getFieldsError()
        .every(({ errors }) => errors.length === 0);

      setIsFormValid(allFieldsValid);
      setIsFormEmpty(Object.values(fieldsValues).every((value) => !value));
    }
  }, [isEditing, form]);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedData, setUploadedData] = useState(false);

  const HandleRemoveUploadMessage = () => {
    setUploadSuccess(false);
  };

  const Back = () => {
    setIsEditing(false);
    setIsUploading(false);
    form.resetFields(); // Clear the form when going back
    setContent("")
    setIsFormValid(false); // Reset form validity
    setIsFormEmpty(true); // Reset form empty state
  };

  const [loading, setLoading] = useState(false); // Loading state

  const UploadContent = async () => {
    try {
      const values = form.getFieldsValue();
      console.log(values);
      console.log("values before upload:", {
        title: values.page,
        content: values.contentDetails,
      });
      setLoading(true); // Start loading

      const response = await axios.post(
        `${BASE_URL}/web-content`,
        {
          title: values.page, // Include title
          // content: values.contentDetails, 
          content: content, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful upload
      console.log("Content uploaded successfully", response);
      if (response.data.status === "success") {
        setUploadSuccess(true);
        form.resetFields();
        setContent("")
        setTimeout(() => {
          setUploadSuccess(false);
          setUploadedData(true);
          setIsUploading(false); // Reset upload state
        }, 2000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(error?.response?.data.message || "Error uploading content");
      // toast.error(error?.response?.data.message || "Error uploading content");
      setUploadSuccess(false);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const [ContentDetails, setContentDetails] = useState([]);
  const [LoadingContentDetails, setLoadingContentDetails] = useState(false);
  const [EditLoading, setEditLoading] = useState(false);
  const [EditSuccess, setEditSuccess] = useState(false);
  const [EditData, setEditData] = useState(false);

  const [selectedContentId, setSelectedContentId] = useState<string | null>(
    null
  );
  const handleEditContent = (content: ContentDetail) => {
    form.setFieldsValue({
      page: content.title, 
      // contentDetails: content.content,
    });
    setContent(content.content)
    setSelectedContentId(content.id); // Store selected content ID for updating
    setUploadedData(false);
    // setIsUploading(true); // Set to uploading state for the form
  };

  const EditContent = async () => {
    try {
      const values = form.getFieldsValue();
      console.log(values);
      console.log("values before upload:", {
        title: values.page,
        content: values.contentDetails,
      });
      setEditLoading(true);

      const response = await axios.patch(
        `${BASE_URL}/web-content/${selectedContentId}`,
        {
          title: values.page,
          // content: values.contentDetails,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setEditSuccess(true);
        form.resetFields();
        setContent("")
        setTimeout(() => {
          setEditSuccess(false);
          setEditData(true);
          setIsEditing(false);
          setUploadedData(true); // Show updated list
        }, 2000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(error?.response?.data.message || "Error editing content");
      setEditSuccess(false);
    } finally {
      setEditLoading(false);
    }
  };

  const HandleRemoveEditMessage = () => {
    setEditSuccess(false);
  };

  const fetchContentDetails = async () => {
    setLoadingContentDetails(true);
    try {
      const response = await axios.get(`${BASE_URL}/web-content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("ContentDetails", response);

      if (response.data.status === "success") {
        setContentDetails(response.data.data);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(
        error?.response?.data.message || "Error fetching content details"
      );
    } finally {
      setLoadingContentDetails(false);
    }
  };

  useEffect(() => {
    fetchContentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, uploadedData, EditData]);

  return (
    <div>
      {isUploading && !uploadedData ? (
        <div>
          <div className=" pb-[16px]">
            {isUploading && !uploadedData ? (
              <div className="flex w-full justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div
                    onClick={Back}
                    className=" w-[30px] flex justify-center border cursor-pointer"
                  >
                    <IoIosArrowBack size={20} />
                  </div>
                  <h2 className="text-[20px] font-[600] text-BrandBlack1">
                    {isEditing
                      ? " Edit  Website Content"
                      : " Upload Website Content"}
                  </h2>
                </div>
                {uploadSuccess && (
                  <UploadMessage
                    imageName={"uploaded content"}
                    onClose={HandleRemoveUploadMessage}
                  />
                )}
                {EditSuccess && (
                  <UploadMessage
                    imageName={"updated content"}
                    onClose={HandleRemoveEditMessage}
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

                  {/* <div className="w-[100%] mb-[20px]">
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
                  </div> */}

<RichEditor
          editorDefault={content}
          onContentChange={handleContentChange}
        />
                </div>

                <div className="w-full flex justify-end items-end ">
                  <Button
                    onClick={isEditing ? EditContent : UploadContent}
                    type="primary"
                    className="w-[234px] h-[48px] text-[16px] font-[400] mt-[16px] bg-BrandPrimary"
                    disabled={!isEditing && (!isFormValid || isFormEmpty || !content) } // Disable only when not editing and form is invalid/empty
                    // disabled={content.length > 0 ? false:true} 
                    loading={isEditing ? EditLoading : loading} // Show loading state when submitting
                  >
                    {isEditing ? (
                      <div className="text-[16px] font-[400]">
                        Update Content
                      </div>
                    ) : (
                      <div className="text-[16px] font-[400]">
                        Upload Content
                      </div>
                    )}
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

          {ContentDetails && ContentDetails.length > 0 ? (
            <UploadedContent
              setUploadedData={setUploadedData}
              setEditData={setEditData}
              setIsUploading={setIsUploading}
              setIsEditing={setIsEditing}
              ContentDetails={ContentDetails}
              LoadingContentDetails={LoadingContentDetails}
              selectedContentId={selectedContentId}
              handleEditContent={handleEditContent}
              setSelectedContentId={setSelectedContentId}
              fetchContentDetails={fetchContentDetails}
            />
          ) : (
            <div className="bg-[#fff] my-[16px] py-[30px] px-[20px] rounded-[4px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col gap-2 bg-BrandGray p-[16px] animate-pulse"
                  >
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>{" "}
                    {/* Title Skeleton */}
                    <div className="flex items-center gap-4 justify-between w-full">
                      <div className="h-4 bg-gray-300 rounded w-1/3"></div>{" "}
                      {/* Placeholder for action icons */}
                      <div className="flex gap-2">
                        <div className="bg-[#e0e0e0] w-[26px] h-[26px] rounded-full flex justify-center items-center cursor-not-allowed">
                          <MdOutlineDeleteOutline size={16} color="#9B9B9B" />
                        </div>
                        <div className="bg-[#e0e0e0] w-[26px] h-[26px] rounded-full flex justify-center items-center cursor-not-allowed">
                          <MdOutlineEdit size={16} color="#9B9B9B" />
                        </div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-300 rounded mt-4"></div>{" "}
                    {/* Content Skeleton */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WebsiteContent;
