import type { CurrentWeather as CurrentWeatherType } from "../types";
import { getWeatherTheme } from "../utils/weatherTheme";
import { WeatherIcon } from "./WeatherIcon";

interface Props {
  data: CurrentWeatherType;
}

export function CurrentWeather({ data }: Props) {
  const theme = getWeatherTheme(data.condition, data.isDaytime);
  const localTime = new Date(Date.now() + data.timezoneOffsetSec * 1000 - new Date().getTimezoneOffset() * -60000);

  return (
    <section className="current-weather">
      <div className="current-weather__top">
        <div>
          <h1 className="city-name">
            {data.cityName}
            <span className="country-code">{data.country}</span>
          </h1>
          <p className="local-time">
            {localTime.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })} local time
          </p>
        </div>
        <WeatherIcon icon={theme.icon} size={64} className="current-weather__icon" />
      </div>

      <div className="temp-hero">
        <span className="temp-hero__value">{data.tempC}</span>
        <span className="temp-hero__unit">°C</span>
      </div>
      <p className="condition-desc">
        {data.description} · Feels like {data.feelsLikeC}°C
      </p>

      <dl className="metrics">
        <div className="metric">
          <dt>Humidity</dt>
          <dd>{data.humidity}%</dd>
        </div>
        <div className="metric">
          <dt>Wind</dt>
          <dd>{data.windSpeedMs} m/s</dd>
        </div>
        <div className="metric">
          <dt>Pressure</dt>
          <dd>{data.pressureHpa} hPa</dd>
        </div>
      </dl>
    </section>
  );
}
