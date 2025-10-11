// app/(tabs)/registration.tsx
import i18n from '@/constants/translations/i18n';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Card, HelperText, Text, TextInput, useTheme } from 'react-native-paper';

type FieldErrors = { email?: string; password?: string; general?: string };

export default function LoginScreen() {
  const theme = useTheme();
  const isDark = theme.dark; // ← Paper's dark mode flag

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      // TODO: your login logic
      // setErrors({ general: 'Invalid credentials' })
    } finally {
      setSubmitting(false);
    }
  };

  const hasEmailError = !!errors.email;
  const hasPasswordError = !!errors.password;
  const hasGeneralError = !!errors.general;

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: isDark ? '#000000' : theme.colors.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 50 })}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: isDark ? '#000000' : theme.colors.background }} // ensure scroll bg matches
        >
          <View style={styles.container}>
            <View style={[styles.iconWrap, { backgroundColor: theme.colors.secondaryContainer }]}>
              <MaterialIcons name="login" size={56} color={theme.colors.primary} />
            </View>

            <Text variant="headlineMedium" style={styles.title}>
              {i18n.t('login')}
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {i18n.t('notRegistered')}
            </Text>

            <Card
              mode="elevated"
              style={[
                styles.card,
                { backgroundColor: isDark ? '#111111' : theme.colors.surface }, // darker card in dark mode
              ]}
            >
              <Card.Content style={{ gap: 12 }}>
                {hasGeneralError && (
                  <Text variant="bodyMedium" style={{ color: theme.colors.error }}>
                    {errors.general}
                  </Text>
                )}

                <TextInput
                  mode="outlined"
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  error={hasEmailError}
                  left={<TextInput.Icon icon="email-outline" />}
                />
                <HelperText type="error" visible={hasEmailError}>
                  {errors.email}
                </HelperText>

                <TextInput
                  mode="outlined"
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  error={hasPasswordError}
                  left={<TextInput.Icon icon="lock-outline" />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      onPress={() => setShowPassword((s) => !s)}
                      forceTextInputFocus={false}
                    />
                  }
                />
                <HelperText type="error" visible={hasPasswordError}>
                  {errors.password}
                </HelperText>

                <Button
                  mode="contained"
                  onPress={onSubmit}
                  loading={submitting}
                  disabled={submitting}
                  contentStyle={{ height: 48 }}
                  style={{ borderRadius: 12, marginTop: 4 }}
                >
                  {i18n.t('login')}
                </Button>

                {submitting && <ActivityIndicator style={{ marginTop: 8 }} animating size="small" />}
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
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
    marginBottom: 4,
    borderRadius: 999,
    padding: 10,
  },
  title: { textAlign: 'center' },
  subtitle: { opacity: 0.8, marginBottom: 6, textAlign: 'center' },
  card: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
});
