import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import GifDetail from '@/components/GifDetail';
import { fetchRandomGif } from '@/services/api';
import useFetch from '@/hooks/useFetch';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function Index() {
  // TODO @mpostulka - handle loading and error states
  const {
    data: gif,
    loading: gifLoading,
    error: gifError,
    refetch: gifRefetch,
  } = useFetch(() => fetchRandomGif());

  // refetch only when screen is focused, with useCallback for dependency array
  useFocusEffect(
    useCallback(() => {
      const id = setInterval(gifRefetch, 10_000);
      return () => clearInterval(id);
    }, [gifRefetch]),
  );

  return (
    <SafeAreaView className="flex-1 justify-start items-center bg-background-dark px-4">
      <Header
        title={'GIF Explorer'}
        subtitle={'Discover and search amazing GIFs'}
      />
      <View className="w-full">
        <SearchBar />
      </View>

      <>
        {gif && !gifLoading && !gifError ? (
          <View className="flex-1 justify-center items-start w-full mt-10">
            <Text className="color-primary text-base font-light">
              Random selected GIF:
            </Text>
            <GifDetail gif={gif} />
          </View>
        ) : gifLoading && !gifError ? (
          <View className="items-center justify-center mt-16">
            <ActivityIndicator size="large" />
            <Text className="text-primary mt-4 opacity-70">Loading…</Text>
          </View>
        ) : (
          <Text className="text-primary text-2xl font-bold mt-8">
            {gifError?.message ?? 'Error when loading random GIF.'}
          </Text>
        )}
      </>
    </SafeAreaView>
  );
}
