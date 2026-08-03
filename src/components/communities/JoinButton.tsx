import { Pressable, Text } from "react-native";

interface Props {
  onPress?: () => void;
  joined?: boolean;
  label?: string;
  size?: "sm" | "md";
}

export function JoinButton({ onPress, joined, label, size = "md" }: Props) {
  const sizing = size === "sm" ? "px-3.5 py-1.5" : "px-5 py-2.5";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  if (joined) {
    return (
      <Pressable
        onPress={onPress}
        className={`${sizing} rounded-full bg-surface border border-border-light`}
      >
        <Text className={`${textSize} font-semibold text-text-primary`}>
          Joined
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      className={`${sizing} rounded-full bg-info/15 border-1 border-info  flex-row items-center justify-center`}
    >
      <Text className={`${textSize} font-semibold text-info`}>
        {label ?? "Join"}
      </Text>
    </Pressable>
  );
}
