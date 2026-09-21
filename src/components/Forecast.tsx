import type { ForecastDay } from "../types";
import { getWeatherTheme } from "../utils/weatherTheme";
import { WeatherIcon } from "./WeatherIcon";

interface Props {
  days: ForecastDay[];
}

export function Forecast({ days }: Props) {
  if (days.length === 0) return null;

  return (
    <aside className="forecast-pane">
      <h2 className="section-title">7-Day Forecast</h2>
      <div className="forecast-list">
        {days.map((day) => {
          const theme = getWeatherTheme(day.condition, true);
          return (
            <div className="forecast-item" key={day.dateIso}>
              <span className="forecast-item__day">{day.label}</span>
              <div className="forecast-item__weather">
                <WeatherIcon icon={theme.icon} size={28} className="forecast-card__icon" />
                <span className="forecast-item__desc">{day.description}</span>
              </div>
              <div className="forecast-item__temps">
                <span className="temp-high">{day.highC}°</span>
                <span className="temp-separator">/</span>
                <span className="temp-low">{day.lowC}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
