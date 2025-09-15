import { Text, View, Image } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Search() {
  return (
    <SafeAreaView className="flex-1 justify-start items-center bg-background-dark px-4">
      <View className="w-full mt-10">
        <SearchBar autofocus={true}
        />
      </View>
    </SafeAreaView>
  );
}
