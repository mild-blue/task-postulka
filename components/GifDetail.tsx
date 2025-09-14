import { Text, View } from 'react-native';

interface GifDetailProps {
  id: string;
}
export default function GifDetail({id}: GifDetailProps) {
  return (
    <View className="flex-1 justify-start items-center pt-12 pb-12">
      <Text className="text-[24px] text-accent font-bold">GIF id: {id}</Text>
    </View>
  );
}
