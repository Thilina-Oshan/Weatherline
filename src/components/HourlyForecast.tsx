import { getWeatherTheme } from "../utils/weatherTheme";
import { WeatherIcon } from "./WeatherIcon";


export interface HourlyItem {
  time: string; // e.g. "6:00 AM", "9:00 AM"
  tempC: number;
  condition: string;
  isDaytime?: boolean;
}

interface Props {
  items?: HourlyItem[];
}

// Default/Mock data - API එකෙන් hourly data තවම නැත්නම් පෙන්වීමට
const defaultHourlyData: HourlyItem[] = [
  { time: "6:00 AM", tempC: 25, condition: "cloudy", isDaytime: true },
  { time: "9:00 AM", tempC: 28, condition: "partly-cloudy", isDaytime: true },
  { time: "12:00 PM", tempC: 33, condition: "sunny", isDaytime: true },
  { time: "3:00 PM", tempC: 34, condition: "sunny", isDaytime: true },
  { time: "6:00 PM", tempC: 32, condition: "sunny", isDaytime: true },
  { time: "9:00 PM", tempC: 30, condition: "partly-cloudy", isDaytime: false },
];

export function HourlyForecast({ items = defaultHourlyData }: Props) {
  return (
    <section className="card hourly-card">
      <h3 className="card-title">Today's Forecast</h3>
      <div className="hourly-row">
        {items.map((item, index) => {
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