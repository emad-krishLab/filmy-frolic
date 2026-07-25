// src/components/createPost/ComposeHeader.tsx
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

interface Props {
  onClose: () => void;
  onPost: () => void;
  canPost: boolean;
}

export function ComposeHeader({ onClose, onPost, canPost }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center justify-between px-4 pb-3 border-b border-border-light"
      style={{ paddingTop: insets.top + 8 }}
    >
      <Pressable
        onPress={onClose}
        className="w-9 h-9 rounded-full bg-surface items-center justify-center"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={18} color="#8A8A9E" />
      </Pressable>

      <Pressable
        onPress={onPost}
        disabled={!canPost}
        className={`px-5 py-2 rounded-full ${canPost ? "bg-primary" : "bg-surface"}`}
      >
        <Text
          className={`text-sm font-semibold ${
            canPost ? "text-primary-foreground" : "text-text-disabled"
          }`}
        >
          Post
        </Text>
      </Pressable>
    </View>
  );
}