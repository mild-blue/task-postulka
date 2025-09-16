import { Text } from 'react-native';

interface ErrorTextProps {
  message?: string;
}
export default function ErrorText({ message }: ErrorTextProps) {
  return (
    <Text className="self-center text-primary text-2xl font-bold mt-8">
      {message ?? 'Unexpected error.'}
    </Text>
  );
}
