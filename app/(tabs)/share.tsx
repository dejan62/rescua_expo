import { Text, View } from '@/components/Themed';
import { Theme } from '@/constants/Colors';
import i18n from '@/constants/translations/i18n';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';
import { Button } from 'react-native-paper';


export default function ShareScreen() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const theme = Theme[colorScheme || 'light']; 

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

      // Get position (can take a few seconds)
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const url = `https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;

      // Empty recipients -> opens native SMS composer
      await SMS.sendSMSAsync([], `To je moja lokacija: ${url}`);
    } catch (error) {
      console.error('Error sharing location:', error);
      setErrorMsg('Something went wrong while sharing your location.');
    } finally {
      setLoading(false);
    }
  };

  // Fallback if you haven’t added this key yet
  const instructionRaw = i18n.t('shareInstruction') as string;
  const instruction =
    instructionRaw === 'shareInstruction'
      ? 'Press the button to share your current GPS location with a friend via SMS.'
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
    backgroundColor: 'rgba(66, 165, 245, 0.12)', // subtle blue halo
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
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
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
