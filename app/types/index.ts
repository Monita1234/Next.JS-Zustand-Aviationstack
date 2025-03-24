export interface Aeropuerto {
    id: number;
    airport_name: string;
    iata_code: string;
    icao_code: string;
    latitude: number;
    longitude: number;
    gmt: string;
    country_name: string;
    city_name: string;
  }
  
  export interface ApiResponse {
    data: Aeropuerto[];
    pagination: {
      limit: number;
      offset: number;
      count: number;
      total: number;
    };
  }