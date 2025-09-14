import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchProps {}

export default function SearchBar({}: SearchProps) {
  return (
    <View className="flex-row justify-start items-center bg-background-medium rounded-lg px-6 py-4">
      <Ionicons name="search" size={24} className="mr-4" color="white" />
      <Text className="text-accent text-lg font-light">Search for GIFs...</Text>
    </View>
  );
}
