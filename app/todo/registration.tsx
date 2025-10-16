// app/(tabs)/registration.tsx
import { View } from '@/components/Themed';
import i18n from '@/constants/translations/i18n';
import { signUpUser } from '@/helpers/Authentication';
import * as Linking from 'expo-linking';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

// React Native Paper
import {
  Button,
  Divider,
  HelperText,
  Snackbar,
  Surface,
  Text,
  TextInput,
  useTheme
} from 'react-native-paper';

type FieldErrors = { email?: string; password?: string; confirmPassword?: string; general?: string };

export default function RegistrationScreen() {
  const theme = useTheme();

  const [email, setEmail] = React.useState('dejan.ambrus@gmail.com');
  const [password, setPassword] = React.useState('Test1234');
  const [confirmPassword, setConfirmPassword] = React.useState('Test1234');

  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [showPwd, setShowPwd] = React.useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = React.useState(false);
  const [showGeneral, setShowGeneral] = React.useState(false);

  const emailRef = React.useRef<any>(null);
  const passwordRef = React.useRef<any>(null);
  const confirmRef = React.useRef<any>(null);

  React.useEffect(() => {
    // For app launch from killed state
    Linking.getInitialURL().then(url => { if (url) handleUrl(url); });

    // For app in background or foreground
    const sub = Linking.addEventListener('url', ({ url }) => handleUrl(url));
    return () => sub.remove();
  }, []);

  function handleUrl(url: string) {
    console.log('Received URL:', url);
    // handle magic links / verification if needed
  }

  const setFieldError = (field: keyof FieldErrors, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
    if (field === 'general') setShowGeneral(true);
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    setErrors(prev => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  };

  const validateClient = (): boolean => {
    const next: FieldErrors = {};
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) next.email = 'Invalid email';
    if (!password) next.password = 'Password is required';
    if (password !== confirmPassword) next.confirmPassword = 'Passwords do not match';
    setErrors(next);

    // focus first error
    if (next.email) { emailRef.current?.focus(); return false; }
    if (next.password) { passwordRef.current?.focus(); return false; }
    if (next.confirmPassword) { confirmRef.current?.focus(); return false; }
    return Object.keys(next).length === 0;
  };

  const startRegistration = async () => {
    if (!validateClient()) return;
    setSubmitting(true);
    try {
      const res = await signUpUser({ email: email.trim(), password });
      const data = await res.json().catch(() => ({}));

      if (data?.status === 'FIELD_ERROR' && Array.isArray(data.formFields)) {
        const serverErrs: FieldErrors = {};
        for (const f of data.formFields) {
          if (f.id === 'email') serverErrs.email = f.error || 'Invalid email';
          if (f.id === 'password') serverErrs.password = f.error || 'Invalid password';
        }
        setErrors(serverErrs);
        if (serverErrs.email) emailRef.current?.focus();
        else if (serverErrs.password) passwordRef.current?.focus();
        return;
      }

      if (!res.ok) {
        setFieldError('general', data?.message || 'Registration failed');
        return;
      }

      setErrors({});
      setShowGeneral(true);
      setFieldError('general', 'Registration successful. Please verify via the email we sent you.');
    } catch (error: any) {
      setFieldError('general', String(error?.message || error || 'Network error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Surface style={styles.card} elevation={2}>
            <Text variant="headlineMedium" style={styles.title}>
              {i18n.t('registration')}
            </Text>

            <TextInput
              ref={emailRef}
              mode="outlined"
              label="Email"
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              onChangeText={(v) => { setEmail(v); if (errors.email) clearFieldError('email'); }}
              error={!!errors.email}
              style={styles.input}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email}
            </HelperText>

            <TextInput
              ref={passwordRef}
              mode="outlined"
              label="Password"
              value={password}
              secureTextEntry={!showPwd}
              returnKeyType="next"
              onSubmitEditing={() => confirmRef.current?.focus()}
              onChangeText={(v) => { setPassword(v); if (errors.password) clearFieldError('password'); }}
              error={!!errors.password}
              right={
                <TextInput.Icon
                  icon={showPwd ? 'eye-off' : 'eye'}
                  onPress={() => setShowPwd(s => !s)}
                />
              }
              style={styles.input}
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password}
            </HelperText>

            <TextInput
              ref={confirmRef}
              mode="outlined"
              label="Password (again)"
              value={confirmPassword}
              secureTextEntry={!showConfirmPwd}
              returnKeyType="done"
              onSubmitEditing={startRegistration}
              onChangeText={(v) => { setConfirmPassword(v); if (errors.confirmPassword) clearFieldError('confirmPassword'); }}
              error={!!errors.confirmPassword}
              right={
                <TextInput.Icon
                  icon={showConfirmPwd ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPwd(s => !s)}
                />
              }
              style={[styles.input, { marginBottom: 8 }]}
            />
            <HelperText type="error" visible={!!errors.confirmPassword}>
              {errors.confirmPassword}
            </HelperText>

            <Divider style={{ marginVertical: 8 }} />

            <Button
              mode="contained"
              onPress={startRegistration}
              loading={submitting}
              disabled={submitting}
              style={styles.button}
              contentStyle={{ paddingVertical: 6 }}
              icon={submitting ? undefined : 'account-plus'}
            >
              Register
            </Button>
          </Surface>
        </View>
      </ScrollView>

      <Snackbar
        visible={!!errors.general && showGeneral}
        onDismiss={() => setShowGeneral(false)}
        action={
          errors.general?.startsWith('Registration successful')
            ? { label: 'OK', onPress: () => setShowGeneral(false) }
            : undefined
        }
        duration={5000}
      >
        {errors.general}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 16,
  },
  title: { marginBottom: 8 },
  input: { marginTop: 8 },
  button: { marginTop: 12 },
});
