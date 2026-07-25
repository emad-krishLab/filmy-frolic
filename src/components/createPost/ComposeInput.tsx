// src/components/createPost/ComposeInput.tsx
import { View, Text, TextInput } from "react-native";
import { MAX_POST_LENGTH } from "@/utils/types";

interface Props {
  content: string;
  onChangeText: (text: string) => void;
  authorInitial: string;
  authorName: string;
}

export function ComposeInput({ content, onChangeText, authorInitial, authorName }: Props) {
  const remaining = MAX_POST_LENGTH - content.length;
  const isNearLimit = remaining <= 40;

  return (
    <View className="flex-row px-4 py-4 gap-3">
      <View className="w-11 h-11 rounded-full bg-primary items-center justify-center">
        <Text className="text-primary-foreground font-bold">{authorInitial}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-text-secondary text-xs mb-1">{authorName}</Text>
        <TextInput
          value={content}
          onChangeText={onChangeText}
          placeholder="What's happening in cinema?"
          placeholderTextColor="#7A7A8C"
          multiline
          autoFocus
          maxLength={MAX_POST_LENGTH}
          className="text-text-primary text-base"
          style={{ minHeight: 100, textAlignVertical: "top" }}
        />
        <Text
          className={`text-xs text-right mt-1 ${
            isNearLimit ? "text-warning" : "text-text-muted"
          }`}
        >
          {remaining}
        </Text>
      </View>
    </View>
  );
}