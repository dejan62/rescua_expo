// hooks/useOpenMeteo.ts
import * as React from 'react';

type Weather = {
  tempC?: number;
  windKmh?: number;
  humidity?: number;
  code?: number;
  desc?: string;
  updatedAt?: string;
};

const WMO_DESC: Record<number, string> = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Depositing rime fog',
  51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
  61: 'Light rain', 63: 'Moderate rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Moderate snow', 75: 'Heavy snow',
  80: 'Rain showers', 81: 'Rain showers', 82: 'Violent rain showers',
  95: 'Thunderstorm', 96: 'Thunderstorm w/ hail', 99: 'Thunderstorm w/ heavy hail',
};

export function useOpenMeteo(lat?: number | null, lon?: number | null) {
  const [weather, setWeather] = React.useState<Weather | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (lat == null || lon == null) return;
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${lat}&longitude=${lon}` +
          `&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m` +
          `&timezone=auto`;
        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const j = await res.json();

        const cur = j.current || {};
        const w: Weather = {
          tempC: cur.temperature_2m,
          windKmh: cur.wind_speed_10m, // already in km/h from Open-Meteo
          humidity: cur.relative_humidity_2m,
          code: cur.weather_code,
          desc: WMO_DESC[cur.weather_code] ?? '—',
          updatedAt: cur.time,
        };
        setWeather(w);
      } catch (e: any) {
        if (e?.name !== 'AbortError') setError(e?.message ?? 'Failed to load weather');
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [lat, lon]);

  return { weather, loading, error };
}
