import { useEffect, useState, type CSSProperties } from "react";
import { SearchBar } from "./components/SearchBar";
import { CurrentWeather } from "./components/CurrentWeather";
import { Forecast } from "./components/Forecast";
import { ThemeToggle } from "./components/ThemeToggle";
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
  const [mode, setMode] = useState<"light" | "dark">(() =>
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const { locate, isLocating, error: geoError } = useGeolocation();

  async function runSearch(city: string) {
    setState("loading");
    setLastQuery({ type: "city", value: city });
    try {
      const result = await weatherApi.getWeatherByQuery(city);
      setBundle(result);
      setState("loaded");
    } catch (err) {
      setErrorMessage(describeError(err));
      setState("error");
    }
  }

  async function runLocationSearch() {
    try {
      const { lat, lon } = await locate();
      setLastQuery({ type: "coords", lat, lon });
      setState("loading");
      const result = await weatherApi.getWeatherByCoords(lat, lon);
      setBundle(result);
      setState("loaded");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : describeError(err));
      setState("error");
    }
  }

  function retry() {
    if (!lastQuery) return;
    if (lastQuery.type === "city") void runSearch(lastQuery.value);
    else void weatherApi
      .getWeatherByCoords(lastQuery.lat, lastQuery.lon)
      .then((result) => {
        setBundle(result);
        setState("loaded");
      })
      .catch((err) => {
        setErrorMessage(describeError(err));
        setState("error");
      });
  }

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const theme = bundle
    ? getWeatherTheme(bundle.current.condition, bundle.current.isDaytime)
    : { gradient: "linear-gradient(160deg, #2E86D8 0%, #5FB0E8 45%, #F5A623 130%)", accent: "#5FB0E8" };

  return (
    <div
      className="app"
      style={{ "--bg-gradient": theme.gradient, "--accent": theme.accent } as CSSProperties}
    >
      <div className="app__backdrop" />
      <div className="app__content">
        <header className="app__header">
          <p className="wordmark">Sky Pulse</p>
          <ThemeToggle mode={mode} onToggle={() => setMode((m) => (m === "dark" ? "light" : "dark"))} />
        </header>

        <SearchBar onSearch={runSearch} onUseLocation={runLocationSearch} isLocating={isLocating} />

        {geoError && state !== "error" && <p className="geo-hint">{geoError}</p>}

        <main className="app__main">
          {state === "idle" && <EmptyState />}
          {state === "loading" && <LoadingSpinner />}
          {state === "error" && <ErrorBanner message={errorMessage} onRetry={lastQuery ? retry : undefined} />}
          {state === "loaded" && bundle && (
            <>
              <CurrentWeather data={bundle.current} />
              <Forecast days={bundle.forecast} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function describeError(err: unknown): string {
  if (err instanceof WeatherApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Something unexpected happened. Please try again.";
}
