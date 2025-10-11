import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import i18n from '@/constants/translations/i18n';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';


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
    <Tabs initialRouteName='hiking'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="share"
        options={{
           title: i18n.t('shareLocation'), 
          tabBarIcon: ({ color }) => <TabBarIcon name="add-location" color={color} />,
          headerRight: () => (
            <Link href="/login" asChild>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Login"
                hitSlop={10}
                android_ripple={{ radius: 20 }}
                style={{ paddingHorizontal: 8, paddingVertical: 4 }}
              >
                {({ pressed }) => (
                  <TabBarIcon
                    name="login"
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />      
      <Tabs.Screen
        name="sos"
        options={{
          title: 'SOS',
          tabBarIcon: ({ color }) => <TabBarIcon name="sos" color={color} />,
                    headerRight: () => (
            <Link href="/login" asChild>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Login"
                hitSlop={10}
                android_ripple={{ radius: 20 }}
                style={{ paddingHorizontal: 8, paddingVertical: 4 }}
              >
                {({ pressed }) => (
                  <TabBarIcon
                    name="login"
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
     {/* <Tabs.Screen
        name="registration"
        options={{
          title: 'Registration',
          tabBarIcon: ({ color }) => <TabBarIcon name="login" color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <TabBarIcon name="login" color={color} />,
        }}
      />*/}
      <Tabs.Screen
        name="firstaid"
        options={{
          title: i18n.t('firstAid'),
          tabBarIcon: ({ color }) => <TabBarIcon name="add-moderator" color={color} />,
                    headerRight: () => (
            <Link href="/login" asChild>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Login"
                hitSlop={10}
                android_ripple={{ radius: 20 }}
                style={{ paddingHorizontal: 8, paddingVertical: 4 }}
              >
                {({ pressed }) => (
                  <TabBarIcon
                    name="login"
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="hiking"
        options={{
          title: i18n.t('hiking'),
          tabBarIcon: ({ color }) => <TabBarIcon name="hiking" color={color} />,
                    headerRight: () => (
            <Link href="/login" asChild>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Login"
                hitSlop={10}
                android_ripple={{ radius: 20 }}
                style={{ paddingHorizontal: 8, paddingVertical: 4 }}
              >
                {({ pressed }) => (
                  <TabBarIcon
                    name="login"
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
