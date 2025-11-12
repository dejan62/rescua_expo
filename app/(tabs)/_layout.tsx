import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import i18n from '@/constants/translations/i18n';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, Tabs } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import {
  PaperProvider
} from "react-native-paper";


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
  style?: React.ComponentProps<typeof MaterialIcons>['style'];
}) {
  return <MaterialIcons size={28} style={[{ marginBottom: -3 }, props.style]} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
    <Tabs initialRouteName='index'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "RESCUA.eu - vaša senca varnosti",
          headerTitleStyle: { fontSize: 16 },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 8 }}>
              <Link href="/links" asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Settings"
                  hitSlop={10}
                  android_ripple={{ radius: 20 }}
                  style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                >
                  {({ pressed }) => (
                    <TabBarIcon
                      name="link"
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            </Link>   
            <Link href="/hiking" asChild>
                <Pressable
                  accessibilityRole="button"
                  hitSlop={10}
                  android_ripple={{ radius: 20 }}
                  style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                >
                  {({ pressed }) => (
                    <TabBarIcon
                      name="hiking"
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            </Link>              
          </View>
          ),
        }}
      />    
      <Tabs.Screen
        name="share"
        options={{
          title: i18n.t('shareLocation'), 
          tabBarIcon: ({ color }) => <TabBarIcon name="add-location" color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 8 }}>
              <Link href="/shareSettings" asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Settings"
                  hitSlop={10}
                  android_ripple={{ radius: 20 }}
                  style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                >
                  {({ pressed }) => (
                    <TabBarIcon
                      name="settings"
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            </Link>
            <Link href="/links" asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Settings"
                  hitSlop={10}
                  android_ripple={{ radius: 20 }}
                  style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                >
                  {({ pressed }) => (
                    <TabBarIcon
                      name="link"
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            </Link>   
            <Link href="/hiking" asChild>
                <Pressable
                  accessibilityRole="button"
                  hitSlop={10}
                  android_ripple={{ radius: 20 }}
                  style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                >
                  {({ pressed }) => (
                    <TabBarIcon
                      name="hiking"
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            </Link>           
          </View>
          ),
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: 'SOS',
          tabBarIcon: ({ color }) => <TabBarIcon name="sos" color={'#BA1A1A'} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 8 }}>
              <Link href="/sosSettings" asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Settings"
                  hitSlop={10}
                  android_ripple={{ radius: 20 }}
                  style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                >
                  {({ pressed }) => (
                    <TabBarIcon
                      name="settings"
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            </Link>
            <Link href="/links" asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Settings"
                  hitSlop={10}
                  android_ripple={{ radius: 20 }}
                  style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                >
                  {({ pressed }) => (
                    <TabBarIcon
                      name="link"
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            </Link>   
            <Link href="/hiking" asChild>
                <Pressable
                  accessibilityRole="button"
                  hitSlop={10}
                  android_ripple={{ radius: 20 }}
                  style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                >
                  {({ pressed }) => (
                    <TabBarIcon
                      name="hiking"
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            </Link>           
          </View>
          ),
        }}
      />
      <Tabs.Screen
        name="mapzs"
        options={{
          title: i18n.t('mapzs'),
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 8 }}>
              <Link href="/links" asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Settings"
                  hitSlop={10}
                  android_ripple={{ radius: 20 }}
                  style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                >
                  {({ pressed }) => (
                    <TabBarIcon
                      name="link"
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>   
              <Link href="/hiking" asChild>
                <Pressable
                  accessibilityRole="button"
                  hitSlop={10}
                  android_ripple={{ radius: 20 }}
                  style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                >
                  {({ pressed }) => (
                    <TabBarIcon
                      name="hiking"
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>           
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="firstaid"
        options={{
          title: i18n.t('firstAid'),
          tabBarIcon: ({ color }) => <TabBarIcon name="add-moderator" color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 8 }}>
              <Link href="/links" asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Settings"
                  hitSlop={10}
                  android_ripple={{ radius: 20 }}
                  style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                >
                  {({ pressed }) => (
                    <TabBarIcon
                      name="link"
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>   
              <Link href="/hiking" asChild>
                <Pressable
                  accessibilityRole="button"
                  hitSlop={10}
                  android_ripple={{ radius: 20 }}
                  style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                >
                  {({ pressed }) => (
                    <TabBarIcon
                      name="hiking"
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>           
            </View>
          ),
        }}
      />
    </Tabs>
    </PaperProvider>
  );
}
