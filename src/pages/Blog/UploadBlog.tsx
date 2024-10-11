import { useState, useEffect } from "react";
import { Button, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { AiOutlineClose } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";
import RichEditor from "@components/dashboard/richEditor/RichEditor";
import UploadMessage from "@components/dashboard/UploadMessage";
import useBlogStore from "@store/blog";
import { BASE_URL } from "@api/index";

interface UploadBlogProps {
  fetchBlogs: () => void;
}

const UploadBlog: React.FC<UploadBlogProps> = ({ fetchBlogs }) => {
  const set_component = useBlogStore((state) => state.set_component);
  const [imageDetails, setImageDetails] = useState<{
    name: string;
    size: string;
    file: File | null;
  } | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("DC_Token") || "";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageDetails({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        file,
      });
      console.log("File selected:", file); 
    }
  };

  useEffect(() => {
    console.log({
      title: title,
      content: content,
      image: imageDetails?.file,
    });
  }, [title, content, imageDetails]);

  const handleRemoveImage = () => {
    setImageDetails(null);
    console.log("Image removed"); 
  };

  const handleContentChange = (content: string) => {
    setContent(content);
    console.log("Content in UploadBlog updated:", content);
  };

  const isEmpty = !title || !content || !imageDetails?.file;

  const handleUpload = async () => {
    if (!title || !content) {
      message.error("Please fill out all fields.");
      return;
    }

    if (!imageDetails) {
      message.error("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", imageDetails.file as File);

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/blog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload blog");
      }

      const result = await response.json();
      console.log("Blog uploaded successfully:", result);

      setTitle("");
      setContent("");
      setImageDetails(null);
      setUploadSuccessMessage(true);

      fetchBlogs();

      setTimeout(() => {
        setUploadSuccessMessage(false);
        set_component({ value: "data" });
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error uploading blog:", error);
      message.error(error.response?.data.message || "Failed to upload blog");
    } finally {
      setLoading(false);
    }
  };

  const [uploadSuccessMessage, setUploadSuccessMessage] =
    useState<boolean>(false);

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

      <div className="flex flex-col justify-center items-center h-[435px] bg-[#faf8f8] rounded-[10px] border-[1.5px] border-[E6E6E6]  border-dashed">
        <div className="relative flex flex-col justify-center items-center mt-[20px] w-full h-full cursor-pointer">
          <MdOutlineCloudUpload size={40} color="#9B9B9B" />
          <h4 className="text-Fourteen md:text-Sixteen font-[400] text-BrandBlack1 mt-[10px]">
            Drop your image file here{" "}
            <span className="text-BrandPrimary text-Fourteen md:text-Sixteen font-[500]">
              browse here
            </span>
          </h4>
          <p className="text-Fourteen text-BrandLighterGray font-[400]">
            Maximum upload file size less than 30mb
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
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
        <div className="text-[16px] font-[400] text-[#2C2C2C] my-[10px]">
          Blog Title
        </div>
        <FormItem
          layout="vertical"
          name="blogtitle"
          rules={[{ required: true, message: "Please enter the blog title" }]}
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="h-[45px] rounded-[4px] border border-gray-300"
          />
        </FormItem>
      </div>

      <div className="mt-[20px]">
        <div className="text-[16px] font-[400] text-[#2C2C2C] my-[10px]">
          Blog Content
        </div>
        <RichEditor
          editorDefault={content}
          onContentChange={handleContentChange}
        />
      </div>

      <div className="w-full flex justify-end items-end ">
        <Button
          onClick={handleUpload}
          type="primary"
          className="w-[234px] h-[48px] text-[16px] font-[400] mt-[16px] bg-BrandPrimary"
          disabled={isEmpty}
          loading={loading}
        >
          <div className="text-[16px] font-[400]">Upload Image</div>
        </Button>
      </div>
    </div>
  );
};

export default UploadBlog;
