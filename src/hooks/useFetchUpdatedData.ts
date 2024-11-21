import useAirMonitoringStore from '@store/airMonitoring';
import userToken from './userToken';
import { BASE_URL } from '@api/index';

const useFetchUpdatedData = () => {

  const token = userToken()
    
    const set_air_monitoring_data = useAirMonitoringStore((state) => state.set_air_monitoring_data);
    
    
    const fetchUpdatedData = async () => {
      const response = await fetch(`${BASE_URL}/air-monitoring`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      set_air_monitoring_data(data.data.reverse());
      console.log(data.data.reverse(), "the_data choke");
    
    };
    return { fetchUpdatedData};
}

export default useFetchUpdatedData