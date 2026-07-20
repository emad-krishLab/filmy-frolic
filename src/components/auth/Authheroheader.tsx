import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AuthHeroHeaderProps {
  title: string;
  subtitle: string;
}

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80&auto=format&fit=crop";

export default function AuthHeroHeader({
  title,
  subtitle,
}: AuthHeroHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={{ uri: HERO_IMAGE_URL }}
      resizeMode="cover"
      className="h-72 w-full"
    >
      <LinearGradient
        colors={["rgba(8,8,16,0.35)", "rgba(8,8,16,0.85)", "#080810"]}
        locations={[0, 0.6, 1]}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingTop: insets.top + 12,
          paddingHorizontal: 24,
          paddingBottom: 64,
        }}
      >
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 rounded-md bg-primary items-center justify-center mr-2">
            <Text className="text-red-500  text-lg ">
              🎬
            </Text>
          </View>
          <Text className="text-text-primary text-xs tracking-[3px] font-semibold uppercase">
            Filmy Frolic
          </Text>
        </View>

        <Animated.Text
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(150)}
          key={title}
          className="text-text-primary text-3xl font-extrabold"
        >
          {title}
        </Animated.Text>
        <Text className="text-text-secondary text-sm leading-5 pr-10">
          {subtitle}
        </Text>
      </LinearGradient>
    </ImageBackground>
  );
}
