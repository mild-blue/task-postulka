import { Text, View } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
}
export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View className="flex justify-start items-center py-8 px-6">
      <Text className="text-3xl text-accent font-bold text-center">{title}</Text>
      {subtitle && <Text className="text-sm text-primary text-center" numberOfLines={2}>{subtitle}</Text>}
    </View>
  );
}
