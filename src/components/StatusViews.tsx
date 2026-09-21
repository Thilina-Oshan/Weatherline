export function LoadingSpinner() {
  return (
    <div className="status-view" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>Fetching the forecast…</p>
    </div>
  );
}

export function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="status-view status-view--error" role="alert">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="8" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1" fill="currentColor" />
      </svg>
      <p>{message}</p>
      {onRetry && (
        <button className="btn-ghost" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="status-view">
      <p>Search a city or use your location to see the forecast.</p>
    </div>
  );
}
