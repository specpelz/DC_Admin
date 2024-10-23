import { BASE_URL } from "@api/index";
import NoSearchData from "@components/dashboard/NoSearchData";
import RichEditor from "@components/dashboard/richEditor/RichEditor";
import useBlogStore from "@store/blog";
import { Button, Form, Input, message, Modal, Pagination } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { IoDocumentTextOutline, IoSearch } from "react-icons/io5";
import {
  MdOutlineCloudUpload,
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";

interface BlogData {
  id: string;
  title: string;
  content: string;
  image: string;
}

interface UploadedBlogProps {
  blogs: BlogData[];
  loadingImages: boolean;
  fetchBlogs: () => void;
  setDeleteSuccessMessage: (value: boolean) => void;
  setEditSuccessMessage: (value: boolean) => void;
}

export const handleCancelEditModal = (
  setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedBlog: React.Dispatch<React.SetStateAction<BlogData | null>>,
  setImageDetails: React.Dispatch<React.SetStateAction<File | null>>
) => {
  setIsEditModalVisible(false);
  setSelectedBlog(null);
  setImageDetails(null);
};

const UploadedBlog: React.FC<UploadedBlogProps> = ({
  blogs,
  loadingImages,
  fetchBlogs,
  setEditSuccessMessage,
}) => {
  const token = localStorage.getItem("DC_Token") || "";
  const set_component = useBlogStore((state) => state.set_component);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogData | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const [form] = Form.useForm();
  const [imageDetails, setImageDetails] = useState<File | null>(null);

  const imagesPerPage = 4;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [editorContent, setEditorContent] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async () => {
    if (!selectedBlog) return;
    setIsDeleting(true);

    try {
      const response = await fetch(`${BASE_URL}/blog/${selectedBlog.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        message.success(`Blog has been deleted successfully.`);

        // setDeleteSuccessMessage(true);

        // Update the blog list with the newly edited blog
        fetchBlogs();

        setIsModalVisible(false);
        // setTimeout(() => {
        //   setDeleteSuccessMessage(false);
        // }, 2000);
      } else {
        message.error("Failed to delete the blog. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error("Error deleting blog.");
      toast.error(error?.response?.data.message || "Error deleting blog");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUploadClick = () => {
    set_component({ value: "upload" });
  };

  const showDeleteModal = (blog: BlogData) => {
    setSelectedBlog(blog);
    setIsModalVisible(true);
  };

  const showEditModal = (blog: BlogData) => {
    setSelectedBlog(blog);
    form.setFieldsValue({ blogtitle: blog.title });
    setEditorContent(blog.content);
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedBlog(null);
  };

  const handleCancelEditModalInternal = () => {
    handleCancelEditModal(
      setIsEditModalVisible,
      setSelectedBlog,
      setImageDetails
    );
  };
  const handleContentChange = (content: string) => {
    setEditorContent(content);
    console.log("Content in UploadBlog updated:", content);
  };

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const handleEditSubmit = async () => {
    const values = await form.validateFields();

    const formData = new FormData();
    formData.append("title", values.blogtitle);
    formData.append("content", editorContent);

    if (imageDetails) {
      formData.append("file", imageDetails);
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/blog/${selectedBlog?.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        console.log("Blog updated:", data);
        setEditSuccessMessage(true);

        // Update the blog list with the newly edited blog
        fetchBlogs();

        // Close the modal
        setIsEditModalVisible(false);
        setTimeout(() => {
          setEditSuccessMessage(false);
        }, 2000);
      } else {
        console.error("Failed to update blog:", data.message);
        message.error("Failed to update blog:", data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error editing blog:", error);
      message.error("Error editing blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageDetails(file);
    }
  };

  const handleRemoveImage = () => {
    setImageDetails(null);
  };

  return (
    <>
      {/* Search & Upload Section */}
      {!loadingImages && (
        <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-0 justify-between lg:items-center">
          <div
            className={
              "flex space-x-3 items-center px-[1.9rem] py-[1.3rem] w-full border border-BrandTextColor rounded-[8px] lg:w-[30%]"
            }
          >
            <IoSearch size={24} />
            <input
              type="text"
              className="text-[#000] bg-BrandLightPrimary border-BrandTextColor text-Sixteen outline-none w-[100%]"
              placeholder={"Search..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <div className="text-[16px] font-[400]">Upload Blog</div>
            </div>
          </Button>
        </div>
      )}

      {/* Blog Cards */}
      {loadingImages ? (
        <div className="bg-[#fff] my-[16px] py-[30px] px-[20px] rounded-[4px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-center">
            {Array.from({ length: imagesPerPage }).map((_, index) => (
              <div
                key={index}
                className="relative w-full h-[180px] flex flex-col gap-2"
              >
                {/* Delete icon skeleton */}
                <div className="absolute top-4 right-4 bg-gray-200 animate-pulse w-[26px] h-[26px] rounded-full"></div>

                {/* Image skeleton */}
                <div className="w-full h-[180px] bg-gray-200 animate-pulse rounded-[14px]"></div>
              </div>
            ))}
          </div>
        </div>
      ) : currentBlogs.length > 0 ? (
        <div className="bg-[#fff] my-[16px] py-[30px] px-[20px] rounded-[4px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-center">
            {currentBlogs.map((item, index) => (
              <div key={index} className="w-full flex flex-col gap-2 relative">
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
                <img
                  src={item.image}
                  alt="Blog Image"
                  className="rounded-[14px] w-full h-[180px]"
                />
                <p className="text-[14px] font-[500]">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoSearchData />
      )}

      <Pagination
        className="mt-6 flex justify-end"
        current={currentPage}
        pageSize={imagesPerPage}
        total={blogs.length}
        onChange={onPageChange}
      />

      <Modal
        title={
          <h2 className="text-Twenty font-[500]">
            Delete "{selectedBlog?.title}"?
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
            loading={isDeleting}
          >
            Delete
          </Button>,
        ]}
      >
        <p className="text-Sixteen font-[400]">
          Are you sure you want to delete this blog titled{" "}
          <span className="font-Sixteen font-[600]">{selectedBlog?.title}</span>{" "}
          ?
          <br />
          This action is irreversible, and all associated records will be
          permanently removed from the system. Please confirm your choice.
        </p>
      </Modal>

      {/* Edit Modal */}
      <Modal
        width={1000}
        className="my-[30px]"
        title={
          <h2 className="text-Twenty font-[500]">
            Edit "{selectedBlog?.title}"?
          </h2>
        }
        open={isEditModalVisible}
        centered
        onCancel={handleCancelEditModalInternal}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="bg-[#FFF] py-[40px] px-[20px] h-fit rounded-[4px] mt-[20px]">
          <div className="flex flex-col justify-center items-center h-[435px] bg-[#faf8f8] rounded-[10px] border-[1.5px] border-[E6E6E6]  border-dashed">
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
              {selectedBlog && !imageDetails && (
                <div className="text-[14px] flex items-center gap-8  font-[600] text-BrandBlack1">
                  <IoDocumentTextOutline size={40} color="#9B9B9B" />
                  <div className="relative h-[100%]  flex justify-cente items-center mb-2">
                    {/* <AiOutlineClose
                      className="absolute top-[30px] right-[30px] bg-[#000] text-white p-1 rounded-[5px] cursor-pointer"
                      onClick={handleRemoveImage}
                    /> */}
                    <img
                      src={selectedBlog.image}
                      alt="Uploaded"
                      className="h-[50%] w-[50%]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center w-full mt-2">
            {imageDetails && (
              <div className="text-[14px] flex items-center gap-2 font-[600] text-BrandBlack1">
                <IoDocumentTextOutline size={40} color="#9B9B9B" />
                <div>
                  <p className="text-[14px] text-BrandBlack1">
                    {imageDetails.name}
                  </p>
                  <div className="text-[14px] text-BrandTextColor mt-[4px]">
                    {imageDetails.size}
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

          <div className="w-full mt-[30px]">
            {/* Rich text editor here */}

            <div className="w-full h-[100px]">
              <div className="text-[16px] font-[400] text-[#2C2C2C] my-[10px]">
                Blog Title
              </div>
              <Form
                // initialValues={defaultValues}
                layout="vertical"
                form={form}
                // onFinish={handleEditSubmit}
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
            <RichEditor
              editorDefault={editorContent}
              onContentChange={handleContentChange}
            />
          </div>

          <div className="w-full flex justify-end items-end ">
            <Button
              onClick={handleEditSubmit}
              type="primary"
              className="w-[234px] h-[48px] text-[16px] font-[400] mt-[16px] bg-BrandPrimary"
              // disabled={isEmpty}
              loading={loading}
            >
              <div className="text-[16px] font-[400]">Edit Blog</div>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UploadedBlog;
