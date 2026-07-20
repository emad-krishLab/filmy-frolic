import { useEffect } from "react";
import { View, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import LoginForm from "./Login";

import SignupForm from "./Signup";

interface Props {
  mode: "login" | "signup";
}

export default function AnimatedAuthContainer({ mode }: Props) {
  const { width: screenWidth } = useWindowDimensions();

  const horizontalPadding = 24;

  const pageWidth = screenWidth - horizontalPadding * 2;

  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(mode === "login" ? 0 : -pageWidth, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [mode, pageWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <View
      style={{
        width: pageWidth,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={[
          {
            flexDirection: "row",
            width: pageWidth * 2,
          },
          animatedStyle,
        ]}
      >
        <View
          style={{
            width: pageWidth,
          }}
        >
          <LoginForm />
        </View>

        <View
          style={{
            width: pageWidth,
          }}
        >
          <SignupForm />
        </View>
      </Animated.View>
    </View>
  );
}
