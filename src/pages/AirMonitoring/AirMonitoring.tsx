import { useEffect } from "react";
// import NoData from "../../components/dashboard/NoData";
import useAirMonitoringStore from "@store/airMonitoring";
import AirMonitoringForm from "./AirMonitoringForm";
import AirMonitoringTableTop from "./AirMonitoringTableTop";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import userToken from "@hooks/userToken";
import { BASE_URL } from "@api/index";

const AirMonitoring = () => {
  const queryClient = useQueryClient();
  const set_component = useAirMonitoringStore((state) => state.set_component);
  const set_air_monitoring_data = useAirMonitoringStore((state) => state.set_air_monitoring_data);
  const component = useAirMonitoringStore((state) => state.component);
  const { token } = userToken();

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading } = useQuery({
    queryKey: ["get_all_air_monitoring_data", token], 
    queryFn: fetch_air_monitoring_data,
    enabled: !!token,
    onSuccess: (data) => {
      if (data.data) {
        console.log("Fetched Data:", data.data); // Log fetched data
        set_air_monitoring_data(data.data.reverse()); // Update Zustand store
        if (data.data.length > 0 && component.value !== "upload") {
          set_component({ value: "data" });
        }
      }
    },
  });

  useEffect(() => {
    // Cleanup effect
    return () => {
      set_component({ value: "nodata" });
      queryClient.invalidateQueries(["get_all_air_monitoring_data"]);
    };
  }, [set_component, queryClient]);
  

  if (error) {
    console.error("Error fetching terminals:", error);
    return <div>There was an error: {(error as Error).message}</div>;
  }

  return (
    <div>
      <div className="text-[20px] font-[600] text-BrandBlack1">
        {component.value === "nodata"
          ? "Air Monitoring"
          : component.value === "upload"
          ? "Upload Data"
          : "Air Monitoring Data"}
      </div>
      { component.value === "upload" ? (
        <AirMonitoringForm />
      ) : (
        <AirMonitoringTableTop isLoading={isLoading} />
      )}
    </div>
  );
};

export default AirMonitoring;
