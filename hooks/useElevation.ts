// hooks/useElevation.ts
import * as React from 'react';

export function useElevation(lat?: number | null, lon?: number | null) {
  const [elevation, setElevation] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (lat == null || lon == null || Number.isNaN(lat) || Number.isNaN(lon)) return;

    let cancelled = false;
    const ctrl = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        // Open-Meteo Elevation API returns meters above mean sea level (MSL)
        const url = `https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const val = Array.isArray(data?.elevation) ? data.elevation[0] : null;
        if (!cancelled) setElevation(typeof val === 'number' ? val : null);
      } catch (e: any) {
        if (!cancelled && e.name !== 'AbortError') setError(e?.message ?? 'Elevation fetch failed');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; ctrl.abort(); };
  }, [lat, lon]);

  return { elevation, loading, error };
}
