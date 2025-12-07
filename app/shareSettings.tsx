// app/(tabs)/shareSettings.tsx
import { Theme } from '@/constants/Colors';
import i18n from '@/constants/translations/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { Card, HelperText, Snackbar, TextInput } from 'react-native-paper';

const KV_DEFAULT_TEXT = 'share.defaultText';

export default function ShareSettingsScreen() {
  const [defaultText, setDefaultText] = React.useState('');
  const [snack, setSnack] = React.useState<string | null>(null);

  const colorScheme = useColorScheme();
  const theme = Theme[colorScheme || 'light'];

  const CHAR_MAX = 100;
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
      AsyncStorage.setItem(KV_DEFAULT_TEXT, defaultText).catch(() => { });
    }, 400);
    return () => clearTimeout(id);
  }, [defaultText]);

  return (
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
          {/* DEFAULT SHARE TEXT */}
          <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <Card.Title title="Default share message" titleVariant="titleMedium" />
            <Card.Content>
              <TextInput
                mode="outlined"
                multiline
                numberOfLines={4}
                value={defaultText}
                onChangeText={setDefaultText}
                placeholder={i18n.t('shareExampleText')}
                right={<TextInput.Affix text={`${defaultText.length}/${CHAR_MAX}`} />}
                maxLength={CHAR_MAX}
                textColor={theme.colors.onSurface}
                outlineColor={theme.colors.outline}          // unfocused
                activeOutlineColor={theme.colors.primary}     // focused
                style={{ backgroundColor: theme.colors.surface,  }}
              />
              <HelperText type="info" style={[{ marginTop: 6 , color: theme.colors.onSurfaceVariant }]}>
                {i18n.t('shareSettingsHelperText')}
              </HelperText>
            </Card.Content>
          </Card>
          <Snackbar visible={!!snack} onDismiss={() => setSnack(null)} duration={2000}>
            {snack}
          </Snackbar>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16
  },
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
