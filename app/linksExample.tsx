// app/(tabs)/links.tsx
import { Theme } from '@/constants/Colors';
import * as React from 'react';
import { Alert, Linking, ScrollView, useColorScheme } from 'react-native';
import { Card, Divider, List, Text } from 'react-native-paper';

type LinkItem = {
  title: string;
  description?: string;
  url: string;
  icon?: string; // MaterialCommunityIcons name (Paper uses these)
};

type LinkSection = {
  header: string;
  items: LinkItem[];
};

const SECTIONS: LinkSection[] = [
  {
    header: 'Emergency',
    items: [
      {
        title: 'Call 112 (EU Emergency)',
        description: 'Dial now from your phone',
        url: 'tel:041565455',
        icon: 'phone',
      },
      {
        title: 'SMS to 112',
        description: 'Open SMS composer to 112',
        url: 'sms:041565455',
        icon: 'message-text',
      },
    ],
  },
  {
    header: 'Navigation & Maps',
    items: [
      {
        title: 'Google Maps',
        description: 'maps.google.com',
        url: 'https://maps.google.com',
        icon: 'map',
      },
      {
        title: 'OpenStreetMap',
        description: 'www.openstreetmap.org',
        url: 'https://www.openstreetmap.org',
        icon: 'map-search',
      },
    ],
  },
  {
    header: 'Weather',
    items: [
      {
        title: 'Windy',
        description: 'Global wind & weather',
        url: 'https://www.windy.com',
        icon: 'weather-windy',
      },
      {
        title: 'MeteoBlue',
        description: 'Forecasts & maps',
        url: 'https://www.meteoblue.com',
        icon: 'weather-partly-cloudy',
      },
    ],
  },
  {
    header: 'Safety & Mountain Info',
    items: [
      {
        title: 'Red Cross – First Aid',
        description: 'Basic guidance and tips',
        url: 'https://www.redcross.org/first-aid/first-aid-steps.html',
        icon: 'medical-bag',
      },
      {
        title: 'Mountain Etiquette',
        description: 'Hiking code & best practices',
        url: 'https://www.alpenverein.de/bergsport/sicher-am-berg/berge-huetten/10-berghuetttenregeln_aid_33750.html',
        icon: 'hiking',
      },
    ],
  },
];



export default function UsefulLinksScreen() {
    const colorScheme = useColorScheme();
    const theme = Theme[colorScheme || 'light']; 

  const openUrl = React.useCallback(async (url: string) => {
    try {
      const can = await Linking.canOpenURL(url);
      if (!can) {
        Alert.alert('Cannot open link', url);
        return;
      }
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert('Error', 'Failed to open the link.');
      // You might log the error in your app
    }
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 12,
        paddingBottom: 32,
      }}
    >
      <Card mode="elevated" style={{ marginBottom: 12, backgroundColor: theme.colors.surface }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 6, fontWeight: 'bold', color: theme.colors.onSurface }}>
            Useful Links
          </Text>
          <Text variant="bodyMedium" style={{ opacity: 0.8, color: theme.colors.onSurface }}>
            Quick access to maps, weather, and emergency contacts. Tap any item to open it.
          </Text>
        </Card.Content>
      </Card>

      {SECTIONS.map((section, i) => (
        <React.Fragment key={section.header}>
          <List.Section style={{ backgroundColor: theme.colors.surface, borderRadius: 8, paddingVertical: 4, marginBottom: 8 }}>
            <List.Subheader style={{color: theme.colors.onSurface, opacity: 0.7}}>{section.header}</List.Subheader>
            {section.items.map((item, idx) => (
              <List.Item
                key={item.title}
                title={item.title}
                titleStyle={{ color: theme.colors.onSurface }}
                description={item.description}
                descriptionStyle={{ color: theme.colors.onSurfaceVariant, opacity: 0.7 }}
                onPress={() => openUrl(item.url)}
                left={props => <List.Icon {...props} icon={item.icon ?? 'link-variant'} color={theme.colors.onSurfaceVariant} />}
                right={props => <List.Icon {...props} icon="open-in-new" />}
                style={{ marginHorizontal: 8, marginVertical: 4, borderRadius: 6 }}
              />
            ))}
          </List.Section>
          {i < SECTIONS.length - 1 && <Divider style={{ marginVertical: 4 }} />}
        </React.Fragment>
      ))}
    </ScrollView>
  );
}
