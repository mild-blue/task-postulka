import { ActivityIndicator, Text, View } from 'react-native';

export default function LoadingIndicator() {
  return (
    <View className="items-center justify-center mt-16">
      <ActivityIndicator size="large" />
      <Text className="text-primary mt-4 opacity-70">Loading…</Text>
    </View>
  );
}
