import type { WeatherMain } from "../types";

export interface WeatherTheme {
  gradient: string;
  accent: string;
  icon: string;
  label: string;
}

const DAY: Record<string, WeatherTheme> = {
  Clear: { gradient: "linear-gradient(160deg, #2E86D8 0%, #5FB0E8 45%, #F5A623 130%)", accent: "#F5A623", icon: "sun", label: "Clear sky" },
  Clouds: { gradient: "linear-gradient(160deg, #6B7A8F 0%, #8D9BAE 55%, #C7CFD9 130%)", accent: "#8D9BAE", icon: "cloud", label: "Cloudy" },
  Rain: { gradient: "linear-gradient(160deg, #223A55 0%, #2F5876 55%, #0EA5E9 140%)", accent: "#0EA5E9", icon: "rain", label: "Rain" },
  Drizzle: { gradient: "linear-gradient(160deg, #2C4A63 0%, #3E7291 55%, #38BDF8 140%)", accent: "#38BDF8", icon: "drizzle", label: "Drizzle" },
  Thunderstorm: { gradient: "linear-gradient(160deg, #1E1B3A 0%, #372E6B 55%, #7C6FE0 140%)", accent: "#7C6FE0", icon: "storm", label: "Thunderstorm" },
  Snow: { gradient: "linear-gradient(160deg, #5B7188 0%, #A9BCCB 55%, #EAF2F8 140%)", accent: "#EAF2F8", icon: "snow", label: "Snow" },
  Mist: { gradient: "linear-gradient(160deg, #62707D 0%, #90A0AC 55%, #C7D2D9 140%)", accent: "#90A0AC", icon: "mist", label: "Misty" },
  Fog: { gradient: "linear-gradient(160deg, #62707D 0%, #90A0AC 55%, #C7D2D9 140%)", accent: "#90A0AC", icon: "mist", label: "Foggy" },
  Haze: { gradient: "linear-gradient(160deg, #7A7157 0%, #A79B77 55%, #D8CBA5 140%)", accent: "#A79B77", icon: "mist", label: "Hazy" },
  Smoke: { gradient: "linear-gradient(160deg, #5A5A5A 0%, #7D7D7D 55%, #ADADAD 140%)", accent: "#7D7D7D", icon: "mist", label: "Smoky" },
  Dust: { gradient: "linear-gradient(160deg, #8A6A42 0%, #B08C5C 55%, #D9BE8F 140%)", accent: "#B08C5C", icon: "mist", label: "Dusty" },
  Sand: { gradient: "linear-gradient(160deg, #8A6A42 0%, #B08C5C 55%, #D9BE8F 140%)", accent: "#B08C5C", icon: "mist", label: "Sandy" },
  Ash: { gradient: "linear-gradient(160deg, #4A4A4A 0%, #6B6B6B 55%, #949494 140%)", accent: "#6B6B6B", icon: "mist", label: "Ashy" },
  Squall: { gradient: "linear-gradient(160deg, #223A55 0%, #2F5876 55%, #0EA5E9 140%)", accent: "#0EA5E9", icon: "rain", label: "Squall" },
  Tornado: { gradient: "linear-gradient(160deg, #1E1B3A 0%, #372E6B 55%, #7C6FE0 140%)", accent: "#7C6FE0", icon: "storm", label: "Tornado" },
};

const NIGHT: Record<string, WeatherTheme> = {
  Clear: { gradient: "linear-gradient(160deg, #060B18 0%, #101B35 55%, #2C3E66 140%)", accent: "#8FA3D9", icon: "moon", label: "Clear night" },
  Clouds: { gradient: "linear-gradient(160deg, #10131C 0%, #262B3A 55%, #3E465C 140%)", accent: "#6B7386", icon: "cloud-moon", label: "Cloudy night" },
  Rain: { gradient: "linear-gradient(160deg, #0A1420 0%, #17293B 55%, #1E4E6E 140%)", accent: "#3596C6", icon: "rain", label: "Rain" },
  Drizzle: { gradient: "linear-gradient(160deg, #0C1720 0%, #1B2E3C 55%, #26536E 140%)", accent: "#3596C6", icon: "drizzle", label: "Drizzle" },
  Thunderstorm: { gradient: "linear-gradient(160deg, #0A0818 0%, #1B1533 55%, #372A66 140%)", accent: "#6C5CD6", icon: "storm", label: "Thunderstorm" },
  Snow: { gradient: "linear-gradient(160deg, #131A24 0%, #29323F 55%, #566378 140%)", accent: "#A9BCCB", icon: "snow", label: "Snow" },
  Mist: { gradient: "linear-gradient(160deg, #10141A 0%, #222833 55%, #3C4552 140%)", accent: "#6B7580", icon: "mist", label: "Misty" },
  Fog: { gradient: "linear-gradient(160deg, #10141A 0%, #222833 55%, #3C4552 140%)", accent: "#6B7580", icon: "mist", label: "Foggy" },
  Haze: { gradient: "linear-gradient(160deg, #171410 0%, #332C1F 55%, #564A34 140%)", accent: "#8A7A57", icon: "mist", label: "Hazy" },
  Smoke: { gradient: "linear-gradient(160deg, #121212 0%, #2A2A2A 55%, #454545 140%)", accent: "#5A5A5A", icon: "mist", label: "Smoky" },
  Dust: { gradient: "linear-gradient(160deg, #1A130A 0%, #3A2C18 55%, #5E4826 140%)", accent: "#8A6A42", icon: "mist", label: "Dusty" },
  Sand: { gradient: "linear-gradient(160deg, #1A130A 0%, #3A2C18 55%, #5E4826 140%)", accent: "#8A6A42", icon: "mist", label: "Sandy" },
  Ash: { gradient: "linear-gradient(160deg, #0F0F0F 0%, #262626 55%, #404040 140%)", accent: "#4A4A4A", icon: "mist", label: "Ashy" },
  Squall: { gradient: "linear-gradient(160deg, #0A1420 0%, #17293B 55%, #1E4E6E 140%)", accent: "#3596C6", icon: "rain", label: "Squall" },
  Tornado: { gradient: "linear-gradient(160deg, #0A0818 0%, #1B1533 55%, #372A66 140%)", accent: "#6C5CD6", icon: "storm", label: "Tornado" },
};

export function getWeatherTheme(condition: WeatherMain, isDaytime: boolean): WeatherTheme {
  const table = isDaytime ? DAY : NIGHT;
  return table[condition] ?? table.Clouds;
}
