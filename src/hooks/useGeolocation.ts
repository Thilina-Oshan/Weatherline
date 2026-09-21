import { useCallback, useState } from "react";

interface Coords {
  lat: number;
  lon: number;
}

export function useGeolocation() {
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locate = useCallback((): Promise<Coords> => {
    setError(null);
    setIsLocating(true);
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const message = "Your browser doesn't support geolocation.";
        setError(message);
        setIsLocating(false);
        reject(new Error(message));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        (err) => {
          const message =
            err.code === err.PERMISSION_DENIED
              ? "Location access was denied. You can still search by city name."
              : "Couldn't determine your location. Try searching by city instead.";
          setError(message);
          setIsLocating(false);
          reject(new Error(message));
        },
        { timeout: 10000, enableHighAccuracy: false }
      );
    });
  }, []);

  return { locate, isLocating, error };
}
