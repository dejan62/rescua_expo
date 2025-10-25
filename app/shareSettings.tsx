// app/(tabs)/shareSettings.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';
import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Card, HelperText, IconButton, List, PaperProvider, Portal, Searchbar, Snackbar, Text, TextInput } from 'react-native-paper';

type FavContact = { name: string; phone: string };

const KV_DEFAULT_TEXT = 'share.defaultText';
const KV_FAVORITE_CONTACT = 'share.favoriteContact';

export default function ShareSettingsScreen() {
  const [defaultText, setDefaultText] = React.useState('');
  const [fav, setFav] = React.useState<FavContact | null>(null);

  // Contact picker state
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [contacts, setContacts] = React.useState<Contacts.Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [snack, setSnack] = React.useState<string | null>(null);

  // Load persisted settings
  React.useEffect(() => {
    (async () => {
      const [t, f] = await Promise.all([
        AsyncStorage.getItem(KV_DEFAULT_TEXT),
        AsyncStorage.getItem(KV_FAVORITE_CONTACT),
      ]);
      if (t) setDefaultText(t);
      if (f) {
        try { setFav(JSON.parse(f)); } catch {}
      }
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

    try {
      setLoadingContacts(true);
      setPickerOpen(true);

      // Fetch contacts with phone numbers only
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
        pageSize: 5000, // Expo SDK caps internally
        sort: Contacts.SortTypes.FirstName,
      });

      const withPhones = (data || []).filter(c => (c.phoneNumbers?.length ?? 0) > 0);
      setContacts(withPhones);
    } catch (e: any) {
      setSnack(e?.message ?? 'Failed to load contacts.');
      setPickerOpen(false);
    } finally {
      setLoadingContacts(false);
    }
  };

  const filtered = React.useMemo(() => {
    if (!q.trim()) return contacts;
    const s = q.trim().toLowerCase();
    return contacts.filter(c =>
      (c.name?.toLowerCase().includes(s)) ||
      (c.phoneNumbers ?? []).some(p => p.number?.toLowerCase().includes(s))
    );
  }, [contacts, q]);

  const selectContact = async (c: Contacts.Contact, phoneIdx = 0) => {
    const pn = c.phoneNumbers?.[phoneIdx]?.number?.trim();
    if (!pn) return;

    const picked: FavContact = { name: c.name ?? pn, phone: pn };
    setFav(picked);
    await AsyncStorage.setItem(KV_FAVORITE_CONTACT, JSON.stringify(picked)).catch(() => {});
    setPickerOpen(false);
    setSnack(`Favorite set to ${picked.name}`);
  };

  const clearFavorite = async () => {
    setFav(null);
    await AsyncStorage.removeItem(KV_FAVORITE_CONTACT).catch(() => {});
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

      {/* FAVORITE PERSON */}
      <Card mode="elevated" style={styles.card}>
        <Card.Title
          title="Favorite person"
          titleVariant="titleMedium"
          right={(props) =>
            fav ? (
              <IconButton {...props} icon="close-circle" onPress={clearFavorite} accessibilityLabel="Clear favorite" />
            ) : null
          }
        />
        <Card.Content style={{ gap: 8 }}>
          {fav ? (
            <List.Item
              title={fav.name}
              description={fav.phone}
              left={p => <List.Icon {...p} icon="account" />}
              right={p => <IconButton {...p} icon="pencil" onPress={openPicker} accessibilityLabel="Change favorite" />}
            />
          ) : (
            <Text style={{ opacity: 0.8 }}>No favorite person set.</Text>
          )}
        </Card.Content>
        <Card.Actions>
          <Button icon="account-search" onPress={openPicker}>Choose from contacts</Button>
        </Card.Actions>
      </Card>

      {/* CONTACT PICKER PANEL */}
      <Portal>
        {pickerOpen && (
          <Card style={styles.pickerSheet}>
            <Card.Title title="Pick a favorite" />
            <Card.Content>
              <Searchbar
                placeholder="Search contacts"
                value={q}
                onChangeText={setQ}
                autoCorrect={false}
                autoCapitalize="none"
              />
              {loadingContacts ? (
                <View style={styles.centerRow}>
                  <ActivityIndicator />
                  <Text style={{ marginLeft: 8 }}>Loading contacts…</Text>
                </View>
              ) : (
                <FlatList
                  data={filtered}
                  style={{ maxHeight: 420, marginTop: 8 }}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => {
                    const phones = item.phoneNumbers ?? [];
                    const primary = phones[0]?.number ?? 'No number';
                    return (
                      <List.Item
                        title={item.name ?? primary}
                        description={primary}
                        left={p => <List.Icon {...p} icon="account" />}
                        onPress={() => selectContact(item, 0)}
                      />
                    );
                  }}
                  ListEmptyComponent={
                    <Text style={{ opacity: 0.7, textAlign: 'center', marginTop: 16 }}>
                      No contacts found.
                    </Text>
                  }
                />
              )}
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => setPickerOpen(false)}>Close</Button>
            </Card.Actions>
          </Card>
        )}
      </Portal>

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
