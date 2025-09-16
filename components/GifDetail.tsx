import { Text, View } from 'react-native';
import { GifObject, GifObjectMinimal } from '@/interfaces/GifObject';
import { Image as ExpoImage } from 'expo-image';
import ErrorText from '@/components/ErrorText';

interface GifDetailProps {
  gif: GifObjectMinimal;
}
export default function GifDetail({ gif }: GifDetailProps) {
  const url = gif?.images?.original?.url;

  if (url == null) {
    return <ErrorText message={'Problem with loading GIF.'} />;
  }

  // ExpoImage needs dimensions to be visible
  const gifW = Number(
    gif?.images?.original?.width ?? gif?.images?.fixed_width?.width ?? 400,
  );
  const gifH = Number(
    gif?.images?.original?.height ?? gif?.images?.fixed_width?.height ?? 300,
  );
  const aspect = gifW / gifH;

  return (
    <View className="flex-1 py-2">
      <ExpoImage
        source={url}
        style={{ width: '100%', aspectRatio: aspect, borderRadius: 12 }}
        autoplay
      />
      <View className="flex-row items-center mt-4">
        <View className="flex-1">
          <Text
            className="text-accent text-3xl font-extrabold leading-tight"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {gif.title || 'N/A'}
          </Text>

          <Text
            className="text-primary text-sm font-light mt-1"
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {url}
          </Text>
        </View>

        <View className="ml-3 h-16 w-16 rounded-full bg-background-light items-center justify-center">
          <Text className="text-white font-semibold">
            {gif.rating?.toUpperCase() || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );
}
