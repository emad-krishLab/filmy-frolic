import SocialLogin from "@/components/auth/Googlebutton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import AuthTextField from "./Authtextfield ";
import PrimaryButton from "./Primarybutton";

interface LoginErrors {
  email?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const validate = (): boolean => {
    const next: LoginErrors = {};
    if (!email.trim()) next.email = "Enter your email to continue";
    else if (!EMAIL_REGEX.test(email.trim()))
      next.email = "Enter a valid email address";
    if (!password) next.password = "Enter your password to continue";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      // TODO: Wire up to real backend auth
      // const res = await fetch('https://filmy-frolic-backend.onrender.com/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: email.trim(), password }),
      // });
      // if (!res.ok) throw new Error('Invalid credentials');
      // const data = await res.json();
      // store token in AsyncStorage...
      await new Promise((resolve) => setTimeout(resolve, 900));
      router.replace("/(tabs)/home");
    } catch (err) {
      setErrors({ password: "That email and password didn't match" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert("Google sign-in", "Google OAuth coming soon.");
  };

  return (
    <View>
      <AuthTextField
        label="Email"
        icon="mail"
        placeholder="jhon@gmail.com"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email)
            setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={errors.email}
      />

      <AuthTextField
        label="Password"
        icon="lock"
        placeholder="••••••••••"
        isPassword
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password)
            setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        error={errors.password}
      />

      <View className="flex-row items-center justify-between mb-6">
        <Pressable
          className="flex-row items-center"
          onPress={() => setRemember((prev) => !prev)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: remember }}
        >
          <View
            className={`w-5 h-5 rounded-xs border items-center justify-center mr-2 ${
              remember ? "bg-primary border-primary" : "border-border"
            }`}
          >
            {remember && (
              <View className="w-2 h-2 rounded-sm bg-primary-foreground" />
            )}
          </View>
          <Text className="text-text-secondary text-sm">Remember me</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            Alert.alert("Forgot password", "Password reset coming soon.")
          }
        >
          <Text className="text-primary text-sm font-semibold">
            Forgot Password?
          </Text>
        </Pressable>
      </View>

      <PrimaryButton label="Login" onPress={handleLogin} loading={loading} />

      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-border" />
        <Text className="text-text-muted text-xs mx-3">Or continue with</Text>
        <View className="flex-1 h-px bg-border" />
      </View>
      <SocialLogin />
    </View>
  );
}
