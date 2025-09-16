import { Text, View, Image, FlatList, Pressable } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import {
  convertGifObjectToMinimal,
  GifObject,
} from '@/interfaces/GifObject';
import { fetchGifsByQuery } from '@/services/api';
import { Link } from 'expo-router';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorText from '@/components/ErrorText';

export default function Search() {
  const [query, setQuery] = useState<string>('');

  // TODO @mpostulka - it somehow shows error when typing
  const {
    data: gifs,
    loading: gifsLoading,
    error: gifsError,
    refetch: refetchGifs,
    reset: resetFetchGifs,
  } = useFetch((): Promise<GifObject[]> => fetchGifsByQuery(query));

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query.trim().length < 2) {
        resetFetchGifs();
      } else {
        await refetchGifs();
      }

      return () => clearTimeout(timeoutId);
    }, 500);
  }, [query]);

  const GifPreview = (item: GifObject) => (
    <Link
      href={{
        pathname: '/gif-info',
        params: {
          // do not pass the whole object, just the minimal needed info
          gifInfo: encodeURIComponent(
            JSON.stringify(convertGifObjectToMinimal(item)),
          ),
        },
      }}
      asChild
    >
      <Pressable key={item.id} className="w-[31%]">
        <Image
          source={{ uri: item.images.fixed_width_still?.url }}
          className="w-full aspect-square rounded-xl"
          resizeMode="cover"
        />
      </Pressable>
    </Link>
  );

  return (
    <SafeAreaView className="flex-1 justify-start items-center bg-background-dark px-4">
      <View className="w-full mt-10">
        <SearchBar autofocus={true} value={query} setValue={setQuery} />
      </View>

      <View className="w-full self-start items-start mb-1">
        {query.trim().length >= 2 ? (
          <Text className="text-primary font-normal text-xl">
            Search results for:{' '}
            <Text className="text-accent font-bold">{query.trim()}</Text>
          </Text>
        ) : (
          <Text className="text-accent/80 font-normal text-base">
            Type at least 2 characters
          </Text>
        )}
      </View>

      <View className="w-full flex-1">
        <FlatList
          data={gifs}
          renderItem={({ item }) => <GifPreview {...item} />}
          keyExtractor={(item: GifObject) => item.id}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'center',
            gap: '3%',
            marginVertical: '1.5%',
          }}
          contentContainerStyle={{ alignItems: 'stretch' }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            query.trim().length >= 2 ? (
              !gifsLoading && !gifsLoading ? (
                <ErrorText message={'No GIFs found'} />
              ) : gifsLoading && !gifsError ? (
                <LoadingIndicator />
              ) : (
                <ErrorText message={gifsError?.message} />
              )
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
}
