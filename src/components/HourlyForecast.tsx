import { getWeatherTheme } from "../utils/weatherTheme";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherMain } from "../types";

export interface HourlyItem {
  time: string; // e.g., "6:00 AM", "9:00 AM"
  tempC: number;
  condition: WeatherMain;
  isDaytime?: boolean;
}

interface Props {
  items?: HourlyItem[];
}

// Default mock data provided with explicit WeatherMain casting to prevent type mismatch
const defaultHourlyData: HourlyItem[] = [
  { time: "6:00 AM", tempC: 25, condition: "Clouds" as WeatherMain, isDaytime: true },
  { time: "9:00 AM", tempC: 28, condition: "Clouds" as WeatherMain, isDaytime: true },
  { time: "12:00 PM", tempC: 33, condition: "Clear" as WeatherMain, isDaytime: true },
  { time: "3:00 PM", tempC: 34, condition: "Clear" as WeatherMain, isDaytime: true },
  { time: "6:00 PM", tempC: 32, condition: "Clear" as WeatherMain, isDaytime: true },
  { time: "9:00 PM", tempC: 30, condition: "Clouds" as WeatherMain, isDaytime: false },
];

export function HourlyForecast({ items = defaultHourlyData }: Props) {
  return (
    <section className="card hourly-card">
      <h3 className="card-title">Today's Forecast</h3>
      <div className="hourly-row">
        {items.map((item, index) => {
          // Resolve theme based on weather condition and time of day
          const theme = getWeatherTheme(item.condition, item.isDaytime ?? true);

          return (
            <div key={index} className="hourly-item">
              <span className="hourly-time">{item.time}</span>
              <WeatherIcon icon={theme.icon} size={36} className="hourly-icon" />
              <span className="hourly-temp">{Math.round(item.tempC)}°</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}