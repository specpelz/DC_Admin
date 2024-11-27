import { BASE_URL } from "@api/index";
import { air_monitoring_fetch_response_data_type, AirMonitoring_data_type } from "../types/airMonitoringDataType";
import axios from "axios"
import { useState } from "react";
import toast from "react-hot-toast";
import userToken from "./userToken";
import useAirMonitoringStore from "@store/airMonitoring";




const usePostAirMonitoring = () => {
    const set_component = useAirMonitoringStore(
        (state) => state.set_component
      );
      const set_success_message = useAirMonitoringStore((state) => state.set_upload_air_monitoring_success);
      const {token}=userToken()
     


    const [isLoading, setIsLoading] = useState(false);
  
    const postData = async (data: AirMonitoring_data_type): Promise<air_monitoring_fetch_response_data_type> => {
      setIsLoading(true);
      try {
        const response = await axios.post<air_monitoring_fetch_response_data_type>(
          `${BASE_URL}/air-monitoring/${data}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Attach token here
            }
          }
     
        );
        setIsLoading(false);
      
        if(response.data.statusCode === 201){
            set_success_message(true)
            setTimeout(() => {
                set_success_message(false)
                set_component({ value: "data" });
              }, 2000);

            return {
                status: response.data.status,
                statusCode: response.data.statusCode,
                message: response.data.message,
                data: response.data.data
             }
        }
        else {
            throw new Error(response.data.message || "Upload failed!");
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setIsLoading(false);
        toast.error(err.response?.data?.message || "Upload failed!");
        throw err;
      }
    };
  
    return { postData, isLoading };
  };
  
  export default usePostAirMonitoring;
  