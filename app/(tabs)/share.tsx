import { Theme } from '@/constants/Colors';
import i18n from '@/constants/translations/i18n';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

type FavContact = { id?: string; name?: string; phone?: string };

const KV_DEFAULT_TEXT = 'share.defaultText';
const KV_FAVORITE_CONTACT = 'share.favoriteContact';

export default function ShareScreen() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [defaultText, setDefaultText] = useState<string>('');
  const [favorite, setFavorite] = useState<FavContact | null>(null);

  const colorScheme = useColorScheme();
  const theme = Theme[colorScheme || 'light'];
  const iconColor = '#42A5F5';

  const loadSettings = React.useCallback(async () => {
    try {
      const [t, f] = await Promise.all([
        AsyncStorage.getItem(KV_DEFAULT_TEXT),
        AsyncStorage.getItem(KV_FAVORITE_CONTACT),
      ]);
      if (t != null) setDefaultText(t);
      if (f) {
        try { setFavorite(JSON.parse(f)); } catch { setFavorite(null); }
      } else {
        setFavorite(null);
      }
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => { loadSettings(); }, [loadSettings]);
  useFocusEffect(React.useCallback(() => { loadSettings(); }, [loadSettings]));

  const instruction = useMemo(() => {
    const raw = i18n.t('shareInstruction') as string;
    return raw === 'shareInstruction'
      ? 'Press the button to share your current GPS location via SMS.'
      : raw;
  }, []);

  const shareLocation = async () => {
    try {
      setErrorMsg(null);
      setLoading(true);

      // 1) SMS capability
      const smsOk = await SMS.isAvailableAsync();
      if (!smsOk) {
        setErrorMsg(i18n.t?.('smsNotAvailable') ?? 'SMS is not available on this device.');
        return;
      }

      // 2) Location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg(i18n.t?.('locDenied') ?? 'Permission to access location was denied.');
        return;
      }

      // 3) Get position with a safety timeout (in case GPS hangs)
      const location = await withTimeout(
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        }),
        15000,
        new Error(i18n.t?.('locTimeout') ?? 'Getting location took too long. Try again with a clearer sky view.')
      );

      const { latitude, longitude, altitude, speed } = location.coords;
      const url = `https://maps.google.com/?q=${latitude},${longitude}`;

      const kmh =
        typeof speed === 'number' && !Number.isNaN(speed) ? (speed * 3.6) : undefined;

      // 4) Compose message from template (supports {lat}{lon}{url}{alt}{speedKmh})
      const fallbackText = 'To je moja lokacija: {url}';
      const base = (defaultText || '').trim() || fallbackText;

      const finalMessage = renderTemplate(base, {
        lat: toFixedMaybe(latitude, 6),
        lon: toFixedMaybe(longitude, 6),
        url,
        alt: altitude != null ? `${Math.round(altitude)} m` : undefined,
        speedKmh: kmh != null ? `${kmh.toFixed(1)} km/h` : undefined,
      }) + `\n\n${url}`;

      // 5) Preferred recipient or let the OS picker open
      const recipients = favorite?.phone ? [favorite.phone] : [];

      await SMS.sendSMSAsync(recipients, finalMessage);
    } catch (error: any) {
      //console.error('Error sharing location:', error);
      setErrorMsg(error?.message ?? (i18n.t?.('shareError') ?? 'Something went wrong while sharing your location.'));
    } finally {
      setLoading(false);
    }
  };

  return (
  <View style={styles.screen}>
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <MaterialIcons name="share-location" size={64} color={iconColor} />
      </View>

      <View style={styles.separator} />

      {/* Intro card */}
<Card
  mode="elevated"
  style={[
    styles.card,
    { backgroundColor: theme.colors.surface, overflow: 'hidden' }, // clip inside corners
  ]}
>
  <Card.Content style={{ gap: 12, alignItems: 'center', alignSelf: 'stretch' }}>
    <Text variant="bodyLarge" style={styles.paragraph}>{instruction}</Text>

    {!!errorMsg && (
      <Text style={[styles.errorText, { alignSelf: 'stretch', color: theme.colors.error, backgroundColor: theme.colors.errorContainer }]}>
        {errorMsg}
      </Text>
    )}

    <Button
      mode="contained"
      icon="map-marker"
      onPress={shareLocation}
      loading={loading}
      disabled={loading}
      style={styles.ctaButton}
      contentStyle={styles.ctaContent}
      labelStyle={styles.ctaLabel}
      buttonColor={theme.colors.primary}
    >
      {i18n.t('shareLocation')}
    </Button>
  </Card.Content>
</Card>
    </View>

    {loading && (
      <View style={styles.loaderOverlay}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color={iconColor} />
          <Text style={styles.loadingText}>{i18n.t('gettingLocation')}</Text>
        </View>
      </View>
    )}
  </View>
);
}

/** Replace {lat},{lon},{url},{alt},{speedKmh} in template. Unknown placeholders remain unchanged. */
function renderTemplate(template: string, data: Record<string, string | undefined>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const v = data[key];
    return v != null ? v : `{${key}}`;
  });
}

function toFixedMaybe(n: number | undefined, digits = 6) {
  return typeof n === 'number' && !Number.isNaN(n) ? n.toFixed(digits) : '';
}

// Promise helper: reject if it takes longer than ms
async function withTimeout<T>(p: Promise<T>, ms: number, err: Error): Promise<T> {
  return await Promise.race([
    p,
    new Promise<never>((_, reject) => setTimeout(() => reject(err), ms)),
  ]);
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    gap: 8,
  },
  iconWrap: {
    marginBottom: 8,
    borderRadius: 999,
    padding: 12,
    backgroundColor: 'rgba(66, 165, 245, 0.12)',
  },
  separator: {
    marginVertical: 16,
    height: 1,
    width: '70%',
  },
  card: {
    width: '100%',
    borderRadius: 16,
  },
  paragraph: {
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 16,
    opacity: 0.9,
  },
  errorText: {
    // width: '100%',  ← delete; use alignSelf: 'stretch' above
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  ctaButton: {
    borderRadius: 14,
    width: '80%',
  },
  ctaContent: {
    height: 56,
  },
  ctaLabel: {
    fontWeight: '700',
    fontSize: 16,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 10, 10, 0.35)',
  },
  loaderBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
