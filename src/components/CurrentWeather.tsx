import type { CurrentWeather as CurrentWeatherType } from "../types";
import { getWeatherTheme } from "../utils/weatherTheme";
import { WeatherIcon } from "./WeatherIcon";

interface Props {
  data: CurrentWeatherType;
}

export function CurrentWeather({ data }: Props) {
  const theme = getWeatherTheme(data.condition, data.isDaytime);

  return (
    <section className="current-weather-pane">
      <div className="current-weather-header">
        <h1 className="city-name">{data.cityName}</h1>
        {/* NOTE: the original version labeled this "Chance of rain" but bound
            it to `humidity` - that's a different number. Fixed to show the
            metric it actually displays. */}
        <p className="chance-of-rain">Humidity: {data.humidity}%</p>
      </div>
      <div className="current-temp-large">
        <span className="temp-value">{data.tempC}</span>
        <span className="temp-unit">°</span>
      </div>
      <div className="weather-icon-center">
        <WeatherIcon icon={theme.icon} size={160} className="large-icon" />
      </div>
    </section>
  );
}
