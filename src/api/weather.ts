import type { CurrentWeather, ForecastDay, WeatherBundle, WeatherMain } from "../types";
import { WeatherApiError } from "../types";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined;

function assertApiKey(): string {
  if (!API_KEY) {
    throw new WeatherApiError(
      "No API key configured. Add VITE_OPENWEATHER_API_KEY to your .env file.",
      "config"
    );
  }
  return API_KEY;
}

async function fetchJson<T>(url: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new WeatherApiError("Couldn't reach the weather service. Check your connection.", "network");
  }

  if (response.status === 404) {
    throw new WeatherApiError("We couldn't find that city. Try a different spelling.", "not-found");
  }
  if (response.status === 401) {
    throw new WeatherApiError("The API key was rejected. Double-check your .env file.", "config");
  }
  if (!response.ok) {
    throw new WeatherApiError("Something went wrong fetching the forecast. Please try again.", "unknown");
  }
  return (await response.json()) as T;
}

interface OwmCurrentResponse {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: { temp: number; feels_like: number; humidity: number; pressure: number };
  weather: { main: string; description: string }[];
  wind: { speed: number };
  rain?: { "1h"?: number; "3h"?: number };
  pop?: number; // Probability of precipitation if present
  dt: number;
  timezone: number;
}

interface OwmForecastResponse {
  list: {
    dt: number;
    dt_txt: string;
    main: { temp_min: number; temp_max: number };
    weather: { main: string; description: string }[];
    pop?: number;
  }[];
}

function toWeatherMain(raw: string): WeatherMain {
  const known: WeatherMain[] = [
    "Clear", "Clouds", "Rain", "Drizzle", "Thunderstorm", "Snow",
    "Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall", "Tornado",
  ];
  return (known.find((k) => k === raw) ?? "Clouds") as WeatherMain;
}

function buildCurrent(data: OwmCurrentResponse): CurrentWeather {
  const weather = data.weather[0];
  const nowUtc = data.dt;
  const isDaytime = nowUtc >= data.sys.sunrise && nowUtc <= data.sys.sunset;
  
  // Calculate wind speed in km/h from m/s (1 m/s = 3.6 km/h)
  const windKph = Math.round(data.wind.speed * 3.6);

  // Fallback calculation for rain chance / probability of precipitation
  const rainChance = data.pop ? Math.round(data.pop * 100) : data.rain ? 80 : 0;

  return {
    cityName: data.name,
    country: data.sys.country,
    tempC: Math.round(data.main.temp),
    feelsLikeC: Math.round(data.main.feels_like),
    
    // Mapped properties required by AirConditions component
    realFeelC: Math.round(data.main.feels_like),
    windKph,
    rainChance,
    uvIndex: 0, // OpenWeather free endpoint does not include UV index; fallback set to 0
    
    condition: toWeatherMain(weather.main),
    description: weather.description,
    humidity: data.main.humidity,
    windSpeedMs: Math.round(data.wind.speed * 10) / 10,
    pressureHpa: data.main.pressure,
    isDaytime,
    timezoneOffsetSec: data.timezone,
  };
}

/** Collapses 3-hour forecast slices into one high/low entry per calendar day. */
function buildForecast(data: OwmForecastResponse): ForecastDay[] {
  const byDate = new Map<string, { min: number; max: number; conditions: Map<string, number> }>();

  for (const slice of data.list) {
    const date = slice.dt_txt.split(" ")[0];
    const entry = byDate.get(date) ?? { min: Infinity, max: -Infinity, conditions: new Map() };
    entry.min = Math.min(entry.min, slice.main.temp_min);
    entry.max = Math.max(entry.max, slice.main.temp_max);

    // Favor the mid-day slice's condition where available, else count frequency.
    const hour = slice.dt_txt.split(" ")[1]?.slice(0, 2);
    const weight = hour === "12" || hour === "13" || hour === "14" ? 5 : 1;
    const main = slice.weather[0]?.main ?? "Clouds";
    entry.conditions.set(main, (entry.conditions.get(main) ?? 0) + weight);

    byDate.set(date, entry);
  }

  const days = Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 5)
    .map(([date, entry]) => {
      const topCondition = Array.from(entry.conditions.entries()).sort((a, b) => b[1] - a[1])[0][0];
      const label = new Date(date + "T12:00:00").toLocaleDateString(undefined, { weekday: "short" });
      return {
        dateIso: date,
        label,
        highC: Math.round(entry.max),
        lowC: Math.round(entry.min),
        condition: toWeatherMain(topCondition),
        description: topCondition.toLowerCase(),
      } satisfies ForecastDay;
    });

  return days;
}

async function getWeatherByQuery(query: string): Promise<WeatherBundle> {
  const key = assertApiKey();
  const [current, forecast] = await Promise.all([
    fetchJson<OwmCurrentResponse>(
      `${BASE_URL}/weather?q=${encodeURIComponent(query)}&units=metric&appid=${key}`
    ),
    fetchJson<OwmForecastResponse>(
      `${BASE_URL}/forecast?q=${encodeURIComponent(query)}&units=metric&appid=${key}`
    ),
  ]);
  return { current: buildCurrent(current), forecast: buildForecast(forecast) };
}

async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherBundle> {
  const key = assertApiKey();
  const [current, forecast] = await Promise.all([
    fetchJson<OwmCurrentResponse>(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    ),
    fetchJson<OwmForecastResponse>(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    ),
  ]);
  return { current: buildCurrent(current), forecast: buildForecast(forecast) };
}

export const weatherApi = { getWeatherByQuery, getWeatherByCoords };