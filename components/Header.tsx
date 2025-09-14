import { Text, View } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
}
export default function Header({title, subtitle}: HeaderProps) {
  return (
    <View className="flex-1 justify-start items-center pt-12 pb-12">
      <Text className="text-[24px] text-accent font-bold">{title}</Text>
      {subtitle &&
        <Text className="text-[14px] text-primary">
          {subtitle}
        </Text>
      }
    </View>
  );
}
