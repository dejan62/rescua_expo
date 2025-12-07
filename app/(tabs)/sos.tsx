import { Theme } from '@/constants/Colors';
import i18n from '@/constants/translations/i18n';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

const KV_SOS_BLOOD_TYPE = 'sos.bloodType'; // e.g. "A+" or missing if unknown
const KV_SOS_ALLERGIES = 'sos.allergies';
const ALLERGIES_MAX = 100; // hard cap

export default function SosScreen() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const theme = Theme[colorScheme || 'light'];

  const shareLocation = async () => {
    try {
      setErrorMsg(null);
      setLoading(true);

      // Ensure SMS is available
      const smsOk = await SMS.isAvailableAsync();
      if (!smsOk) {
        setErrorMsg(i18n.t?.('smsNotAvailable'));
        return;
      }

      // Read medical info while we ask for permissions to save time
      const [bt, al] = await Promise.all([
        AsyncStorage.getItem(KV_SOS_BLOOD_TYPE),
        AsyncStorage.getItem(KV_SOS_ALLERGIES),
      ]);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg(i18n.t?.('locationPermissionDenied'));
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      const url = `https://maps.google.com/?q=${lat},${lon}`;

      // Compose medical details
      const bloodTypePart =
        bt && /^[OAB]{1,2}[+-]$/.test(bt) ? `\nKrvna skupina: ${bt}` : '\nKrvna skupina: neznano';
      const allergiesRaw = (al ?? '').trim();
      const allergiesPart =
        allergiesRaw.length > 0
          ? `\nAlergije: ${allergiesRaw.slice(0, ALLERGIES_MAX)}`
          : '';

      const message =
        `NUJNO POTREBUJEM POMOČ.\n` +
        `Sem na lokaciji (GPS): ${lat.toFixed(6)}, ${lon.toFixed(6)}${bloodTypePart}${allergiesPart}\n\n${url}`;

      await SMS.sendSMSAsync(
        ['041565455'], // your emergency number(s)
        message
      );
    } catch (error: any) {
      //console.error('Error sharing location:', error);
      setErrorMsg(error?.message  ?? 'Something went wrong while sharing your location.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <MaterialIcons name="sos" size={64} color="#E53935" />
        </View>

        <View style={styles.separator} />

        {/* Intro/Action card */}
        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content style={styles.cardContent}>
            <Text variant="bodyLarge" style={styles.paragraph}>
              {i18n.t('sosInstruction')}
            </Text>

            {/* BIG WARNING */}
            <View
              style={styles.warningBox}
              accessibilityRole="alert"
              accessibilityLabel="Warning"
            >
              <MaterialIcons name="warning" size={28} color={theme.colors.error} />
              <Text style={[styles.warningText, { color: theme.colors.error }]}>
                OPOZORILO: to SMS sporočilo bo poslano uradnemu reševalnemu centru. Po poslanem sporočilu
                ostanite na lokaciji in počakajte na pomoč.
              </Text>
            </View>

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
              buttonColor={theme.colors.error}
            >
              SOS
            </Button>
          </Card.Content>
        </Card>
      </View>

      {loading && (
        <View style={styles.loaderOverlay}>
          <View style={styles.loaderBox}>
            <ActivityIndicator size="large" color={theme.colors.error} />
            <Text style={styles.loadingText}>{i18n.t('gettingLocation')}</Text>
          </View>
        </View>
      )}
    </View>
  );
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
    // marginBottom: 8,   // remove extra space here
    marginBottom: 0,
    borderRadius: 999,
    padding: 12,
    backgroundColor: 'rgba(229, 57, 53, 0.12)',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  separator: {
    marginVertical: 8,    // was 16; brings card closer to icon
    height: 1,
    width: '70%',
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    // alignItems removed here so it doesn't affect Card.Content layout
    // alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  graph: {
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
  warningBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(183, 28, 28, 0.12)', // deep red tint
    borderWidth: 1,
    borderColor: 'rgba(183, 28, 28, 0.35)',
  },
  warningText: {
    flex: 1,
    fontSize: 18,            // big text
    fontWeight: '800',

    lineHeight: 24,
  },
  cardContent: {
    gap: 12,
    alignItems: 'center',  // centers children inside the card
  },
  ctaButton: {
    borderRadius: 14,
    width: '80%',
    alignSelf: 'center',   // ensures the button itself is centered
  },
  paragraph: {
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 16,
    opacity: 0.9,
  },
});
