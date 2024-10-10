import { create } from "zustand";

// interface useAirMonitoringStore_type{
//     value:boolean
// }
interface value_type {
  value: string;
}

interface data_type {
  city: string;
  country: string;
  createdAt: string;
  deviceUrl: string;
  id: string;
  latitude: string;
  lga: string;
  longitude: string;
  state: string;
  updatedAt: string;
}

interface success_type {
  component: value_type;
  set_component: (state: value_type) => void;
  upload_air_monitoring_success: boolean;
  set_upload_air_monitoring_success: (state: boolean) => void;
  air_monitoring_data: data_type[];
  set_air_monitoring_data: (state: data_type[]) => void;
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
}));

export default useAirMonitoringStore;
