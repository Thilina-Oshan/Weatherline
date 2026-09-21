import type { ForecastDay } from "../types";
import { getWeatherTheme } from "../utils/weatherTheme";
import { WeatherIcon } from "./WeatherIcon";

interface Props {
  days: ForecastDay[];
}

export function Forecast({ days }: Props) {
  if (days.length === 0) return null;

  return (
    <section className="forecast" aria-label="5-day forecast">
      <h2 className="forecast__title">Next 5 days</h2>
      <div className="forecast__row">
        {days.map((day) => {
          const theme = getWeatherTheme(day.condition, true);
          return (
            <div className="forecast-card" key={day.dateIso}>
              <span className="forecast-card__day">{day.label}</span>
              <WeatherIcon icon={theme.icon} size={32} className="forecast-card__icon" />
              <span className="forecast-card__desc">{day.description}</span>
              <span className="forecast-card__temps">
                <span className="temp-high">{day.highC}°</span>
                <span className="temp-low">{day.lowC}°</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
