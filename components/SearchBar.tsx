import { InteractionManager, Pressable, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

interface SearchProps {
  onPress?: () => void;
  autofocus?: boolean;
}

export default function SearchBar({ onPress, autofocus }: SearchProps) {
  const [value, setValue] = useState<string>('');
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
      className="flex-row items-center bg-background-medium rounded-lg px-6 py-3"
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
    </View>
  );

  return onPress ? (
    // for home screen - only redirects to search screen on press
    <Pressable onPress={onPress} className="w-full">
      {SearchInput}
    </Pressable>
  ) : (
    SearchInput
  );
}
