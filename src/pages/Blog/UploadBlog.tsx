import RichEditor from "@components/dashboard/richEditor/RichEditor";
import UploadMessage from "@components/dashboard/UploadMessage";
import useBlogStore from "@store/blog";
import { Button, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";



// interface Props {
//   editorDefault?:string
// }


const UploadBlog = () => {



  const set_component = useBlogStore((state) => state.set_component);




    const [imageDetails, setImageDetails] = useState<{
        name: string;
        size: string;
      } | null>(null);
    //   const [isUploading, setIsUploading] = useState(false);
    
    //   const handleUploadClick = () => {
    //     setIsUploading(true);
    //     setImageDetails(null);
    //   };
    

    

    //   const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
    //   const [uploadedData, setUploadedData] = useState<boolean>(false);
    
    //   const UploadedImage = () => {
    //     // Set the upload success message to true
    //     setUploadSuccess(true);
      
    //     setTimeout(() => {
    //       setUploadSuccess(false);
    //       setUploadedData(true);
    //     }, 2000);
    //   };
      
    
    //   const HandleRemoveUploadMessage = () => {
    //     setUploadSuccess(false);
    //   };

 
  //   const [isUploading, setIsUploading] = useState(false);

  //   const handleUploadClick = () => {
  //     setIsUploading(true);
  //     setImageDetails(null);
  //   };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageDetails({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
      });
    }
  };

  const handleRemoveImage = () => {
    setImageDetails(null);
    // setIsUploading(false);
  };
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<boolean>(false);
  const handleUpload = () => {
    setImageDetails(null);

    setUploadSuccessMessage(true);

    setTimeout(() => {
      setUploadSuccessMessage(false);
      set_component({ value: "data" });
    }, 2000);
   
  };

  //   const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  //   const [uploadedData, setUploadedData] = useState<boolean>(false);

  //   const UploadedImage = () => {
  //     // Set the upload success message to true
  //     setUploadSuccess(true);

  //     setTimeout(() => {
  //       setUploadSuccess(false);
  //       setUploadedData(true);
  //     }, 2000);
  //   };

  //   const HandleRemoveUploadMessage = () => {
  //     setUploadSuccess(false);
  //   };

  //   const [isUploading, setIsUploading] = useState(false);

  //   const handleUploadClick = () => {
  //     setIsUploading(true);
  //     setImageDetails(null);
  //   };

  //   const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  //   const [uploadedData, setUploadedData] = useState<boolean>(false);

  //   const UploadedImage = () => {
  //     // Set the upload success message to true
  //     setUploadSuccess(true);

  //     setTimeout(() => {
  //       setUploadSuccess(false);
  //       setUploadedData(true);
  //     }, 2000);
  //   };

  //   const HandleRemoveUploadMessage = () => {
  //     setUploadSuccess(false);
  //   };

  return (
    <div className="bg-[#FFF] py-[40px] px-[20px] h-fit rounded-[4px] mt-[20px]">

{uploadSuccessMessage && (
        <div className="fixed right-0 z-[999] top-[12.5%]">
          <UploadMessage
            imageName="You have successfully uploaded a blog post"
            onClose={() => setUploadSuccessMessage(false)}
          />
        </div>
      )}

      <div className="flex flex-col justify-center items-center  h-[435px] bg-[#E6E6E6] rounded-[4px] border-[3px] border-[#C2C2C2] border-dashed">
        <div
          onChange={handleFileChange}
          className="relative flex flex-col justify-center items-center mt-[20px] w-full h-full cursor-pointer"
        >
          <MdOutlineCloudUpload size={40} color="#9B9B9B" />
          <h4 className="text-Fourteen md:text-Sixteen font-[400] text-BrandBlack1 mt-[10px]">
            Drop your image file here{" "}
            <span className="text-BrandPrimary text-Fourteen md:text-Sixteen font-[500]">
              browse here
            </span>
          </h4>
          <p className="text-Fourteen text-BrandLighterGray font-[400]">
            Maximum upload files less than 30mb
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-ful opacity-0 cursor-pointer"
          />
        </div>

        <div className="flex justify-between items-center w-full">
          {imageDetails && (
            <div className="text-[14px] flex items-center gap-2 font-[600] text-BrandBlack1">
              <IoDocumentTextOutline size={40} color="#9B9B9B" />
              <div>
                <p className="text-[14px] text-BrandBlack1">
                  {imageDetails ? imageDetails.name : "No Image Uploaded"}
                </p>
                <div className="text-[14px] text-BrandTextColor mt-[4px]">
                  {imageDetails ? imageDetails.size : ""}
                </div>
              </div>
            </div>
          )}

          {imageDetails && (
            <button
              onClick={handleRemoveImage}
              className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100"
            >
              <AiOutlineClose size={24} color="#FF0000" />
            </button>
          )}
        </div>
      </div>

      <div className="w-full mt-[30px]">
        {/* Rich text editor here */}

        <div className="w-full h-[100px]">
        <div className="text-[16px] font-[400] text-[#2C2C2C] my-[10px]">Blog Title</div>
            <FormItem
              layout="vertical"
              name="blogtitle"
         
              rules={[
                {
                  required: true,
                  message: "Please enter the blog title",
                },
              ]}
            >
              <Input
                placeholder="Blog title"
                className="text-[14px] px-[8px] py-[10px] rounded-[8px] text-BrandBlack1 h-[48px] bg-[#E6E6E6]"
              />
            </FormItem>
          </div>





        <div className="text-[16px] font-[400] text-[#2C2C2C] my-[10px]">Blog Detail</div>
        <RichEditor />
      </div>

      <div className="w-full flex justify-end items-end ">
        <Button
          onClick={handleUpload}
          type="primary"
          className="w-[234px] h-[48px] text-[16px] font-[400] mt-[16px] bg-BrandPrimary"
          // disabled={!imageDetails}
        >
          <div className="text-[16px] font-[400]">Upload Image</div>
        </Button>
      </div>
    </div>
  );
};

export default UploadBlog;
