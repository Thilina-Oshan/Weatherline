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
  realFeelC: number;
  condition: WeatherMain;
  description: string;
  humidity: number;
  windSpeedMs: number;
  windKph: number;
  rainChance: number;
  uvIndex: number;
  pressureHpa: number;
  isDaytime: boolean;
  timezoneOffsetSec: number;
}

export interface ForecastDay {
  dateIso: string;
  label: string;
  highC: number;
  lowC: number;
  condition: WeatherMain;
  description: string;
}

export interface WeatherBundle {
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export class WeatherApiError extends Error {
  kind: "not-found" | "network" | "config" | "unknown";
  constructor(message: string, kind: WeatherApiError["kind"]) {
    super(message);
    this.kind = kind;
    this.name = "WeatherApiError";
  }
}