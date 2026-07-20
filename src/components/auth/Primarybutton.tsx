import React, { useState } from "react";
import { Pressable, Text, ActivityIndicator, PressableProps } from "react-native";

interface PrimaryButtonProps extends PressableProps {
  label: string;
  loading?: boolean;
}


export default function PrimaryButton({
  label,
  loading = false,
  disabled = false,
  ...rest
}: PrimaryButtonProps) {
  const [pressed, setPressed] = useState(false);
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      accessibilityRole="button"
      className={[
        "h-14 rounded-full items-center justify-center bg-primary shadow-button",
        pressed ? "opacity-80" : "",
        isDisabled ? "opacity-50" : "",
      ].join(" ")}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#080810" />
      ) : (
        <Text className="text-primary-foreground text-base font-bold tracking-wide">
          {label}
        </Text>
      )}
    </Pressable>
  );
}