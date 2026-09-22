import { useEffect, useState, type CSSProperties } from "react";
import { Sidebar } from "./components/Sidebar";
import { SearchBar } from "./components/SearchBar";
import { CurrentWeather } from "./components/CurrentWeather";
import { AirConditions } from "./components/AirConditions";
import { HourlyForecast } from "./components/HourlyForecast";
import { Forecast } from "./components/Forecast";
import { LoadingSpinner, ErrorBanner, EmptyState } from "./components/StatusViews";
import { weatherApi } from "./api/weather";
import { useGeolocation } from "./hooks/useGeolocation";
import { getWeatherTheme } from "./utils/weatherTheme";
import { WeatherApiError, type WeatherBundle } from "./types";

type LoadState = "idle" | "loading" | "loaded" | "error";

export default function App() {
  const [bundle, setBundle] = useState<WeatherBundle | null>(null);
  const [state, setState] = useState<LoadState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastQuery, setLastQuery] = useState<{ type: "city"; value: string } | { type: "coords"; lat: number; lon: number } | null>(null);

  const [mode] = useState<"light" | "dark">(
    () => window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  const { locate, isLocating, error: geoError } = useGeolocation();

  // Fetches weather data by city name query
  async function runSearch(city: string) {
    setState("loading");
    setLastQuery({ type: "city", value: city });
    try {
      const result = await weatherApi.getWeatherByQuery(city);
      setBundle(result);
      setState("loaded");
    } catch (err: unknown) {
      setErrorMessage(describeError(err));
      setState("error");
    }
  }

  // Fetches weather data using device geolocation coordinates
  async function runLocationSearch() {
    try {
      const { lat, lon } = await locate();
      setLastQuery({ type: "coords", lat, lon });
      setState("loading");
      const result = await weatherApi.getWeatherByCoords(lat, lon);
      setBundle(result);
      setState("loaded");
    } catch (err: unknown) {
      setErrorMessage(describeError(err));
      setState("error");
    }
  }

  // Retries fetching weather data for the last attempted search query
  function retry() {
    if (!lastQuery) return;
    if (lastQuery.type === "city") void runSearch(lastQuery.value);
    else void weatherApi
      .getWeatherByCoords(lastQuery.lat, lastQuery.lon)
      .then((result) => {
        setBundle(result);
        setState("loaded");
      })
      .catch((err: unknown) => {
        setErrorMessage(describeError(err));
        setState("error");
      });
  }

  // Apply dark/light theme dataset attribute to the document root element
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  // Compute theme styling dynamically based on weather condition
  const theme = bundle
    ? getWeatherTheme(bundle.current.condition, bundle.current.isDaytime)
    : { gradient: "radial-gradient(circle at top right, #242c3d 0%, #10141d 100%)", accent: "#2e86eb" };

  return (
    <div
      className="dashboard-container"
      style={{ "--bg-gradient": theme.gradient, "--accent": theme.accent } as CSSProperties}
    >
      <Sidebar />

      <main className="main-pane">
        <SearchBar onSearch={runSearch} onUseLocation={runLocationSearch} isLocating={isLocating} />

        {geoError && state !== "error" && <p className="geo-hint">{geoError}</p>}

        {state === "idle" && <EmptyState />}
        {state === "loading" && <LoadingSpinner />}
        {state === "error" && <ErrorBanner message={errorMessage} onRetry={lastQuery ? retry : undefined} />}

        {state === "loaded" && bundle && (
          <>
            <CurrentWeather data={bundle.current} />
            <HourlyForecast />
            <AirConditions data={bundle.current} />
          </>
        )}
      </main>

      <aside className="right-pane">
        {state === "loaded" && bundle ? (
          <Forecast days={bundle.forecast} />
        ) : (
          <div className="forecast-placeholder">Search a location to see weekly forecast</div>
        )}
      </aside>

    </div>
  );
}

// Formats error messages safely based on unknown error types
function describeError(err: unknown): string {
  if (err instanceof WeatherApiError) return err.message;
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Something unexpected happened. Please try again.";
}
