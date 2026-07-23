import { ArrowLeft01Icon, MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { router } from "expo-router";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  bannerUrl: string;
  icon: string;
  onMorePress: () => void;
}

export function CommunityBanner({ bannerUrl, icon, onMorePress }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <ImageBackground source={{ uri: bannerUrl }} className="w-full h-44">
        <View
          className="flex-row items-center justify-between px-4"
          style={{ paddingTop: insets.top + 8 }}
        >
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-background/70 items-center justify-center"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={22} color="#F0F0F8" />
          </Pressable>
          <Pressable
            onPress={onMorePress}
            className="w-10 h-10 rounded-full bg-background/70 items-center justify-center"
          >
            <HugeiconsIcon icon={MoreVerticalIcon} size={22} color="#F0F0F8" />
          </Pressable>
        </View>
      </ImageBackground>

      {/* Icon avatar overlapping banner, Instagram-style */}
      <View className="absolute -bottom-8 left-4 w-16 h-16 rounded-md bg-accent-purple border-4 border-background items-center justify-center">
        <Text className="text-3xl">{icon}</Text>
      </View>
    </View>
  );
}
