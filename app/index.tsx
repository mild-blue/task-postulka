import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import GifDetail from '@/components/GifDetail';
import { fetchRandomGif } from '@/services/api';
import useFetch from '@/hooks/useFetch';

export default function Index() {
  // TODO @mpostulka - handle loading and error states
  const {
    data: gif,
    loading: gifLoading,
    error: gifError,
  } = useFetch(() => fetchRandomGif());

  return (
    <SafeAreaView className="flex-1 bg-background-dark justify-start items-center px-4">
      <Header
        title={'GIF Explorer'}
        subtitle={'Discover and search amazing GIFs'}
      />
      <View className="w-full">
        <SearchBar />
      </View>

      <View className="flex-1 justify-center items-start w-full mt-10">
        <Text className="color-primary text-base font-light">
          Random selected GIF:
        </Text>
        {gif && <GifDetail gif={gif} />}
      </View>
    </SafeAreaView>
  );
}
