import { View } from '@/components/Themed';
import { Image, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/RESCUA-transparent.png')} // put your file at app root: /assets/logo.png
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="App logo"
      />
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
  logo: {
    width: 180,
    height: 180,
  },
});
