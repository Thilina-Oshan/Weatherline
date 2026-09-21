import { ThermometerSun, Wind, Droplets, SunMedium } from "lucide-react";
import type { CurrentWeather } from "../types";

interface Props {
  data: CurrentWeather;
}

export function AirConditions({ data }: Props) {
  const metrics = [
    { name: "Real Feel", icon: ThermometerSun, value: `${data.realFeelC}°` },
    { name: "Wind", icon: Wind, value: `${data.windKph} km/h` },
    { name: "Chance of rain", icon: Droplets, value: `${data.rainChance}%` },
    { name: "UV Index", icon: SunMedium, value: String(data.uvIndex) },
  ];

  return (
    <section className="card air-conditions-pane">
      <div className="card-header">
        <h3 className="card-title">Air Conditions</h3>
      </div>
      <div className="air-conditions-grid">
        {metrics.map((metric) => (
          <div className="condition-item" key={metric.name}>
            <div className="metric-header">
              <metric.icon size={18} className="metric-icon" />
              <span className="metric-label">{metric.name}</span>
            </div>
            <span className="metric-value">{metric.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
