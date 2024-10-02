import { useEffect} from "react";
import NoData from "../NoData";
import AirMonitoringForm from "./AirMonitoringForm";
import AirMonitoringTableTop from "./AirMonitoringTableTop";
import useAirMonitoringStore from "@store/airMonitoring";

const AirMonitoring = () => {

// nodata,upload,data
  const handleUploadClick =()=>{
    set_component({value:"upload"})
  }

const set_component = useAirMonitoringStore(
  (state) => state.set_component
);
const component = useAirMonitoringStore(
  (state) => state.component
);

  let data:string[]= []
  useEffect(()=>{
    console.log(component)
    data=[]
    if(data.length > 0 && component.value !== "upload"){
      set_component({value:"data"})
    }
  }, [data]);
  return (
    <div>
      <div className="text-[20px] font-[600] text-BrandBlack1">
        { component?.value == "nodata"? "Air Monitoring": component?.value == "upload" ? "Upload Data":"Air Monitoring Data"}
      </div>
      { component?.value == "nodata"? (      <NoData
        buttonFunction={handleUploadClick}
        title="No Data Uploaded"
        message="Start Uploading Data"
        buttonText="Upload Data"
      />): component?.value == "upload" ? 
      (<AirMonitoringForm/>):
      (<AirMonitoringTableTop />)}

    </div>
  );
};

export default AirMonitoring;
