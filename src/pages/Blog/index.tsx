import UploadBlog from "@pages/Blog/UploadBlog";
import UploadedBlog from "@pages/Blog/UploadedBlog";
import NoData from "@components/dashboard/NoData";
import useBlogStore from "@store/blog";
import { useEffect, useState } from "react";
import { BASE_URL } from "@api/index";
import UploadMessage from "@components/dashboard/UploadMessage";

interface BlogData {
  id: string;
  title: string;
  content: string;
  image: string;
}
interface fetch_blog_type {
  setLoadingImages:React.Dispatch<React.SetStateAction<boolean>>;
  setBlogs:React.Dispatch<React.SetStateAction<BlogData[]>>;

}

export const fetchBlogs = async ({setLoadingImages,setBlogs}:fetch_blog_type) => {
  setLoadingImages(true);
  try {
    const response = await fetch(`${BASE_URL}/blog`);
    const data = await response.json();
    if (data.status === "success") {
      setBlogs(data.data);
    }
  } catch (error) {
    console.error("Error fetching blog data:", error);
  } finally {
    setLoadingImages(false);
  }
};



const Blog = () => {
  const set_component = useBlogStore((state) => state.set_component);
  const component = useBlogStore((state) => state.component);

  const handleUploadClick = () => {
    set_component({ value: "upload" });
  };

  // nodata,upload,data
  const [loadingImages, setLoadingImages] = useState(true);
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [deleteSuccessMessage, setDeleteSuccessMessage] =
    useState<boolean>(false);
  const [editSuccessMessage, setEditSuccessMessage] = useState<boolean>(false);


  const handlefetchBlogs = () => {
    fetchBlogs({setLoadingImages,setBlogs});
  };
  useEffect(() => {
    handlefetchBlogs();
  }, []);

  // let data: string[] = [];
  useEffect(() => {
    // data = [];
    if (blogs.length > 0 && component.value !== "upload") {
      set_component({ value: "data" });
    }
  }, [blogs.length, component.value, set_component]);

  return (
    <div>
      <div className="flex flex-row-reverse w-full items-center justify-between mb-4">
        <div>
          {editSuccessMessage && (
            <UploadMessage
              imageName="You have successfully edited the blog"
              onClose={() => setEditSuccessMessage(false)}
            />
          )}

          {deleteSuccessMessage && (
            <UploadMessage
              imageName="You have successfully deleted the blog"
              onClose={() => setDeleteSuccessMessage(false)}
            />
          )}
        </div>
        <div className="text-[20px] font-[600] text-BrandBlack1 mb-[16px]">
          {component.value === "nodata" || component.value === "data"
            ? "Blog"
            : "Upload Blog"}
        </div>
      </div>
      {component.value == "nodata" ? (
        <NoData
          buttonFunction={handleUploadClick}
          title="No Blog Uploaded"
          message="Start Uploading Blog"
          buttonText={`${
            loadingImages ? "Uploading Images..." : "Upload Image"
          }`}
          loading={loadingImages}
        />
      ) : component.value == "upload" ? (
        <UploadBlog fetchBlogs={handlefetchBlogs} />
      ) : (
        <UploadedBlog
          loadingImages={loadingImages}
          blogs={blogs}
          fetchBlogs={handlefetchBlogs}
          setEditSuccessMessage={setEditSuccessMessage}
          setDeleteSuccessMessage={setDeleteSuccessMessage}
        />
      )}
    </div>
  );
};

export default Blog;
