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
    header: 'Vreme',
    items: [
      {
        title: 'Meteo Slovenija',
        description: 'Vremenska napoved za gorski svet',
        url: 'https://meteo.arso.gov.si/met/sl/weather/bulletin/mountain/',
        icon: 'weather-partly-cloudy',
      },
      {
        title: 'Meteo Slovenija - Plazovi',
        description: 'Nevarnost plazov',
        url: 'https://meteo.arso.gov.si/met/sl/weather/bulletin/mountain/avalanche/bulletin/',
        icon: 'slope-downhill',
      },
    ],
  },
    {
    header: 'Zemljevid in navigacija',
    items: [
      {
        title: 'maPZS',
        description: 'Uradni zemljevid planinske zveze Slovenije',
        url: 'https://mapzs.pzs.si/home/trails',
        icon: 'map',
      },
    ],
  },
  {
    header: 'Mountain Safety',
    items: [
       {
        title: 'PZS',
        description: 'Planinska Zveza Slovenije - Postani član tudi ti!',
        url: 'https://pzs.si/',
        icon: 'hiking',
      },
      {
        title: 'GRZS',
        description: 'Gorska Reševalna Zveza Slovenije - Postanite podpornik',
        url: 'https://www.grzs.si/postani-podpornik/',
        icon: 'helicopter',
      },
     
    ],
  },

  {
    header: 'Prva pomoč',
    items: [
      {
        title: 'Prva pomoč',
        description: '',
        url: 'https://prva-pomoc.si/',
        icon: 'medical-bag',
      }
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
