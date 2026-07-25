import { useMemo } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useCreatePostStore } from "@/store/useCreatePostStore";
import { useDiscardConfirm } from "@/components/communities/useDiscardConfirm";

import { ComposeHeader } from "@/components/createPost/ComposeHeader";
import { ComposeInput } from "@/components/createPost/ComposeInput";
import { ComposeActionBar } from "../components/createPost/ComposeActionBar";

export default function CreatePostScreen() {
  const { content, communityTag, setContent, setCommunityTag, reset } = useCreatePostStore();
  const { confirmDiscard } = useDiscardConfirm();

  const hasContent = useMemo(() => !!content.trim(), [content]);
  const canPost = content.trim().length > 0;

  const handleClose = () => {
    confirmDiscard(hasContent, () => {
      reset();
      router.back();
    });
  };

  const handlePost = () => {
    if (!canPost) return;

    // TODO: replace with real mutation call
    console.log("Creating post:", { content, communityTag });

    reset();
    router.back();
  };

  const handlePickCommunity = () => {
    // TODO: open a community picker sheet — stub for now
    setCommunityTag("Filmy Frolic");
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ComposeHeader onClose={handleClose} onPost={handlePost} canPost={canPost} />

        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
          <ComposeInput
            content={content}
            onChangeText={setContent}
            authorInitial="E"
            authorName="emad"
          />
        </ScrollView>

        <ComposeActionBar onPickCommunity={handlePickCommunity} communityTag={communityTag} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}