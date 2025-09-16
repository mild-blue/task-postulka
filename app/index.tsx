import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import GifDetail from '@/components/GifDetail';
import { fetchRandomGif } from '@/services/api';
import useFetch from '@/hooks/useFetch';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { GifObject } from '@/interfaces/GifObject';
import { useRouter } from 'expo-router';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorText from '@/components/ErrorText';

export default function Index() {
  const router = useRouter();

  // fetch random gif
  const {
    data: gif,
    loading: gifLoading,
    error: gifError,
    refetch: gifRefetch,
  } = useFetch((): Promise<GifObject> => fetchRandomGif());

  // refetch every 10 seconds only when screen is focused, with useCallback for dependency array
  // TODO @mpostulka - re-enable this!!!
  /*  useFocusEffect(
    useCallback(() => {
      const id = setInterval(gifRefetch, 10_000);
      return () => clearInterval(id);
    }, [gifRefetch]),
  );*/

  return (
    <SafeAreaView className="flex-1 justify-start items-center bg-background-dark px-4">
      <ScrollView showsVerticalScrollIndicator={false} className="w-full">
        <Header
          title={'GIF Explorer'}
          subtitle={'Discover and search amazing GIFs'}
        />
        <View className="w-full">
          <SearchBar onPress={() => router.push('/search')} />
        </View>

        <>
          {gif && !gifLoading && !gifError ? (
            <View className="flex-1 justify-center items-start w-full mt-4">
              <Text className="color-primary text-base font-light">
                Random selected GIF:
              </Text>
              <GifDetail gif={gif} />
            </View>
          ) : gifLoading && !gifError ? (
            <LoadingIndicator />
          ) : (
            <ErrorText message={gifError?.message} />
          )}
        </>
      </ScrollView>
    </SafeAreaView>
  );
}
