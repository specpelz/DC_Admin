import { useState } from "react";
import NoData from "./NoData";
import AirMonitoringForm from "./AirMonitoringForm";

const AirMonitoring = () => {
  const handleUploadClick = () => {
    set_component("upload")
  };
// nodata,upload,data
  const [component,set_component]=useState<string>("nodata")
  return (
    <div>
      <div className="text-[20px] font-[600] text-BrandBlack1">
        { component == "nodata"? "Air Monitoring": component == "upload" ? "Upload Data":"Air Monitoring Data"}
      </div>
      { component == "nodata"? (      <NoData
        buttonFunction={handleUploadClick}
        title="No Data Uploaded"
        message="Start Uploading Data"
        buttonText="Upload Data"
      />): component == "upload" ? 
      (<AirMonitoringForm/>):
      (<div>data availalble</div>)}

    </div>
  );
};

export default AirMonitoring;
