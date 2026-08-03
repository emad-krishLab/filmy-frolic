// src/components/common/MediaFallback.tsx
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

const GRADIENTS: [string, string][] = [
  ["#7C5CFC", "#E91E8C"],
  ["#3B82F6", "#1FD1A8"],
  ["#F39C12", "#E91E8C"],
  ["#9B59B6", "#3B82F6"],
];

interface Props {
  seed: string;
  className?: string;
  style?: object;
  children?: React.ReactNode;
}

export function MediaFallback({ seed, className, style, children }: Props) {
  const index = seed.charCodeAt(0) % GRADIENTS.length;
  const [start, end] = GRADIENTS[index];

  return (
    <LinearGradient
      colors={[start, end]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className={className}
      style={style}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.25,
        }}
      >
        <Text style={{ fontSize: 48 }}>🎬</Text>
      </View>
      {children}
    </LinearGradient>
  );
}
