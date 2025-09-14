import { Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import GifDetail from '@/components/GifDetail';

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background-dark items-center justify-start">
      <Header
        title={'GIF Explorer'}
        subtitle={'Discover and search amazing GIFs'}
      />
      <SearchBar title={'Search'} />
      <GifDetail id={'123'} />
    </SafeAreaView>
  );
}
