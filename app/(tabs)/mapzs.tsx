// app/map.tsx (or app/(tabs)/map.tsx if you organize tabs in a folder)
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';

export default function MapScreen() {
  const { url } = useLocalSearchParams<{ url?: string }>();
  const defaultUrl = 'https://mapzs.pzs.si/home/trails';
  const sourceUrl = typeof url === 'string' && url.length > 5 ? url : defaultUrl;

  const webRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);

  const onReload = useCallback(() => webRef.current?.reload(), []);

  return (
      <WebView source={{ uri: defaultUrl }} style={{ flex: 1 }} />
  );
}
