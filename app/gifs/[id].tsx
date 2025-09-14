import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const GifDetail = () => {
  const { id } = useLocalSearchParams();

  return (
    <View className="bg-background-dark absolute w-full h-full z-0 flex-1 justify-center items-center">
      <Text className="text-xl text-primary">GIF detail: {id}</Text>
    </View>
  );
};

export default GifDetail;
