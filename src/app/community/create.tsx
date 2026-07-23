// src/app/create-community.tsx
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { router } from "expo-router";
import { useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDiscardConfirm } from "@/components/communities/useDiscardConfirm";
import { useCreateCommunityStore } from "../../store/useCreateCommunityStore";

import { BannerUpload } from "@/components/communities/BannerUpload";
import { FormField } from "@/components/communities/FormField";
import { GenreChips } from "@/components/communities/GenreChips";
import { IconPicker } from "@/components/communities/IconPicker";
import { PrivacyOptions } from "@/components/communities/PrivacyOptions";

export default function CreateCommunityScreen() {
  const {
    icon,
    name,
    description,
    genres,
    bannerUri,
    privacy,
    setIcon,
    setName,
    setDescription,
    toggleGenre,
    setBanner,
    setPrivacy,
    reset,
  } = useCreateCommunityStore();

  const { confirmDiscard } = useDiscardConfirm();

  const hasContent = useMemo(
    () => !!(name || description || genres.length || bannerUri),
    [name, description, genres, bannerUri],
  );

  const isValid = name.trim().length > 0;

  const handleClose = () => {
    confirmDiscard(hasContent, () => {
      reset();
      router.back();
    });
  };

  const handleCreate = () => {
    if (!isValid) return;

    // TODO: replace with real mutation call
    console.log("Creating community:", {
      icon,
      name,
      description,
      genres,
      bannerUri,
      privacy,
    });

    reset();
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-4 border-b border-border-light">
          <Text className="text-text-primary text-2xl font-bold">
            Create Community
          </Text>
          <Pressable
            onPress={handleClose}
            className="w-9 h-9 rounded-full bg-surface items-center justify-center"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} color="#8A8A9E" />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-5">
            <IconPicker selected={icon} onSelect={setIcon} />
          </View>

          <FormField
            label="Community Name"
            required
            placeholder="e.g. Void & Stars"
            value={name}
            onChangeText={setName}
          />

          <FormField
            label="Description"
            placeholder="What is this community about?"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={{ height: 100, textAlignVertical: "top" }}
          />

          <GenreChips selected={genres} onToggle={toggleGenre} />

          <BannerUpload uri={bannerUri} onChange={setBanner} />

          <PrivacyOptions selected={privacy} onSelect={setPrivacy} />
        </ScrollView>

        {/* Sticky footer */}
        <View className="px-4 pt-3 pb-2 border-t border-border-light bg-background">
          <Pressable
            onPress={handleCreate}
            disabled={!isValid}
            className={`rounded-md py-4 items-center ${
              isValid ? "bg-info" : "bg-surface"
            }`}
          >
            <Text
              className={`font-semibold text-base ${
                isValid ? "text-white" : "text-text-disabled"
              }`}
            >
              Create Community 🚀
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
