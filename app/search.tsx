import { Text, View, Image, FlatList, Pressable } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { convertGifObjectToMinimal, GifObject } from '@/interfaces/GifObject';
import { fetchGifsByQuery } from '@/services/api';
import { Link } from 'expo-router';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorText from '@/components/ErrorText';

export default function Search() {
  const [query, setQuery] = useState<string>('');
  // show loading indicator while debouncing instead of error text
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

  const {
    data: gifs,
    loading: gifsLoading,
    error: gifsError,
    refetch: refetchGifs,
    reset: resetFetchGifs,
  } = useFetch((): Promise<GifObject[]> => fetchGifsByQuery(query));

  useEffect(() => {
    if (query.trim().length < 2) {
      resetFetchGifs();
      setIsDebouncing(false);
      return;
    }

    setIsDebouncing(true);
    const timeoutId = setTimeout(() => {
      setIsDebouncing(false);
      refetchGifs();
    }, 500);

    return () => clearTimeout(timeoutId);
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
              gifsLoading || isDebouncing ? (
                <LoadingIndicator />
              ) : gifsError ? (
                <ErrorText
                  message={gifsError.message ?? 'Something went wrong'}
                />
              ) : gifs?.length === 0 ? (
                <ErrorText message="No GIFs found" />
              ) : null
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
}
