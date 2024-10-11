export interface AirMonitoring_data_type {
    city: string;
    country: string;
    latitude: string;
    lga: string;
    longitude: string;
    state: string;
    deviceUrl: string;
    }



export interface DataType {
    key: React.Key;
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