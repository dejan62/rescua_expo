import { Text, View } from '@/components/Themed';
import i18n from '@/constants/translations/i18n';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';

export default function FirstAidScreen() {
  // Fallback text if 'firstAidText' isn't in translations yet
  const raw = i18n.t('firstAidText') as string;
  const content =
    raw === 'firstAidText'
      ? 'On this page you can read some basic first-aid guidance.'
      : raw;


  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
         <MaterialIcons name="add-moderator" size={64} color="#E53935" />
      </View>

      <Text style={styles.title}>{i18n.t('hello')}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.card}>
        <Text style={styles.paragraph}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  iconWrap: {
    marginBottom: 12,
    borderRadius: 999,
    padding: 12,
    backgroundColor: 'rgba(229, 57, 53, 0.12)', // subtle red halo
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  separator: {
    marginVertical: 16,
    height: 1,
    width: '70%',
  },
  card: {
    width: '80%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  paragraph: {
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 16,
  },
});
