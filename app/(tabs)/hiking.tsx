import { Text, View } from '@/components/Themed';
import i18n from '@/constants/translations/i18n';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';

export default function HikingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <MaterialIcons name="hiking" size={64} color="#4CAF50" />
      </View>

      <Text style={styles.title}>{i18n.t('hello')}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.card}>
        <Text style={styles.paragraph}>{i18n.t('hikingText')}</Text>
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
    padding: 10,
    backgroundColor: 'rgba(76, 175, 80, 0.12)', // subtle green halo
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
    // soft shadow
    elevation: 3, // Android
    shadowColor: '#000', // iOS
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
