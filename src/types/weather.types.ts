export interface WeatherCondition {
    id: number;
    main: string;       
    description: string;
    icon: string;
}

export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface CurrentWeather {
  name: string;
  weather: WeatherCondition[];
  main: MainWeatherData;
  wind: {
    speed: number;
  };
  dt: number;
  timezone: number;
  sys: {
    country: string;
  };
}


export interface ForecastEntry {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  dt_txt: string;   
}


export interface ForecastResponse {
  list: ForecastEntry[];
  city: {
    name: string;
    country: string;
  };
}
