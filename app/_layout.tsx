import { Stack } from 'expo-router';
import './globals.css';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="gif-info" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
    </Stack>
  );
}
