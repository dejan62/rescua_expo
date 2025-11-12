// app/(tabs)/sosSettings.tsx
import { Theme } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import {
  ActivityIndicator,
  Card,
  Checkbox,
  HelperText,
  PaperProvider,
  SegmentedButtons,
  Snackbar,
  Text,
  TextInput
} from 'react-native-paper';

const KV_SOS_BLOOD_TYPE = 'sos.bloodType'; // e.g. "A+" or removed (null)
const KV_SOS_ALLERGIES = 'sos.allergies';

const ABO = ['O', 'A', 'B', 'AB'] as const;
const RH = ['+', '-'] as const;
type ABOType = typeof ABO[number];
type RhType = typeof RH[number];

export default function SosSettingsScreen() {
  const [abo, setAbo] = React.useState<ABOType>('O');
  const [rh, setRh] = React.useState<RhType>('+');
  const [unknown, setUnknown] = React.useState<boolean>(false);
  const [allergies, setAllergies] = React.useState('');
  const [snack, setSnack] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  const colorScheme = useColorScheme();
  const theme = Theme[colorScheme || 'light'];

  const ALLERGIES_MAX = 100;

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
        await AsyncStorage.removeItem(KV_SOS_BLOOD_TYPE).catch(() => { });
        setSnack('Blood type set to: unknown');
      } else {
        const value = `${abo}${rh}`;
        await AsyncStorage.setItem(KV_SOS_BLOOD_TYPE, value).catch(() => { });
        setSnack(`Blood type saved: ${value}`);
      }
    })();
  }, [abo, rh, unknown, loading]);

  // Persist allergies (debounced)
  React.useEffect(() => {
    if (loading) return;
    const id = setTimeout(() => {
      AsyncStorage.setItem(KV_SOS_ALLERGIES, allergies).catch(() => { });
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
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 50 })}
      >
        <ScrollView
          contentContainerStyle={[styles.scroll]}
          keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: theme.colors.background }}
        >
          {/* BLOOD TYPE */}
          <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <Card.Title title="Blood type" titleVariant="titleLarge" />
            <Card.Content style={{ gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                  status={unknown ? 'checked' : 'unchecked'}
                  onPress={() => setUnknown(v => !v)}
                  color={theme.colors.primary}
                />
                <Text>I don't know</Text>
              </View>

              <Text variant="titleMedium" style={{ opacity: 0.8, marginTop: 4 }}>ABO group</Text>
              <SegmentedButtons
                value={abo}
                onValueChange={(v) => setAbo(v as ABOType)}
                buttons={ABO.map((v) => ({
                  value: v,
                  label: v,
                  checkedColor: theme.colors.onPrimary,                  // selected text/icon
                  uncheckedColor: theme.colors.onSurface,   // unselected text/icon
                  style: [
                    v === abo && { backgroundColor: theme.colors.primary }, // selected bg
                  ],
                  labelStyle: v === abo ? { fontWeight: '700' } : undefined,
                }))}
                style={{ backgroundColor: theme.colors.surface }}

              />

              <Text variant="titleMedium" style={{ opacity: 0.8, marginTop: 8 }}>Rh factor</Text>
              <SegmentedButtons
                value={rh}
                onValueChange={(v) => setRh(v as RhType)}
                buttons={[
                  {
                    value: '+',
                    label: '+',
                    checkedColor: theme.colors.onPrimary,
                    uncheckedColor: theme.colors.onSurface,
                    style: [rh === '+' && { backgroundColor: theme.colors.primary }],
                    labelStyle: [
                      { fontSize: 34, lineHeight: 24 },           // ← bigger plus
                      rh === '+' && { fontWeight: '700' },
                    ],
                  },
                  {
                    value: '-',
                    label: '-',
                    checkedColor: theme.colors.onPrimary,
                    uncheckedColor: theme.colors.onSurface,
                    style: [rh === '-' && { backgroundColor: theme.colors.primary }],
                    labelStyle: [
                      { fontSize: 34, lineHeight: 24 },           // ← bigger minus
                      rh === '-' && { fontWeight: '700' },
                    ],
                  },
                ]}
                style={{ backgroundColor: theme.colors.surface }}
              />
            </Card.Content>
          </Card>

          {/* ALLERGIES */}
          <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <Card.Title title="Allergies & diseases" titleVariant="titleMedium" />
            <Card.Content>
              <TextInput
                mode="outlined"
                multiline
                numberOfLines={5}
                value={allergies}
                onChangeText={(t) => setAllergies(t.slice(0, ALLERGIES_MAX))}
                placeholder="List important allergies (e.g., penicillin, peanuts, wasp stings)…"
                right={<TextInput.Affix text={`${allergies.length}/${ALLERGIES_MAX}`} />}
                maxLength={ALLERGIES_MAX}
                textColor={theme.colors.onSurface}
                outlineColor={theme.colors.outline}        // unfocused border
                activeOutlineColor={theme.colors.primary}  // focused border
                outlineStyle={{ borderWidth: 1.5, borderRadius: 12 }} // optional polish
                style={{ backgroundColor: theme.colors.surface }}
                autoCapitalize="sentences"
                returnKeyType="done"
              />

              <HelperText
                type="info"
                style={{ marginTop: 6, color: theme.colors.onSurfaceVariant }}
              >
                This can help responders act safely in emergencies.
              </HelperText>
            </Card.Content>
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
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16
  },
  container: { flex: 1, padding: 16, gap: 16 },
  card: { width: '100%' },
});
