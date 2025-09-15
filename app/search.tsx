import {
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import SearchBar from '@/components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { GifObject } from '@/interfaces/GifObject';
import { fetchGifsByQuery } from '@/services/api';

export default function Search() {
  const [query, setQuery] = useState<string>('');

  // TODO @mpostulka - it somehow shows error when typing
  const {
    data: gifs,
    loading,
    error,
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
    <Pressable>
      <Image
        source={{ uri: item.images.fixed_width_still?.url }}
        style={{ width: '32%', aspectRatio: 1, borderRadius: 12 }}
      />
    </Pressable>
  );

  const GifListHeader = () => (
    <View className="w-full self-start items-start mt-4">
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
  );

  const GifListEmpty = () =>
    !loading && !error && query.trim().length >= 2 ? (
      <View>
        <Text className="self-center text-accent text-2xl font-bold mt-8">
          No GIFs found
        </Text>
      </View>
    ) : error && !loading && query.trim().length >= 2 ? (
      <View>
        <Text className="self-center text-primary text-2xl font-bold mt-8">
          Error: {error.message}
        </Text>
      </View>
    ) : null;

  return (
    <SafeAreaView className="flex-1 justify-start items-center bg-background-dark px-4">
      <View className="w-full mt-10">
        <SearchBar autofocus={true} value={query} setValue={setQuery} />
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
            marginVertical: '3%',
          }}
          contentContainerStyle={{ alignItems: 'stretch' }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<GifListHeader />}
          ListHeaderComponentStyle={{ alignSelf: 'stretch', width: '100%' }}
          ListEmptyComponent={<GifListEmpty />}
        />
      </View>
    </SafeAreaView>
  );
}
