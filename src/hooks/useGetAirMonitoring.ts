import { BASE_URL } from "@api/index";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import userToken from "./userToken";
import { Air_monitoring_data_type_v2 } from "../types/airMonitoringDataType";

const useGetAirMonitoring = () => {
  const { token } = userToken();

  const [isLoading, setIsLoading] = useState(false);

  const getData = async (): Promise<Air_monitoring_data_type_v2> => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/air-monitoring`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach token here
          },
        }
      );
      setIsLoading(false);

      if (response.data.status === "success") {
        return {
          status: response.data.status,
          statusCode: response.data.statusCode,
          message: response.data.message,
          data: response.data.data,
        };
      } else {
        throw new Error(response.data.message || "Fetch failed!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err.response?.data?.message || "Fetch failed!");
      throw err;
    }
  };

  return { getData, isLoading };
};

export default useGetAirMonitoring;
