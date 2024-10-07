import { useEffect, useState } from "react";

import { Button, Pagination, Modal, Input, Form } from "antd";
import { IoDocumentTextOutline, IoSearch } from "react-icons/io5";
import {
  MdOutlineCloudUpload,
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";

import useBlogStore from "@store/blog";
import FormItem from "antd/es/form/FormItem";
import RichEditor from "@components/dashboard/richEditor/RichEditor";
import { AiOutlineClose } from "react-icons/ai";
import UploadMessage from "@components/dashboard/UploadMessage";

interface imageData_type {
  src: string;
  title: string;
  content: string;
}

const UploadedBlog = (
  {
    // isUploading,
    //   setIsUploading,
    //   setUploadedData,
  }
) => {
  let imageData: imageData_type[] = [];





  for (let i = 0; i < 40; i++) {
    imageData.push({
      src: "/blogImage.png",

      title: "Africa Internet Governance Forum Abuja 202" + i,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bureau except for the care and nutrition. Now put some chili orange couch. How sad players of bananas weekend. No bananas airline blockage. Unfortunately, from the Pakistan, and that it is not the mass of dui fringilla consectetur. Gluten. However, the scent like a pool or sit nor was warm. But the skirt, but graduated. Homework is important members of the football. Peanut homework now, real estate and at dui, the valley is always laughter. The undergraduate basketball land mass receives the vehicles football"+ i,
    });
  }

  // },[])

  const set_component = useBlogStore((state) => state.set_component);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    title: string;
  } | null>(null);
  const [selectedPost, setSelectedPost] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const imagesPerPage = 5;

  const handleUploadClick = () => {
    set_component({ value: "upload" });
    // setUploadedData(false);
    // setIsUploading(true);
  };

  const showDeleteModal = (image: { title: string }) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };
  const [editSuccessMessage, setEditSuccessMessage] = useState<boolean>(false);
  const showEditModal = (detail: { title: string; content: string }) => {
    setSelectedPost(detail);
    setIsModalVisible2(true);


  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  const [deleteSuccessMessage, setdeleteSuccessMessage] =
    useState<boolean>(false);
  const handleDelete = () => {
    // Add delete logic here
    console.log("Deleted:", selectedImage?.title);
    
    setdeleteSuccessMessage(true);
    setIsModalVisible(false);
    setTimeout(() => {
      setdeleteSuccessMessage(false);
      
    }, 2000);



  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = imageData.slice(indexOfFirstImage, indexOfLastImage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [imageDetails, setImageDetails] = useState<{
    name: string;
    size: string;
  } | null>(null);

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
  const handleUpload = () => {
    
    

        
    setEditSuccessMessage(true);
    setIsModalVisible2(false);
    setTimeout(() => {
      setEditSuccessMessage(false);
      
      set_component({ value: "data" });

    }, 2000);
  };

  const defaultValues = {
    blogtitle: selectedPost?.title,
  };




  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(defaultValues)
   }, [form, defaultValues])







  return (
    <>
          {editSuccessMessage && (
        <div className="fixed right-0 z-[999] top-[12.5%]">
          <UploadMessage
            imageName="You have successfully edited data for Eleme"
            onClose={() => setEditSuccessMessage(false)}
          />
        </div>
      )}
      {deleteSuccessMessage && (
        <div className="fixed right-0 z-[999] top-[12.5%]">
          <UploadMessage
            imageName="You have successfully deleted data for Eleme"
            onClose={() => setdeleteSuccessMessage(false)}
          />
        </div>
      )}
      {/* {isUploading && ( */}
      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-0 justify-between lg:items-center">
        <div
          className={`flex space-x-3 items-center px-[1.9rem] py-[1.3rem] w-full border border-BrandTextColor rounded-[8px] lg:w-[30%]`}
        >
          <IoSearch size={24} />
          <input
            type="text"
            className="text-[#000] bg-BrandLightPrimary border-BrandTextColor text-Sixteen outline-none w-[100%]"
            placeholder={"Search..."}
          />
        </div>

        <Button
          type="primary"
          onClick={handleUploadClick}
          className="lg:w-[234px] h-[48px] text-[16px] font-[400] bg-BrandPrimary"
        >
          <div className="flex gap-x-[16px] items-center">
            <img
              src="/cross.svg"
              alt="Upload Icon"
              className="w-[14px] h-[14px]"
            />
            <div className="text-[16px] font-[400]">Upload Image</div>
          </div>
        </Button>
      </div>
      {/* // )} */}

      <div className="bg-[#fff] my-[16px] py-[30px] px-[20px] rounded-[4px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-center">
          {currentImages.map((item, index) => (
            <div
              key={index}
              className="w-[248px] h-[220px] flex flex-col gap-2 relative"
            >
              <div
                className="absolute top-4 right-[45px] bg-[#fff] w-[26px] h-[26px] rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => showDeleteModal(item)}
              >
                <MdOutlineDeleteOutline size={16} color="#9B9B9B" />
              </div>
              <div
                className="absolute top-4 right-4 bg-[#fff] w-[26px] h-[26px] rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => showEditModal(item)}
              >
                <MdOutlineModeEditOutline size={16} color="#9B9B9B" />
              </div>
              <img src={item.src} alt="image" className="rounded-[14px]" />
              <p className="text-[14px] font-[500]">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={imagesPerPage}
          total={imageData.length}
          onChange={onPageChange}
        />
      </div>

      <Modal
        title={
          <h2 className="text-Twenty font-[500]">
            Delete "{selectedImage?.title}"?
          </h2>
        }
        open={isModalVisible}
        centered
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} className="w-[30%]">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            onClick={handleDelete}
            className="w-[30%]"
          >
            Delete
          </Button>,
        ]}
      >
        <p className="text-Sixteen font-[400]">
          Are you sure you want to delete the{" "}
          <span className="font-Sixteen font-[600]">
            "{selectedImage?.title}"
          </span>
          ?
          <br />
          This action is irreversible, and all associated records will be
          permanently removed from the system. Please confirm your choice.
        </p>
      </Modal>
      {/* ===>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        width={1000}
        className="my-[30px]"
        title={
          <h2 className="text-Twenty font-[500]">
            Edit "{selectedPost?.title}"?
          </h2>
        }
        open={isModalVisible2}
        centered
        onCancel={handleCancel2}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="bg-[#FFF] py-[40px] px-[20px] h-fit rounded-[4px] mt-[20px]">
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
              <div className="text-[16px] font-[400] text-[#2C2C2C] my-[10px]">
                Blog Title
              </div>
              <Form
                 form={form}
              initialValues={defaultValues}
              >
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
              </Form>
  
            </div>

            <div className="text-[16px] font-[400] text-[#2C2C2C] my-[10px]">
              Blog Detail
            </div>
            <RichEditor editorDefault= {selectedPost?.content}/>
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
      </Modal>
    </>
  );
};

export default UploadedBlog;
