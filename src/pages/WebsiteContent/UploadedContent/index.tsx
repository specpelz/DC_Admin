import { BASE_URL } from "@api/index";
import NoSearchData from "@components/dashboard/NoSearchData";
import { Button, message, Modal, Pagination } from "antd";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import {
  ContentDetail,
  UploadedContentProps,
} from "../../../types/UploadedImages";

const UploadedContent: React.FC<UploadedContentProps> = ({
  setIsUploading,
  setUploadedData,
  setIsEditing,
  ContentDetails,
  // LoadingContentDetails,
  handleEditContent,
  selectedContentId,
  setSelectedContentId,
  fetchContentDetails,
}) => {
  const token = localStorage.getItem("DC_Token") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState<{
    title: string;
  } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const contentPerPage = 9;

  const handleUploadClick = () => {
    setUploadedData(false);
    setIsUploading(true);
  };

  const showEditForm = (item: ContentDetail) => {
    setUploadedData(false);
    setIsUploading(true);
    setIsEditing(true);
    handleEditContent(item);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedContent(null);
  };

  // Filter content based on search term (matches title or description)
  const filteredContent = ContentDetails.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastImage = currentPage * contentPerPage;
  const indexOfFirstImage = indexOfLastImage - contentPerPage;
  const webContent = filteredContent.slice(indexOfFirstImage, indexOfLastImage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [IsDeleting, setIsDeleting] = useState(false);

  const showDeleteModal = (item: ContentDetail) => {
    setSelectedContent(item); // Set the selected content for the modal
    setSelectedContentId(item.id); // Set the ID of the content to delete
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedContentId) return;
    setIsDeleting(true);

    try {
      const response = await fetch(
        `${BASE_URL}/web-content/${selectedContentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response", response);

      if (response.ok) {
        message.success(`Content has been deleted successfully.`);
        setIsModalVisible(false);
        fetchContentDetails(); // Re-fetch content after deletion

        // Check if there are no items on the current page, then go to page 1
        const remainingItems = filteredContent.length - 1; // subtract the deleted item
        const totalPages = Math.ceil(remainingItems / contentPerPage);

        // If current page exceeds the number of pages, go back to page 1
        if (currentPage > totalPages) {
          setCurrentPage(1);
        }
      } else {
        message.error("Failed to delete the Content. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(error?.response?.data.message || "Error deleting Content");
    } finally {
      setIsDeleting(false);
    }
  };

  console.log("FilteredContent", filteredContent); // Check how many items remain after filtering
  console.log("ContentDetails", ContentDetails); // Check total number of items before filtering
  console.log("webContent", webContent); // Check number of items after pagination

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {webContent.length > 0 ? (
        <div className="bg-[#fff] my-[16px] py-[30px] px-[20px] rounded-[4px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
            {webContent.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-col gap-2 bg-BrandGray p-[16px] h-[300px] overflow-auto"
              >
                <div className="flex items-center gap-4 justify-between w-full">
                  <h2 className="text-[16px] font-[600]">{item.title}</h2>
                  <div className="flex gap-2">
                    <div
                      className="bg-[#fff] w-[26px] h-[26px] rounded-full flex justify-center items-center cursor-pointer"
                      onClick={() => showDeleteModal(item)}
                    >
                      <MdOutlineDeleteOutline size={16} color="#9B9B9B" />
                    </div>
                    <div
                      className="bg-[#fff] w-[26px] h-[26px] rounded-full flex justify-center items-center cursor-pointer"
                      onClick={() => showEditForm(item)}
                    >
                      <MdOutlineEdit size={16} color="#9B9B9B" />
                    </div>
                  </div>
                </div>
                <div
                  className="prose max-w-none text-[14px]"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />

                {/* <p className="text-[14px] font-[500] mt-4">{}</p> */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoSearchData />
      )}

      {filteredContent && filteredContent.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={contentPerPage}
            total={filteredContent.length}
            onChange={onPageChange}
          />
        </div>
      )}

      <Modal
        title={
          <h2 className="text-Twenty font-[500]">
            Delete "{selectedContent?.title}" Content?
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
            loading={IsDeleting}
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
          Content?
          <br />
          This action is irreversible, and all associated records will be
          permanently removed from the system. Please confirm your choice.
        </p>
      </Modal>
    </>
  );
};

export default UploadedContent;
