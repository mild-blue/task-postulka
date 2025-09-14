import { Text, View } from 'react-native';

interface SearchProps {
  title: string;
  subtitle?: string;
}
export default function SearchBar({title, subtitle}: SearchProps) {
  return (
    <View className="flex-row items-center bg-background-medium rounded-full ">
      <Text className="text-primary">Search Bar</Text>
    </View>
  );
}
