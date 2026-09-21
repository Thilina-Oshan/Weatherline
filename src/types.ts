export type WeatherMain =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Drizzle"
  | "Thunderstorm"
  | "Snow"
  | "Mist"
  | "Smoke"
  | "Haze"
  | "Dust"
  | "Fog"
  | "Sand"
  | "Ash"
  | "Squall"
  | "Tornado";

export interface CurrentWeather {
  cityName: string;
  country: string;
  tempC: number;
  feelsLikeC: number;
  
  // Added properties to fix AirConditions.tsx TypeScript errors
  realFeelC: number;
  windKph: number;
  rainChance: number;
  uvIndex: number;

  condition: WeatherMain;
  description: string;
  humidity: number;
  windSpeedMs: number;
  pressureHpa: number;
  isDaytime: boolean;
  timezoneOffsetSec: number;
}