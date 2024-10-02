import UploadBlog from "@components/dashboard/blog/UploadBlog";
import UploadedBlog from "@components/dashboard/blog/UploadedBlog";
import NoData from "@components/dashboard/NoData";
import useBlogStore from "@store/blog";
import { useEffect} from "react";


const Blog = () => {

  const set_component = useBlogStore(
    (state) => state.set_component
  );
  const component = useBlogStore(
    (state) => state.component
  );



  const handleUploadClick = () => {
    set_component({value:"upload"})
  };
// nodata,upload,data

  let data:string[]= []
  useEffect(()=>{
    data=[]
    if(data.length > 0 && component.value !== "upload"){
      set_component({value:"data"})
    }
  },[data])
  return (
    <div>
      <div className="text-[20px] font-[600] text-BrandBlack1">
        { component.value === "nodata" || component.value === "data"? "Blog": "Upload Blog"}
      </div>
      { component.value == "nodata"? (      <NoData
        buttonFunction={handleUploadClick}
        title="No Blog Uploaded"
        message="Start Uploading Blog"
        buttonText="Upload Data"
      />): component.value == "upload" ? 
      (<UploadBlog/>):
      (<UploadedBlog/>)}

    </div>
  );
};

export default Blog;
