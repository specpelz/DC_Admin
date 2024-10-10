import { useEffect} from "react";
import NoData from "../../components/dashboard/NoData";
import useAirMonitoringStore from "@store/airMonitoring";
import AirMonitoringForm from "./AirMonitoringForm";
import AirMonitoringTableTop from "./AirMonitoringTableTop";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import userToken from "@hooks/userToken";
import { BASE_URL } from "@api/index";

const AirMonitoring = () => {





  const queryClient = useQueryClient(); 


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



const set_air_monitoring_data = useAirMonitoringStore((state)=> state.set_air_monitoring_data)




const {token}=userToken()
const { data, error, isLoading } = useQuery({
  queryKey: ["get_all_air_monitoring_data", userToken,component],
  queryFn: () => fetch_air_monitoring_data(),
  enabled: !!userToken,
});



  // Add cleanup effect
  useEffect(() => {
    return () => {
      // This will run when the component unmounts
      set_component({ value: "nodata" });
      
      // Optionally, also invalidate the query cache
      queryClient.invalidateQueries(["get_all_air_monitoring_data"]);
    };
  }, [set_component, queryClient]);


useEffect(() => {
  if (data?.data) {
    set_air_monitoring_data(data.data.reverse());
    
    if (data.data.length > 0 && component.value !== "upload") {
      set_component({ value: "data" });
    }
  }
}, [data, component.value, set_air_monitoring_data, set_component]);










// useEffect(()=>{
//   console.log(data?.data,"we out here")
//   set_air_monitoring_data(data?.data)

// }, [data]);


// useEffect(()=>{

//   if(data?.data?.length > 0 && component.value !== "upload"){
//     set_component({value:"data"})
//   }

   
//   return () => {
//     set_component({ value: "nodata" }); 
//   };
// }, [data]);










const fetch_air_monitoring_data = async () => {
  const response = await fetch(`${BASE_URL}/air-monitoring`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }

  return response.json();
};

if (error) {
  console.error("Error fetching terminals:", error);
  return <div>There was an error: {(error as Error).message}</div>;
}






















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
        loading={isLoading}
      />): component?.value == "upload" ? 
      (<AirMonitoringForm/>):
      (<AirMonitoringTableTop />)}

    </div>
  );
};

export default AirMonitoring;
