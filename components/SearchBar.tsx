import {
  InteractionManager,
  Pressable,
  TextInput,
  View,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';

interface SearchProps {
  onPress?: () => void;
  autofocus?: boolean;
  value?: string;
  setValue?: (value: string) => void;
}

export default function SearchBar({
  onPress,
  autofocus,
  value,
  setValue,
}: SearchProps) {
  const inputRef = useRef<TextInput>(null);

  // autofocus the text input
  useFocusEffect(() => {
    if (!autofocus) return;

    // focus the input after animations finish
    const task = InteractionManager.runAfterInteractions(() => {
      // one extra frame helps on Android
      requestAnimationFrame(() => inputRef.current?.focus());
    });
    // cleanup if the screen is unfocused before the task is run
    return () => task.cancel();
  });

  const SearchInput = (
    <View
      className="flex-1 flex-row items-center bg-background-medium rounded-lg px-3 py-3 mb-4"
      // for home screen - non-clickable, non-editable
      pointerEvents={onPress ? 'none' : 'auto'}
    >
      <Ionicons name="search" size={18} color="white" className="mr-4" />
      <TextInput
        autoFocus={autofocus}
        editable={!onPress}
        placeholder="Search for GIFs..."
        value={value}
        onChangeText={setValue}
        placeholderTextColor="#E5DBFF"
        // text-[18px] instead of text-lg -> it will cause padding problems with placeholder texts
        className="flex-1 text-primary text-[18px] font-normal"
      />
      {value && value?.length > 0 && (
        <Pressable
          onPress={() => {
            if (setValue != null) {
              setValue('');
            }
          }}
        >
          <Ionicons name="close-circle-outline" size={18} color="white" />
        </Pressable>
      )}
    </View>
  );

  return onPress ? (
    // for home screen - only redirects to search screen on press
    <Pressable onPress={onPress} className="w-full flex-row items-center">
      {SearchInput}
    </Pressable>
  ) : (
    // for search screen - with cancel button
    <View className="w-full flex-row items-center">
      {SearchInput}
      <Pressable
        onPress={() => router.navigate('/')}
        className="ml-4 h-12 justify-center"
      >
        <Text className="text-primary text-xl pb-3">Cancel</Text>
      </Pressable>
    </View>
  );
}
