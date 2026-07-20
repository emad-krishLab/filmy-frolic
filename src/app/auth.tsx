import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AnimatedAuthContainer from "@/components/auth/AnimatedAuthContainer";
import AuthHeroHeader from "@/components/auth/Authheroheader";
import AuthTabSwitch from "@/components/auth/AuthTabSwitch";

export default function AuthScreen() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="light" />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={40}
        extraHeight={80}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <AuthHeroHeader
          title={mode === "login" ? "Welcome Back" : "Create Account"}
          subtitle={
            mode === "login"
              ? "Sign in to pick up where you left off."
              : "Join Filmy Frolic and start discovering movies."
          }
        />

        <View className="bg-background -mt-8 rounded-t-3xl px-6 pt-6 ">
          <AuthTabSwitch active={mode} onChange={setMode} />

          <AnimatedAuthContainer mode={mode} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
