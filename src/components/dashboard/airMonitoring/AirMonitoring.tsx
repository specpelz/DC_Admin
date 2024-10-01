import { useEffect, useState } from "react";
import NoData from "../NoData";
import AirMonitoringForm from "./AirMonitoringForm";
import AirMonitoringTableTop from "./AirMonitoringTableTop";

const AirMonitoring = () => {
  const handleUploadClick = () => {
    set_component("upload");
  };
  // nodata,upload,data
  const [component, set_component] = useState<string>("nodata");
  let data: string[] = [];
  useEffect(() => {
    data = ["r"];
    if (data.length > 0 && component !== "upload") {
      set_component("data");
    }
  }, [data]);
  return (
    <div>
      <div className="text-[20px] font-[600] text-BrandBlack1">
        {component == "nodata"
          ? "Air Monitoring"
          : component == "upload"
          ? "Upload Data"
          : "Air Monitoring Data"}
      </div>
      {component == "nodata" ? (
        <NoData
          buttonFunction={handleUploadClick}
          title="No Data Uploaded"
          message="Start Uploading Data"
          buttonText="Upload Data"
        />
      ) : component == "upload" ? (
        <AirMonitoringForm />
      ) : (
        <AirMonitoringTableTop clickFunction={handleUploadClick} />
      )}
    </div>
  );
};

export default AirMonitoring;
