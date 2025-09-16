import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GifDetail from '@/components/GifDetail';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';
import { GifObjectMinimal } from '@/interfaces/GifObject';
import { Ionicons } from '@expo/vector-icons';

export default function GifInfo() {
  const { gifInfo } = useLocalSearchParams<{ gifInfo?: string }>();
  const data: GifObjectMinimal = gifInfo
    ? JSON.parse(decodeURIComponent(gifInfo))
    : null;

  return (
    <SafeAreaView className="flex-1 justify-start items-center bg-background-dark px-4">
      <ScrollView showsVerticalScrollIndicator={false} className="w-full">
        <View className="w-full flex-row items-center mt-2 mb-2">
          <Pressable
            onPress={() => router.back()}
            className="absolute p-2 -ml-2 mr-2"
          >
            <Ionicons name="chevron-back" size={20} color="white" />
          </Pressable>
          <Header title={data.title} subtitle={data.alt_text} />
        </View>
        <GifDetail gif={data} />
      </ScrollView>
    </SafeAreaView>
  );
}
