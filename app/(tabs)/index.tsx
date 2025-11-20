// app/(tabs)/index.tsx (or HomeScreen.tsx)
import { Theme } from '@/constants/Colors';
import { useElevation } from '@/hooks/useElevation'; // ← add
import { useOpenMeteo } from '@/hooks/useOpenMeteo';
import * as Location from 'expo-location';
import React from 'react';
import { Image, StyleSheet, View, useColorScheme } from 'react-native';
import { ActivityIndicator, Button, Card, SegmentedButtons, Text } from 'react-native-paper';

type Coords = {
  latitude?: number | null;
  longitude?: number | null;
  altitude?: number | null; // meters
  speed?: number | null;    // m/s
  heading?: number | null;  // degrees
  accuracy?: number | null; // meters
  altitudeAccuracy?: number | null; // meters
};

export default function HomeScreen() {
  const [coords, setCoords] = React.useState<Coords>({});
  const [status, setStatus] = React.useState<'idle' | 'denied' | 'granted' | 'loading'>('idle');
  const [error, setError] = React.useState<string | null>(null);
  const [watching, setWatching] = React.useState(true);
  const [tab, setTab] = React.useState<'pos' | 'wx'>('pos'); // ← toggle state

  const colorScheme = useColorScheme();
  const theme = Theme[colorScheme || 'light'];

  const { weather, loading: wLoading, error: wError } = useOpenMeteo(coords.latitude, coords.longitude);
  const { elevation, loading: eLoading, error: eError } = useElevation(coords.latitude, coords.longitude); // ← add


  React.useEffect(() => {
    let sub: Location.LocationSubscription | null = null;
    (async () => {
      setStatus('loading');
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setStatus('denied');
          setError('Location permission denied.');
          return;
        }
        setStatus('granted');

        // Start watching
        sub = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 2000,
            distanceInterval: 1,
            mayShowUserSettingsDialog: true,
          },
          (loc) => {
            const c = loc.coords;
            setCoords({
              latitude: c.latitude,
              longitude: c.longitude,
              altitude: c.altitude,
              speed: c.speed,
              heading: c.heading,
              accuracy: c.accuracy,
              altitudeAccuracy: c.altitudeAccuracy,
            });
          }
        );
      } catch (e: any) {
        setError(e?.message ?? 'Unknown location error.');
      }
    })();

    return () => { sub?.remove(); };
  }, []);

  // Start/stop updates without theming concerns
  const toggleWatching = async () => {
    setWatching((w) => !w);
    if (watching) {
      // stop
      await Location.stopLocationUpdatesAsync?.('unused-task-name').catch(() => { });
    } else {
      // resume (quick poll once)
      try {
        const last = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        const c = last.coords;
        setCoords({
          latitude: c.latitude,
          longitude: c.longitude,
          altitude: c.altitude,
          speed: c.speed,
          heading: c.heading,
          accuracy: c.accuracy,
          altitudeAccuracy: c.altitudeAccuracy,
        });
      } catch { }
    }
  };

  const kmh =
    coords.speed != null && !Number.isNaN(coords.speed) ? coords.speed * 3.6 : null;

  const headingText =
    coords.heading != null && !Number.isNaN(coords.heading)
      ? `${Math.round(coords.heading)}° ${toCardinal(coords.heading)}`
      : '—';

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/LOGO_BLUE_SQUARE_TRANSPARENT.png')}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="App logo"
      />

      {/* Toggle */}
      <SegmentedButtons
        value={tab}
        onValueChange={(v) => setTab(v as 'pos' | 'wx')}
        buttons={[
          {
            value: 'pos',
            label: 'Position',
            icon: 'crosshairs-gps',
            checkedColor: theme.colors.onPrimary,                  // selected text/icon
            uncheckedColor: theme.colors.onSurface,   // unselected text/icon
            style: [
              tab === 'pos' && { backgroundColor: theme.colors.primary }, // selected bg
            ],
            labelStyle: tab === 'pos' ? { fontWeight: '700' } : undefined,
          },
          {
            value: 'wx',
            label: 'Weather',
            icon: 'weather-partly-cloudy',
            checkedColor: theme.colors.onPrimary,   // selected text/icon
            uncheckedColor: theme.colors.onSurface,   // unselected text/icon
            style: [
              tab === 'wx' && { backgroundColor: theme.colors.primary }, // selected bg
            ],
            labelStyle: tab === 'wx' ? { fontWeight: '700' } : undefined,
          },
        ]}
        style={{ width: '100%', maxWidth: 560 }}
      />

      {/* POSITION CARD */}
      {tab === 'pos' && (
        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title title="Current Position" titleVariant="titleMedium" />
          <Card.Content style={{ gap: 8 }}>
            {status === 'loading' && (
              <View style={styles.rowCenter}>
                <ActivityIndicator />
                <Text style={{ marginLeft: 8 }}>Getting location…</Text>
              </View>
            )}
            {status === 'denied' && <Text>Location permission denied. Enable it in Settings.</Text>}
            {!!error && status !== 'loading' && <Text>{error}</Text>}

            <StatRow label="Latitude" value={fmt(coords.latitude, 6)} />
            <StatRow label="Longitude" value={fmt(coords.longitude, 6)} />
            <StatRow label="Accuracy" value={coords.accuracy != null ? `${Math.round(coords.accuracy)} m` : '—'} />

            {/* NEW: Elevation above mean sea level (preferred) */}
            <StatRow
              label="Elevation (MSL)"
              value={
                eLoading ? '…' :
                  eError ? '—' :
                    elevation != null ? `${Math.round(elevation)} m` : '—'
              }
            />

            {/* Keep raw GPS altitude but label it clearly */}
            {/*<StatRow
              label="Altitude (GPS ellipsoid)"
              value={coords.altitude != null ? `${Math.round(coords.altitude)} m` : '—'}
            />*/}

            <StatRow label="Heading" value={headingText} />
            <StatRow label="Speed" value={kmh != null ? `${kmh.toFixed(1)} km/h` : '—'} />
          </Card.Content>
          <Card.Actions>
            {/* Solid primary button */}
            <Button
              mode="contained"
              onPress={toggleWatching}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
            >
              {watching ? 'Pause' : 'Refresh once'}
            </Button>
          </Card.Actions>
        </Card>
      )}

      {/* WEATHER CARD */}
      {tab === 'wx' && (
        <Card mode="elevated" style={styles.card}>
          <Card.Title title="Weather (current)" titleVariant="titleMedium" />
          <Card.Content style={{ gap: 8 }}>
            {wLoading && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator />
                <Text style={{ marginLeft: 8 }}>Loading weather…</Text>
              </View>
            )}
            {wError && <Text>{wError}</Text>}
            {!wLoading && !wError && weather && (
              <>
                <View style={styles.row}>
                  <Text variant="titleSmall" style={styles.label}>Condition</Text>
                  <Text variant="bodyLarge" style={styles.value}>{weather.desc}</Text>
                </View>
                <View style={styles.row}>
                  <Text variant="titleSmall" style={styles.label}>Temperature</Text>
                  <Text variant="bodyLarge" style={styles.value}>{weather.tempC?.toFixed(1)} °C</Text>
                </View>
                <View style={styles.row}>
                  <Text variant="titleSmall" style={styles.label}>Wind</Text>
                  <Text variant="bodyLarge" style={styles.value}>{weather.windKmh?.toFixed(0)} km/h</Text>
                </View>
                <View style={styles.row}>
                  <Text variant="titleSmall" style={styles.label}>Humidity</Text>
                  <Text variant="bodyLarge" style={styles.value}>{weather.humidity}%</Text>
                </View>
                {weather.updatedAt && (
                  <Text variant="labelSmall" style={{ opacity: 0.7, marginTop: 4 }}>
                    Updated: {new Date(weather.updatedAt).toLocaleString()}
                  </Text>
                )}
              </>
            )}
          </Card.Content>
        </Card>
      )}
    </View>
  );

}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text variant="titleSmall" style={styles.label}>
        {label}
      </Text>
      <Text variant="bodyLarge" style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

function fmt(n?: number | null, digits = 6) {
  return n != null && !Number.isNaN(n) ? n.toFixed(digits) : '—';
}

function toCardinal(deg?: number | null) {
  if (deg == null || Number.isNaN(deg)) return '';
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
  return dirs[Math.round((deg % 360) / 22.5)];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  logo: {
    width: 140,
    height: 100,
  },
  card: {
    width: '100%',
    maxWidth: 560,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: { opacity: 0.7 },
  value: { fontWeight: '600' },
});
