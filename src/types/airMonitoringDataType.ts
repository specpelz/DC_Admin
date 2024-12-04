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
  histories:historiesDataType[];
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
  export interface historiesDataType{
    id: string;
    airReadingId: string;
    aqi: string;
    humidity: string;
    pm1_0: string;
    pm2_5:string;
    pm10_0: string;
    date:string;
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


  export interface FlattenedDataType {
    deviceId: string;
    deviceUid: string;
    serialNumber: string;
    location: string;
    latitude: string;
    longitude: string;
    createdAt: string;
    updatedAt: string;
    readingType: string; // "Air Reading" or "History"
    readingId: string;
    aqi: number | null;
    humidity: number | null;
    pm01_0: number | null;
    pm02_5: number | null;
    pm10_0: number | null;
    pressure: number | null;
    temperature: number | null;
    voltage: number | null;
    captured: number | null;
    readingCreatedAt: string;
  }
  