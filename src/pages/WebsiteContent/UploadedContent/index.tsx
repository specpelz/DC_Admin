import { contentData, imageData } from "@utils/Data";
import { Button, Modal, Pagination } from "antd";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { UploadedContentProps } from "../../../types/UploadedImages";

const UploadedContent: React.FC<UploadedContentProps> = ({
  setIsUploading,
  setUploadedData,
  setIsEditing
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState<{
    title: string;
  } | null>(null);

  const imagesPerPage = 5;

  const handleUploadClick = () => {
    setUploadedData(false);
    setIsUploading(true);
  };

  const showDeleteModal = (title: { title: string }) => {
    setSelectedContent(title);
    setIsModalVisible(true);
  };

  const showEditForm = () => {
    setUploadedData(false);
    setIsUploading(true);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedContent(null);
  };

  const handleDelete = () => {
    // Add delete logic here
    console.log("Deleted:", selectedContent?.title);
    setIsModalVisible(false);
    setSelectedContent(null);
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const webContent = contentData.slice(indexOfFirstImage, indexOfLastImage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
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
            <div className="text-[16px] font-[400]">Upload Content</div>
          </div>
        </Button>
      </div>

      <div className="bg-[#fff] my-[16px] py-[30px] px-[20px] rounded-[4px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center">
          {webContent.map((item, index) => (
            <div
              key={index}
              className="w-[248px]  flex flex-col gap-2  bg-BrandGray p-[16px]"
            >
              <div className="flex items-center justify-between w-full">
                <h2 className="text-[16px] font-[600]">{item.title}</h2>
                <div className=" flex gap-2 ">
                  <div
                    className=" bg-[#fff] w-[26px] h-[26px] rounded-full flex justify-center items-center cursor-pointer"
                    onClick={() => showDeleteModal(item)}
                  >
                    <MdOutlineDeleteOutline size={16} color="#9B9B9B" />
                  </div>
                  <div
                    className=" bg-[#fff] w-[26px] h-[26px] rounded-full flex justify-center items-center cursor-pointer"
                    onClick={showEditForm}
                  >
                    <MdOutlineEdit size={16} color="#9B9B9B" />
                  </div>
                </div>
              </div>

              <p className="text-[14px] font-[500] mt-4">{item.description}</p>
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
            Delete "{selectedContent?.title}"?
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
            "{selectedContent?.title}"
          </span>
          ?
          <br />
          This action is irreversible, and all associated records will be
          permanently removed from the system. Please confirm your choice.
        </p>
      </Modal>
    </>
  );
};

export default UploadedContent;
