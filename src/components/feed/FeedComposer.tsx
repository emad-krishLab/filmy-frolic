import React from "react";
import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

interface FeedComposerProps {
  userName?: string;
  avatarUrl?: string;
  onPress: () => void;
}

export default function FeedComposer({
  userName,
  avatarUrl,
  onPress,
}: FeedComposerProps) {
  const initial = userName?.charAt(0).toUpperCase() ?? "U";

  return (
    <Pressable
      onPress={onPress}
      className="mx-4 mt-4 active:opacity-80"
    >
      <View className="flex-row items-center rounded-xl border border-border-light bg-surface-card p-4">

        {/* Avatar */}

        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            className="h-12 w-12 rounded-full"
          />
        ) : (
          <View className="h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Text className="text-base font-bold text-primary-foreground">
              {initial}
            </Text>
          </View>
        )}

        {/* Placeholder */}

        <View className="ml-4 flex-1">

          <Text className="text-base font-medium text-text-primary">
            What's on your cinematic mind?
          </Text>

          <Text className="mt-1 text-sm text-text-secondary">
            Share a review, opinion or movie moment...
          </Text>

        </View>

      </View>
    </Pressable>
  );
}