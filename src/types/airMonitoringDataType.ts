export interface AirMonitoring_data_type {

    deviceUid: string;
    }



export interface DataType {
      key: string;
      date: string;
      serial_number:string;
      location:string;
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
    createdAt: string;
    updatedAt: string;
    }


    

export interface Air_monitoring_data_type_v2{
    
        status: string;
        statusCode: number;
        message: string;
        data: AirMonitoring_data_type_form[];
      
}


export interface air_monitoring_fetch_response_data_type{
    
    status: string;
    statusCode: number;
    message: string;
    data: {};
      
}


export interface data_type {
  id: string;
  device_uid: string;
  serial_number: string;
  location: string;
  lat: string;
  lon: string;
  createdAt: string;
  updatedAt: string;
  airReadingId: string;
  aqi: string;
  humidity: string;
  pm01_0: string;
  pm02_5: string;
  pm10_0: string;
  pressure: string;
  temperature: string;
  voltage: string;
  captured: string;
  airReadingCreatedAt: string;
  airReading:airReadingDataType[];
}

  

  export interface airReadingDataType{
    id: string;
    device_uid: string;
    serial_number: string;
    location:string;
    lat: string;
    lon: string;
    createdAt: string;
    updatedAt:string;
    airReadingId: string;
    aqi: string;
    humidity: string;
    pm01_0: string;
    pm02_5:string;
    pm10_0: string;
    pressure: string;
    temperature: string;
    voltage: string;
    captured: string;
    airReadingCreatedAt: string;
  }
// export interface data_type {
//     lon: string;
//     lat: string;
//     device_uid: string;
//     city: string;
//     country: string;
//     createdAt: string;
//     id: string;
//     lga: string;
//     state: string;
//     updatedAt: string;
//   }
  
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


  export interface FlattenedData {
    id: string;
    device_uid: string;
    serial_number: string;
    location: string;
    lat: string;
    lon: string;
    createdAt: string;
    updatedAt: string;
    airReadingId: string;
    aqi: string;
    humidity: string;
    pm01_0: string;
    pm02_5: string;
    pm10_0: string;
    pressure: string;
    temperature: string;
    voltage: string;
    captured: string;
    airReadingCreatedAt: string;
  };