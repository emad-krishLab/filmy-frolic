// src/components/feed/CommentsBottomSheet.tsx
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Cancel01Icon, Sent02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Comment {
  id: string;
  authorName: string;
  content: string;
  timestamp: string;
}

interface CommentsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, comment: string) => void;
}

export const CommentsBottomSheet: React.FC<CommentsBottomSheetProps> = ({
  isVisible,
  onClose,
  postId,
  comments,
  onAddComment,
}) => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const inputRef = useRef<TextInput>(null);
  const [commentText, setCommentText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Snap points: 50% and 85% of screen height
  const snapPoints = useMemo(() => ["50%", "85%"], []);

  // Handle keyboard events
  useEffect(() => {
    const keyboardShow = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardHide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  // Control bottom sheet visibility
  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
      // Auto-focus input after sheet opens
      setTimeout(() => inputRef.current?.focus(), 500);
    } else {
      bottomSheetRef.current?.close();
      setCommentText("");
    }
  }, [isVisible]);

  const getRelativeTime = (isoDate: string) => {
    const now = new Date();
    const then = new Date(isoDate);
    const diffMinutes = Math.floor(
      (now.getTime() - then.getTime()) / (1000 * 60),
    );

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  const handleSendComment = () => {
    if (commentText.trim()) {
      onAddComment(postId, commentText.trim());
      setCommentText("");
      // Keep keyboard open for multiple comments
      inputRef.current?.focus();
    }
  };

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
    onClose();
  }, [onClose]);

  // Custom backdrop
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
        pressBehavior="close"
      />
    ),
    [],
  );

  const renderComment = ({ item }: { item: Comment }) => (
    <View className="flex-row py-3 border-b border-border-light px-4">
      <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-3">
        <Text className="text-background font-bold text-xs">
          {item.authorName.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-text-primary font-semibold text-sm">
            {item.authorName}
          </Text>
          <Text className="text-text-muted text-xs">
            {getRelativeTime(item.timestamp)}
          </Text>
        </View>
        <Text className="text-text-secondary text-sm mt-0.5 leading-5">
          {item.content}
        </Text>
      </View>
    </View>
  );

  // Handle sheet changes
  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  // Calculate bottom padding for input when keyboard is visible
  const getInputBottomPadding = () => {
    if (Platform.OS === "ios") {
      return keyboardHeight > 0 ? keyboardHeight - insets.bottom : 0;
    }
    return keyboardHeight > 0 ? keyboardHeight : 0;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      enableHandlePanningGesture
      enableContentPanningGesture
      handleIndicatorStyle={{
        backgroundColor: "#333344",
        width: 40,
        height: 4,
      }}
      backgroundStyle={{
        backgroundColor: "#12121E",
      }}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      style={{ zIndex: 9999 }} // Ensure it's above everything
    >
      <BottomSheetView className="flex-1 bg-surface-card">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-border-light">
          <Text className="text-text-primary text-lg font-semibold">
            Comments ({comments.length})
          </Text>
          <TouchableOpacity
            onPress={handleClose}
            className="w-8 h-8 items-center justify-center"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} color="#8A8A9E" />
          </TouchableOpacity>
        </View>

        {/* Comments List */}
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          contentContainerStyle={{
            paddingBottom: 120, // Space for input at bottom
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center justify-center py-12">
              <Text className="text-text-muted text-sm">
                No comments yet. Be the first!
              </Text>
            </View>
          }
        />

        {/* Comment Input - Fixed at bottom with keyboard handling */}
        <View
          className="absolute left-0 right-0 bg-surface-card border-t border-border-light px-4 py-3"
          style={{
            bottom: getInputBottomPadding(),
            paddingBottom: Platform.OS === "ios" ? 8 : 8,
          }}
        >
          <View className="flex-row items-center gap-2">
            <View className="flex-1 flex-row items-center bg-surface-light rounded-lg px-3 border border-border-light">
              <TextInput
                ref={inputRef}
                className="flex-1 text-text-primary text-sm py-2 max-h-24"
                placeholder="Write a comment..."
                placeholderTextColor="#8A8A9E"
                value={commentText}
                onChangeText={setCommentText}
                multiline
                maxLength={500}
                returnKeyType="send"
                onSubmitEditing={handleSendComment}
                blurOnSubmit={false}
              />
              {commentText.length > 0 && (
                <Text className="text-text-muted text-xs mr-2">
                  {commentText.length}/500
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSendComment}
              disabled={!commentText.trim()}
              className={`w-10 h-10 rounded-lg items-center justify-center ${
                commentText.trim() ? "bg-primary" : "bg-border-light"
              }`}
            >
              <HugeiconsIcon
                icon={Sent02Icon}
                size={18}
                color={commentText.trim() ? "#080810" : "#6A6A7C"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
