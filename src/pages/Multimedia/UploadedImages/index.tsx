import { Button, Modal, Pagination, message } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ImageType, UploadedImagesProps } from "../../../types/ImageType";
import { CustomError } from "../../../types/Error";
import { BASE_URL } from "@api/index";

const UploadedImages: React.FC<UploadedImagesProps> = ({
  images,
  setIsUploading,
  setUploadedData,
  // loadingImages,
  setImages,
}) => {
  const token = localStorage.getItem("DC_Token") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    media: string;
    id: string;
  } | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const imagesPerPage = 8;
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const handleUploadClick = () => {
    setUploadedData(false);
    setIsUploading(true);
    // setCurrentPage(1);
  };

  const showDeleteModal = (
    image: React.SetStateAction<{ media: string; id: string } | null>
  ) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async () => {
    if (!selectedImage) return;
    setIsDeleting(true);

    try {
      const response = await fetch(
        `${BASE_URL}/multimedia/${selectedImage.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        message.success(`Image has been deleted successfully.`);
        setIsModalVisible(false);
        setSelectedImage(null);

        // Update the images array (remove the deleted image)
        setImages((prevImages: ImageType[]) => {
          const newImages = prevImages.filter(
            (image) => image.id !== selectedImage.id
          );

          // If deleting the last image on the current page, adjust currentPage
          if (newImages.length < indexOfLastImage && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }

          // Ensure latest data is shown on the first page
          // setCurrentPage(1);

          return newImages;
        });
      } else {
        message.error("Failed to delete the image. Please try again.");
      }
    } catch (error) {
      const customError = error as CustomError;
      message.error("Error deleting image.");
      toast.error(
        customError?.response?.data.message || "Error deleting image"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-0 justify-between lg:items-center">
        <div className="flex space-x-3 items-center px-[1.9rem] py-[1.3rem] w-full border border-BrandTextColor rounded-[8px] lg:w-[30%]">
          <IoSearch size={24} />
          <input
            type="text"
            className="text-[#000] bg-BrandLightPrimary border-BrandTextColor text-Sixteen outline-none w-[100%]"
            placeholder="Nothing to Search..."
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

      <div className="bg-[#fff] my-[16px] py-[30px] px-[20px] rounded-[4px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-center">
          {currentImages.map((item, index) => (
            <div
              key={index}
              className="w-full h-[180px] flex flex-col gap-2 relative group"
            >
              <div
                className="absolute top-4 right-4 z-10 bg-[#fff] shadow-lg w-[26px] h-[26px] rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => showDeleteModal(item)}
              >
                <MdOutlineDeleteOutline size={16} color="#9B9B9B" />
              </div>

              <img
                src={item.media}
                alt="uploaded image"
                className="w-full h-[180px] rounded-[14px] object-cover"
              />

              {/* Overlay with title */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-white text-[14px] font-semibold">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={imagesPerPage}
          total={images.length}
          onChange={onPageChange}
        />
      </div>

      <Modal
        title={<h2 className="text-Twenty font-[500]">Delete this Image?</h2>}
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
            loading={isDeleting}
          >
            Delete
          </Button>,
        ]}
      >
        <p className="text-Sixteen font-[400]">
          Are you sure you want to delete this{" "}
          <span className="font-Sixteen font-[600]">Image</span> ?
          <br />
          This action is irreversible, and all associated records will be
          permanently removed from the system. Please confirm your choice.
        </p>
      </Modal>
    </>
  );
};

export default UploadedImages;
