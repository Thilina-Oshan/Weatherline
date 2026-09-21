import { FormEvent, useState } from "react";

interface Props {
  onSearch: (city: string) => void;
  onUseLocation: () => void;
  isLocating: boolean;
}

export function SearchBar({ onSearch, onUseLocation, isLocating }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-field">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <line x1="21" y1="21" x2="16.2" y2="16.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search a city…"
          aria-label="Search for a city"
        />
      </div>
      <button type="submit" className="btn-primary">
        Search
      </button>
      <button
        type="button"
        className="btn-ghost"
        onClick={onUseLocation}
        disabled={isLocating}
        aria-label="Use my location"
      >
        {isLocating ? "Locating…" : "Use my location"}
      </button>
    </form>
  );
}
