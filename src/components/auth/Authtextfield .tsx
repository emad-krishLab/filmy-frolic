import { EyeIcon, EyeOffIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import React, { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

interface AuthTextFieldProps extends TextInputProps {
  label: string;
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"];
  isPassword?: boolean;
  error?: string;
}

export default function AuthTextField({
  label,
  icon,
  isPassword = false,
  error,
  ...rest
}: AuthTextFieldProps) {
  const [secure, setSecure] = useState(isPassword);
  const [focused, setFocused] = useState(false);

  return (
    <View className="mb-4">
      <Text className="text-text-primary text-sm font-semibold mb-2">
        {label}
      </Text>

      <View
        className={[
          "flex-row items-center h-14 rounded-xl border bg-surface-card px-4",
          error
            ? "border-danger"
            : focused
              ? "border-primary"
              : "border-border",
        ].join(" ")}
      >
        <HugeiconsIcon
          icon={icon}
          size={18}
          color={error ? "#E84545" : focused ? "#F5C518" : "#8A8A9E"}
        />

        <TextInput
          className="flex-1 ml-3 text-text-primary text-base"
          placeholderTextColor="#7A7A8C"
          secureTextEntry={secure}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />

        {isPassword && (
          <Pressable
            onPress={() => setSecure((prev) => !prev)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={secure ? "Show password" : "Hide password"}
          >
            <HugeiconsIcon
              icon={secure ? EyeOffIcon : EyeIcon}
              size={18}
              color="#8A8A9E"
            />
          </Pressable>
        )}
      </View>

      {error ? (
        <Text className="text-danger text-xs mt-1.5">{error}</Text>
      ) : null}
    </View>
  );
}
