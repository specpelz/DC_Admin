import { AirMonitoringData, data_type } from "../types/airMonitoringDataType";
import { create } from "zustand";

// interface useAirMonitoringStore_type{
//     value:boolean
// }
interface value_type {
  value: string;
}




interface success_type {
  component: value_type;
  set_component: (state: value_type) => void;
  upload_air_monitoring_success: boolean;
  set_upload_air_monitoring_success: (state: boolean) => void;
  air_monitoring_data: data_type[];
  set_air_monitoring_data: (state: data_type[]) => void;
  filtered_data: AirMonitoringData[];
  setFilteredData: (data: AirMonitoringData[]) => void;
}

const useAirMonitoringStore = create<success_type>((set) => ({
  component: {
    value: "nodata",
  },
  set_component: (state: value_type) => set({ component: state }),
  upload_air_monitoring_success: false,
  set_upload_air_monitoring_success: (state) =>
    set({ upload_air_monitoring_success: state }),
  air_monitoring_data: [],
  set_air_monitoring_data: (state) => set({ air_monitoring_data: state }),
  filtered_data: [], 
  setFilteredData: (data) => set(() => ({ filtered_data: data })),
}));

export default useAirMonitoringStore;
