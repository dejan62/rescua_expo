// app/(tabs)/shareSettings.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, HelperText, PaperProvider, Snackbar, TextInput } from 'react-native-paper';

const KV_DEFAULT_TEXT = 'share.defaultText';

export default function ShareSettingsScreen() {
  const [defaultText, setDefaultText] = React.useState('');

  // Contact picker state
  const [q, setQ] = React.useState('');
  const [snack, setSnack] = React.useState<string | null>(null);

  // Load persisted settings
  React.useEffect(() => {
    (async () => {
      const [t] = await Promise.all([
        AsyncStorage.getItem(KV_DEFAULT_TEXT),
      ]);
      if (t) setDefaultText(t);
    })();
  }, []);

  // Persist default text (debounced)
  React.useEffect(() => {
    const id = setTimeout(() => {
      AsyncStorage.setItem(KV_DEFAULT_TEXT, defaultText).catch(() => {});
    }, 400);
    return () => clearTimeout(id);
  }, [defaultText]);

  const openPicker = async () => {
    // Ask permission lazily
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== Contacts.PermissionStatus.GRANTED) {
      setSnack('Contacts permission denied.');
      return;
    }

  };


  return (
    <PaperProvider>
    <View style={styles.container}>
      {/* DEFAULT SHARE TEXT */}
      <Card mode="elevated" style={styles.card}>
        <Card.Title title="Default share message" titleVariant="titleMedium" />
        <Card.Content>
          <TextInput
            mode="outlined"
            multiline
            numberOfLines={4}
            value={defaultText}
            onChangeText={setDefaultText}
            placeholder="e.g. I'm here and need assistance. GPS: {lat},{lon}"
            right={<TextInput.Affix text={`${defaultText.length}/500`} />}
            maxLength={500}
          />
          <HelperText type="info" style={{ marginTop: 6 }}>
            This text will be pre-filled when you share your location.
          </HelperText>
        </Card.Content>
      </Card>
  

      <Snackbar visible={!!snack} onDismiss={() => setSnack(null)} duration={2000}>
        {snack}
      </Snackbar>
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  card: { width: '100%' },
  pickerSheet: {
    position: 'absolute',
    bottom: 0,
    left: 8,
    right: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 8,
  },
  centerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
});
