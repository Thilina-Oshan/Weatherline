interface Props {
  icon: string;
  size?: number;
  className?: string;
}

/**
 * A small set of consistent line-style icons so the dashboard doesn't depend
 * on an external icon font or image CDN (which the app shouldn't need network
 * access for beyond the weather API itself).
 */
export function WeatherIcon({ icon, size = 48, className }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    fill: "none",
    className,
  };

  switch (icon) {
    case "sun":
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="13" stroke="currentColor" strokeWidth="2.5" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI) / 4;
            const x1 = 32 + Math.cos(angle) * 20;
            const y1 = 32 + Math.sin(angle) * 20;
            const x2 = 32 + Math.cos(angle) * 26;
            const y2 = 32 + Math.sin(angle) * 26;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />;
          })}
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path
            d="M40 12c-11 2-19 11-19 22 0 12.7 10.3 23 23 23 6.7 0 12.7-2.9 17-7.4C55 53.7 47.8 57 40 57 26.7 57 16 46.3 16 33c0-9.7 5.8-18 14.2-21.7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path
            d="M20 42a10 10 0 010-20 12.5 12.5 0 0124 -3.5A11 11 0 0146 42H20z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "cloud-moon":
      return (
        <svg {...common}>
          <path
            d="M38 10c-6 1.3-10.4 6.6-10.4 12.9 0 5 3.1 9.3 7.5 11"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M18 46a9 9 0 010-18 11 11 0 0121-3A10 10 0 0144 46H18z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "rain":
      return (
        <svg {...common}>
          <path
            d="M18 34a9 9 0 010-18 11.5 11.5 0 0122 -3.2A10 10 0 0144 34H18z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line x1="24" y1="42" x2="21" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="33" y1="42" x2="30" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="42" y1="42" x2="39" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "drizzle":
      return (
        <svg {...common}>
          <path
            d="M18 32a9 9 0 010-18 11.5 11.5 0 0122 -3.2A10 10 0 0144 32H18z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line x1="25" y1="40" x2="24" y2="45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="33" y1="40" x2="32" y2="45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="41" y1="40" x2="40" y2="45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "storm":
      return (
        <svg {...common}>
          <path
            d="M18 30a9 9 0 010-18 11.5 11.5 0 0122 -3.2A10 10 0 0144 30H18z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M34 36l-7 12h6l-4 10 11-14h-6l4-8z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.15"
          />
        </svg>
      );
    case "snow":
      return (
        <svg {...common}>
          <path
            d="M18 30a9 9 0 010-18 11.5 11.5 0 0122 -3.2A10 10 0 0144 30H18z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {[24, 32, 40].map((x) => (
            <g key={x}>
              <line x1={x} y1="38" x2={x} y2="50" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <line x1={x - 4} y1="41" x2={x + 4} y2="47" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <line x1={x + 4} y1="41" x2={x - 4} y2="47" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          ))}
        </svg>
      );
    case "mist":
    default:
      return (
        <svg {...common}>
          <path d="M14 24h24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 32h36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 40h28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 48h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}
