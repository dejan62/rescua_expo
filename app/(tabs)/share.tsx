import { Text, View } from '@/components/Themed';
import { Theme } from '@/constants/Colors';
import i18n from '@/constants/translations/i18n';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';
import { Button } from 'react-native-paper';

type FavContact = { id: string; name: string; phone: string };

const KV_DEFAULT_TEXT = 'share.defaultText';
const KV_FAVORITE_CONTACT = 'share.favoriteContact';

export default function ShareScreen() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [defaultText, setDefaultText] = useState<string>('');
  const [favorite, setFavorite] = useState<FavContact | null>(null);

  const colorScheme = useColorScheme();
  const theme = Theme[colorScheme || 'light'];

    const loadSettings = React.useCallback(async () => {
    try {
      const [t, f] = await Promise.all([
        AsyncStorage.getItem(KV_DEFAULT_TEXT),
        AsyncStorage.getItem(KV_FAVORITE_CONTACT),
      ]);
      if (t != null) setDefaultText(t);
      if (f) {
        try { setFavorite(JSON.parse(f)); } catch {}
      } else {
        setFavorite(null);
      }
    } catch {
      // ignore
    }
  }, []);
  // 1) initial load
  React.useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // 2) reload whenever screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadSettings();
      // no cleanup needed
    }, [loadSettings])
  );

  const shareLocation = async () => {
    try {
      setErrorMsg(null);
      setLoading(true);

      // Check SMS capability
      const smsOk = await SMS.isAvailableAsync();
      if (!smsOk) {
        setErrorMsg('SMS is not available on this device.');
        return;
      }

      // Location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude, altitude, speed } = location.coords;
      const url = `https://maps.google.com/?q=${latitude},${longitude}`;

      // Prepare message: support placeholders in saved default text
      const kmh = typeof speed === 'number' && !Number.isNaN(speed) ? (speed * 3.6) : null;

      const fallbackText =
        'To je moja lokacija: {url}'; // short fallback if nothing saved

      const base = (defaultText || '').trim() || fallbackText;
      const finalMessage = base ? `${base}\n\n${url}` : url;

      // If user has a favorite, send to that number; otherwise open composer with recipient picker
      const recipients = favorite?.phone ? [favorite.phone] : [];

      await SMS.sendSMSAsync(recipients, finalMessage);
    } catch (error) {
      console.error('Error sharing location:', error);
      setErrorMsg('Something went wrong while sharing your location.');
    } finally {
      setLoading(false);
    }
  };

  // Fallback for instruction text
  const instructionRaw = i18n.t('shareInstruction') as string;
  const instruction =
    instructionRaw === 'shareInstruction'
      ? 'Press the button to share your current GPS location via SMS.'
      : instructionRaw;

  const iconColor = '#42A5F5';

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <MaterialIcons name="share-location" size={64} color={iconColor} />
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={styles.card}>
          <Text style={styles.paragraph}>{instruction}</Text>

          {!!favorite?.name && (
            <Text style={{ opacity: 0.8, marginBottom: 4 }}>
              📱 Favorite: {favorite.name} {favorite.phone ? `(${favorite.phone})` : ''}
            </Text>
          )}

          {!!defaultText && (
            <Text style={{ opacity: 0.7, fontSize: 12, textAlign: 'center' }}>
              Template preview uses placeholders: {'{lat} {lon} {url} {alt} {speedKmh}'}
            </Text>
          )}

          {!!errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

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
        </View>
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
    padding: 16,
    gap: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  paragraph: {
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 16,
    opacity: 0.9,
  },
  errorText: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(229,57,53,0.12)',
    color: '#ff6b6b',
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
