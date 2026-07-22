import SocialLogin from "@/components/auth/Googlebutton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

import {
  AtIcon,
  LockPasswordIcon,
  Mail01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import AuthTextField from "./Authtextfield ";
import PrimaryButton from "./Primarybutton";

interface SignupErrors {
  displayName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

export default function SignupScreen() {
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});

  const clearError = (field: keyof SignupErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: SignupErrors = {};

    if (!displayName.trim()) next.displayName = "Enter your display name";
    else if (displayName.trim().length < 2)
      next.displayName = "Display name must be at least 2 characters";

    if (!username.trim()) next.username = "Choose a username";
    else if (username.trim().length < 3)
      next.username = "Username must be at least 3 characters";

    if (!email.trim()) next.email = "Enter your email to continue";
    else if (!EMAIL_REGEX.test(email.trim()))
      next.email = "Enter a valid email address";

    if (!password) next.password = "Create a password";
    else if (password.length < 8) next.password = "Use at least 8 characters";
    else if (!PASSWORD_REGEX.test(password))
      next.password = "Password must include a number and special character";

    if (!confirmPassword) next.confirmPassword = "Confirm your password";
    else if (confirmPassword !== password)
      next.confirmPassword = "Passwords don't match";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      // TODO: Wire up to real backend
      // const res = await fetch('https://filmy-frolic-backend.onrender.com/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ displayName, username, email, password }),
      // });
      // if (!res.ok) throw new Error('Registration failed');
      await new Promise((resolve) => setTimeout(resolve, 900));
      router.replace("/(tabs)/home");
    } catch (err) {
      setErrors({ email: "Something went wrong creating your account" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    Alert.alert("Google sign-in", "Google OAuth coming soon.");
  };

  return (
    <View className="flex-1 bg-background">
      <AuthTextField
        label="Display Name"
        icon={User02Icon}
        placeholder="Your full name or nickname"
        value={displayName}
        onChangeText={(text) => {
          setDisplayName(text);
          clearError("displayName");
        }}
        error={errors.displayName}
      />

      <AuthTextField
        label="Username"
        icon={AtIcon}
        placeholder="Choose a unique username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          clearError("username");
        }}
        error={errors.username}
      />

      <AuthTextField
        label="Email"
        icon={Mail01Icon}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          clearError("email");
        }}
        error={errors.email}
      />

      <AuthTextField
        label="Password"
        icon={LockPasswordIcon}
        placeholder="Min 8 chars, 1 number, 1 symbol"
        isPassword
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          clearError("password");
        }}
        error={errors.password}
      />

      <AuthTextField
        label="Confirm Password"
        icon={LockPasswordIcon}
        placeholder="Confirm your password"
        isPassword
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          clearError("confirmPassword");
        }}
        error={errors.confirmPassword}
      />

      <View className="mb-2 mt-1">
        <PrimaryButton
          label="Create Account"
          onPress={handleRegister}
          loading={loading}
        />
      </View>

      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-border" />
        <Text className="text-text-muted text-xs mx-3">Or</Text>
        <View className="flex-1 h-px bg-border" />
      </View>
      <SocialLogin />
    </View>
  );
}
