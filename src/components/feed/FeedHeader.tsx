import { PlusSignIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export const FeedHeader = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <View className="px-4 pt-2 pb-3 bg-background ">
      <View className="flex-row items-center gap-4">
        {/* Search Bar */}
        <View className="flex-1 flex-row items-center bg-surface-card rounded-xl px-4 py-0.5 border border-border-light">
          <HugeiconsIcon icon={Search01Icon} size={18} color="#8A8A9E" />
          <TextInput
            className="flex-1 text-text-primary text-sm ml-2"
            placeholder="Search posts, users..."
            placeholderTextColor="#8A8A9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>

        {/* Add Post Button */}
        <TouchableOpacity
          onPress={() => router.push("/create-post")}
          className="bg-primary w-11 h-11 rounded-full items-center justify-center active:opacity-70"
          accessibilityLabel="Create new post"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={22} color="#080810" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
