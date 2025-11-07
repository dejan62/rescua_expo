// app/(tabs)/sosSettings.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Checkbox,
  HelperText,
  PaperProvider,
  SegmentedButtons,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';

const KV_SOS_BLOOD_TYPE = 'sos.bloodType'; // e.g. "A+" or removed (null)
const KV_SOS_ALLERGIES  = 'sos.allergies';

const ABO = ['O', 'A', 'B', 'AB'] as const;
const RH  = ['+', '-'] as const;
type ABOType = typeof ABO[number];
type RhType  = typeof RH[number];

export default function SosSettingsScreen() {
  const [abo, setAbo] = React.useState<ABOType>('O');
  const [rh, setRh]   = React.useState<RhType>('+');
  const [unknown, setUnknown] = React.useState<boolean>(false);
  const [allergies, setAllergies] = React.useState('');
  const [snack, setSnack] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Load persisted settings
  React.useEffect(() => {
    (async () => {
      try {
        const [bt, al] = await Promise.all([
          AsyncStorage.getItem(KV_SOS_BLOOD_TYPE),
          AsyncStorage.getItem(KV_SOS_ALLERGIES),
        ]);

        if (bt && typeof bt === 'string') {
          const m = bt.match(/^(O|A|B|AB)([+-])$/);
          if (m) {
            setAbo(m[1] as ABOType);
            setRh(m[2] as RhType);
            setUnknown(false);
          } else {
            // malformed -> treat as unknown
            setUnknown(true);
          }
        } else {
          // key missing => unknown
          setUnknown(true);
        }

        if (al) setAllergies(al);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Persist blood type whenever any related state changes
  React.useEffect(() => {
    if (loading) return;
    (async () => {
      if (unknown) {
        await AsyncStorage.removeItem(KV_SOS_BLOOD_TYPE).catch(() => {});
        setSnack('Blood type set to: unknown');
      } else {
        const value = `${abo}${rh}`;
        await AsyncStorage.setItem(KV_SOS_BLOOD_TYPE, value).catch(() => {});
        setSnack(`Blood type saved: ${value}`);
      }
    })();
  }, [abo, rh, unknown, loading]);

  // Persist allergies (debounced)
  React.useEffect(() => {
    if (loading) return;
    const id = setTimeout(() => {
      AsyncStorage.setItem(KV_SOS_ALLERGIES, allergies).catch(() => {});
    }, 400);
    return () => clearTimeout(id);
  }, [allergies, loading]);

  if (loading) {
    return (
      <ScrollView contentContainerStyle={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Loading SOS settings…</Text>
      </ScrollView>
    );
  }

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({
          ios: 64,   // tweak if header is taller/shorter
          android: 0,
        })}
      >
      <ScrollView
          contentContainerStyle={[styles.container, { paddingBottom: 24 }]}
          keyboardShouldPersistTaps="handled"
          // iOS 15+ automatically adds insets when the keyboard opens:
          automaticallyAdjustKeyboardInsets
        >
      {/* BLOOD TYPE */}
      <Card mode="elevated" style={styles.card}>
        <Card.Title title="Blood type" titleVariant="titleMedium" />
        <Card.Content style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={unknown ? 'checked' : 'unchecked'}
              onPress={() => setUnknown(v => !v)}
            />
            <Text>I don't know</Text>
          </View>

          <Text variant="titleSmall" style={{ opacity: 0.8, marginTop: 4 }}>ABO group</Text>
          <SegmentedButtons
            value={abo}
            onValueChange={(v) => setAbo(v as ABOType)}
            buttons={ABO.map(v => ({ value: v, label: v }))}
            style={{ opacity: unknown ? 0.4 : 1 }}
          />

          <Text variant="titleSmall" style={{ opacity: 0.8, marginTop: 8 }}>Rh factor</Text>
          <SegmentedButtons
            value={rh}
            onValueChange={(v) => setRh(v as RhType)}
            buttons={[
              { value: '+', label: 'Rh +' },
              { value: '-', label: 'Rh -' },
            ]}
            style={{ opacity: unknown ? 0.4 : 1 }}
            
          />
        

        </Card.Content>
      </Card>

      {/* ALLERGIES */}
      <Card mode="elevated" style={styles.card}>
        <Card.Title title="Allergies" titleVariant="titleMedium" />
        <Card.Content>
          <TextInput
            mode="outlined"
            multiline
            numberOfLines={5}
            value={allergies}
            onChangeText={setAllergies}
            placeholder="List important allergies (e.g., penicillin, peanuts, wasp stings)…"
            right={<TextInput.Affix text={`${allergies.length}/1000`} />}
            maxLength={1000}
          />
          <HelperText type="info" style={{ marginTop: 6 }}>
            This can help responders act safely in emergencies.
          </HelperText>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => { AsyncStorage.setItem(KV_SOS_ALLERGIES, allergies); setSnack('Allergies saved.'); }}>
            Save now
          </Button>
        </Card.Actions>
      </Card>

      <Snackbar visible={!!snack} onDismiss={() => setSnack(null)} duration={2000}>
        {snack}
      </Snackbar>
      </ScrollView>
    </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  card: { width: '100%' },
});
