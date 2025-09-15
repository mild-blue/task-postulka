import { Text, View } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
}
export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View className="flex justify-start items-center pt-8 pb-8">
      <Text className="text-3xl text-accent font-bold">{title}</Text>
      {subtitle && <Text className="text-sm text-primary">{subtitle}</Text>}
    </View>
  );
}
