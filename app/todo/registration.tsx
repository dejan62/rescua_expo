// app/(tabs)/registration.tsx
import { Text, View } from '@/components/Themed';
import i18n from '@/constants/translations/i18n';
import { signUpUser } from '@/helpers/Authentication';
import * as React from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet, TextInput } from 'react-native';


type FieldErrors = { email?: string; password?: string; confirmPassword?: string; general?: string };

export default function TabOneScreen() {
  const [email, setEmail] = React.useState('dejan.ambrus@gmail.com');
  const [password, setPassword] = React.useState('Test1234');
  const [confirmPassword, setConfirmPassword] = React.useState('Test1234');
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  const emailRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);
  const confirmRef = React.useRef<TextInput>(null);
  React.useEffect(() => {
    // For app launch from killed state
    Linking.getInitialURL().then(url => {
      if (url) {
        handleUrl(url);
      }
    });

    // For app in background or foreground
    const urlListener = Linking.addEventListener('url', ({ url }) => {
      handleUrl(url);
    });

    // Cleanup on unmount
    return () => {
      urlListener.remove();
    };
  }, []);

function handleUrl(url: string) {
    console.log('Received URL:', url);
   
}

  const setFieldError = (field: keyof FieldErrors, message: string) =>
    setErrors(prev => ({ ...prev, [field]: message }));

  const clearFieldError = (field: keyof FieldErrors) =>
    setErrors(prev => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });

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

      // SuperTokens returns FIELD_ERROR with formFields: [{id, error}]
      if (data?.status === 'FIELD_ERROR' && Array.isArray(data.formFields)) {
        const serverErrs: FieldErrors = {};
        for (const f of data.formFields) {
          if (f.id === 'email') serverErrs.email = f.error || 'Invalid email';
          if (f.id === 'password') serverErrs.password = f.error || 'Invalid password';
        }
        setErrors(serverErrs);
        // focus first invalid field from server
        if (serverErrs.email) emailRef.current?.focus();
        else if (serverErrs.password) passwordRef.current?.focus();
        return;
      }

      if (!res.ok) {
        setFieldError('general', data?.message || 'Registration failed');
        return;
      }

      // success
      setErrors({});
      // TODO: navigate to verification / login screen or show success banner
      alert('Registration successful. Please check your email to verify your account.');
    } catch (error: any) {
      setFieldError('general', String(error?.message || error || 'Network error'));
    } finally {
      setSubmitting(false);
    }
  };

  const inputBorder = (field: keyof FieldErrors) => [
    styles.input,
    errors[field] ? styles.inputError : null,
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.title}>{i18n.t('registration')}</Text>

          {!!errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

          <TextInput
            ref={emailRef}
            value={email}
            onChangeText={(v) => { setEmail(v); if (errors.email) clearFieldError('email'); }}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            placeholderTextColor="#999"
            style={inputBorder('email')}
          />
          {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            ref={passwordRef}
            secureTextEntry
            value={password}
            onChangeText={(v) => { setPassword(v); if (errors.password) clearFieldError('password'); }}
            placeholder="Password"
            returnKeyType="next"
            onSubmitEditing={() => confirmRef.current?.focus()}
            placeholderTextColor="#999"
            style={inputBorder('password')}
          />
          {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TextInput
            ref={confirmRef}
            secureTextEntry
            value={confirmPassword}
            onChangeText={(v) => { setConfirmPassword(v); if (errors.confirmPassword) clearFieldError('confirmPassword'); }}
            placeholder="Password (again)"
            returnKeyType="done"
            placeholderTextColor="#999"
            style={[...inputBorder('confirmPassword'), { marginBottom: 40 }]}
            onSubmitEditing={startRegistration}
          />
          {!!errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          <View style={styles.buttonRow}>
            {submitting ? <ActivityIndicator /> :
              <Button title="Register" onPress={startRegistration} disabled={submitting} />
            }
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  input: {
    height: 40, borderColor: 'gray', borderWidth: 1, width: '100%',
    marginTop: 12, paddingHorizontal: 10, color: '#ffffffff', borderRadius: 6,
  },
  inputError: { borderColor: '#ff6b6b' },
  errorText: { width: '100%', marginTop: 6, fontSize: 12, color: '#ff6b6b' },
  buttonRow: { width: '100%', marginTop: 16, alignItems: 'center' },
});
