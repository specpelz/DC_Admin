export interface AirMonitoring_data_type {

    deviceUid: string;
    }



export interface DataType {
      key: string;
      date: string;
      country: string;
      state: string;
      lga: string;
      city: string;
      longitude: string;
      latitude: string;
      deviceUrl: string;
  }
  
export interface AirMonitoring_data_type_form {
    city: string;
    country: string;
    latitude: string;
    lga: string;
    longitude: string;
    state: string;
    deviceUrl: string;
    createdAt: string,
    updatedAt: string
    }


    

export interface Air_monitoring_data_type_v2{
    
        status: string,
        statusCode: number,
        message: string,
        data: AirMonitoring_data_type_form[]
      
}


export interface air_monitoring_fetch_response_data_type{
    
    status: string,
    statusCode: number,
    message: string,
    data: {}
      
}


export interface data_type {
    lon: string;
    lat: string;
    device_uid: string;
    city: string;
    country: string;
    createdAt: string;
    // deviceUrl: string;
    id: string;
    // latitude: string;
    lga: string;
    // longitude: string;
    state: string;
    updatedAt: string;
  }
  
 export interface AirMonitoringData {
    id:string;
    createdAt: string;
    country: string;
    state: string;
    lga: string;
    city: string;
    longitude: string;
    latitude: string;
    deviceUrl: string;
  }