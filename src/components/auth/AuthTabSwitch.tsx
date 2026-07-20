import { useEffect } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  active: "login" | "signup";
  onChange: (mode: "login" | "signup") => void;
}

export default function AuthTabSwitch({ active, onChange }: Props) {
  const { width } = useWindowDimensions();

  const containerPadding = 1;
  const containerWidth = width - 48; // px-6 on both sides
  const tabWidth = (containerWidth - containerPadding * 2) / 2;

  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(active === "login" ? 0 : tabWidth, {
      stiffness: 500,
    });
  }, [active, tabWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <View
      className="bg-card rounded-full mb-8 p-px flex-row relative bg-surface"
      style={{ height: 56 }}
    >
      <Animated.View
        className="absolute left-1 top-1 bottom-1 right-1 rounded-full bg-primary"
        style={[
          {
            width: tabWidth,
          },
          indicatorStyle,
        ]}
      />

      <Pressable
        className="flex-1 justify-center items-center"
        onPress={() => onChange("login")}
      >
        <Text
          className={`font-bold text-base ${
            active === "login"
              ? "text-primary-foreground"
              : "text-text-secondary"
          }`}
        >
          Log In
        </Text>
      </Pressable>

      <Pressable
        className="flex-1 justify-center items-center"
        onPress={() => onChange("signup")}
      >
        <Text
          className={`font-bold text-base ${
            active === "signup"
              ? "text-primary-foreground"
              : "text-text-secondary"
          }`}
        >
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
}
