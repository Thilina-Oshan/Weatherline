# Weatherline — Weather Dashboard

A modern, responsive weather dashboard built with React + TypeScript + Vite.

## Features
- Search live weather by city name
- Current conditions: temperature, condition, humidity, wind speed, pressure
- 5-day forecast with daily highs/lows and icons
- "Use my location" button (browser geolocation)
- Dynamic background gradient that shifts with the weather condition and time of day
- Glassmorphism UI with a light/dark mode toggle
- Friendly loading and error states

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Get a free API key**
   This app uses [OpenWeatherMap](https://openweathermap.org/api) (free tier covers current weather + 5 day/3 hour forecast).
   - Sign up at https://home.openweathermap.org/users/sign_up
   - Copy your API key from your account page
   - New keys can take up to ~2 hours to activate

3. **Add your key**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env`:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_key_here
   ```

4. **Run it**
   ```bash
   npm run dev
   ```
   Open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  api/weather.ts          fetches + normalizes OpenWeatherMap data
  components/             SearchBar, CurrentWeather, Forecast, WeatherIcon, ThemeToggle, StatusViews
  hooks/useGeolocation.ts wraps the browser Geolocation API
  utils/weatherTheme.ts   maps condition + day/night to gradient + icon
  types.ts                shared TypeScript types
  App.tsx                 app state + data flow
  index.css               design system + responsive layout
```

## Notes
- Temperatures are in Celsius (metric units). To switch to imperial, change `units=metric` to `units=imperial` in `src/api/weather.ts` and update the `°C` labels.
- If you'd rather use WeatherAPI.com instead of OpenWeatherMap, swap the request/response shapes in `src/api/weather.ts` — the rest of the app only depends on the `WeatherBundle` type in `src/types.ts`.
