import NoData from "@components/dashboard/NoData";
import { useEffect, useState } from "react";


const Blog = () => {
  const handleUploadClick = () => {
    set_component("upload")
  };
// nodata,upload,data
  const [component,set_component]=useState<string>("nodata")
  let data:string[]= []
  useEffect(()=>{
    data=[]
    if(data.length > 0 && component !== "upload"){
      set_component("data")
    }
  },[data])
  return (
    <div>
      <div className="text-[20px] font-[600] text-BrandBlack1">
        { component === "nodata" || component === "data"? "Blog": "Upload Blog"}
      </div>
      { component == "nodata"? (      <NoData
        buttonFunction={handleUploadClick}
        title="No Blog Uploaded"
        message="Start Uploading Blog"
        buttonText="Upload Data"
      />): component == "upload" ? 
      (<div className="text-[16px]">a</div>):
      (<div className="text-[16px]">b</div>)}

    </div>
  );
};

export default Blog;
