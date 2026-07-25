// src/components/feed/PostCard.tsx
import { FeedPost } from "@/utils/types";
import {
  Add01Icon,
  BookmarkIcon,
  CommentIcon,
  FireIcon,
  FlagIcon,
  HeartIcon,
  ShareIcon,
  ShockedIcon,
  ThumbsUpIcon,
  UserCheckIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface PostCardProps {
  post: FeedPost;
  onCommentPress: (postId: string) => void;
  onSharePress: (postId: string) => void;
  onSavePress: (postId: string) => void;
  onReportPress: (postId: string) => void;
  onFollowToggle: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onCommentPress,
  onSharePress,
  onSavePress,
  onReportPress,
  onFollowToggle,
}) => {
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [isFollowing, setIsFollowing] = useState(post.isFollowing);
  const [isExpanded, setIsExpanded] = useState(false);

  const getRelativeTime = (isoDate: string) => {
    const now = new Date();
    const then = new Date(isoDate);
    const diffDays = Math.floor(
      (now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    onFollowToggle(post.id);
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    onSavePress(post.id);
  };

  const shouldTruncate = post.content.length > 150 && !isExpanded;
  const displayContent = shouldTruncate
    ? post.content.slice(0, 150) + "..."
    : post.content;

  return (
    <View className="mx-4 mb-4 bg-surface-card rounded-lg p-4 border border-border-light">
      {/* Header: Avatar + Author + Timestamp + Follow Button */}
      <View className="flex-row items-center mb-3">
        <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mr-3">
          <Text className="text-background font-bold text-sm">
            {post.authorName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View className="flex-1">
          <Text className="text-text-primary font-semibold text-sm">
            {post.authorName}
          </Text>
          <Text className="text-text-muted text-xs">
            {getRelativeTime(post.createdAt)}
          </Text>
        </View>

        {/* Follow Button */}
        <TouchableOpacity
          onPress={handleFollowToggle}
          className={`flex-row items-center px-3 py-1.5 rounded-full border ${
            isFollowing
              ? "bg-surface-light border-border-light"
              : "bg-primary border-primary"
          }`}
          activeOpacity={0.7}
        >
          <HugeiconsIcon
            icon={isFollowing ? UserCheckIcon : Add01Icon}
            size={14}
            color={isFollowing ? "#8A8A9E" : "#080810"}
          />
          <Text
            className={`text-xs font-medium ml-1 ${
              isFollowing ? "text-text-muted" : "text-background"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Text className="text-text-primary text-sm leading-5 mb-3">
        {displayContent}
      </Text>

      {post.content.length > 150 && (
        <TouchableOpacity
          onPress={() => setIsExpanded(!isExpanded)}
          className="mb-2"
        >
          <Text className="text-info text-xs font-medium">
            {isExpanded ? "Show less" : "Show more"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Reaction Row */}
      <View className="flex-row items-center gap-4 mb-3 border-t border-border-light pt-3">
        <View className="flex-row items-center">
          <HugeiconsIcon icon={FireIcon} size={18} color="#F39C12" />
          <Text className="text-text-secondary text-xs ml-1.5">
            {post.reactions.fire}
          </Text>
        </View>
        <View className="flex-row items-center">
          <HugeiconsIcon icon={HeartIcon} size={18} color="#E84545" />
          <Text className="text-text-secondary text-xs ml-1.5">
            {post.reactions.heart}
          </Text>
        </View>
        <View className="flex-row items-center">
          <HugeiconsIcon icon={ThumbsUpIcon} size={18} color="#3B82F6" />
          <Text className="text-text-secondary text-xs ml-1.5">
            {post.reactions.thumbsUp}
          </Text>
        </View>
        <View className="flex-row items-center">
          <HugeiconsIcon icon={ShockedIcon} size={18} color="#7C5CFC" />
          <Text className="text-text-secondary text-xs ml-1.5">
            {post.reactions.wow}
          </Text>
        </View>
      </View>

      {/* Action Row */}
      <View className="flex-row items-center justify-between border-t border-border-light pt-3">
        <TouchableOpacity
          onPress={() => onCommentPress(post.id)}
          className="flex-row items-center active:opacity-70"
        >
          <HugeiconsIcon icon={CommentIcon} size={18} color="#8A8A9E" />
          <Text className="text-text-secondary text-xs ml-1.5">
            {post.commentCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSharePress(post.id)}
          className="flex-row items-center active:opacity-70"
        >
          <HugeiconsIcon icon={ShareIcon} size={18} color="#8A8A9E" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSaveToggle}
          className="flex-row items-center active:opacity-70"
        >
          <HugeiconsIcon
            icon={BookmarkIcon}
            size={18}
            color={isSaved ? "#F5C518" : "#8A8A9E"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onReportPress(post.id)}
          className="flex-row items-center active:opacity-70"
        >
          <HugeiconsIcon icon={FlagIcon} size={18} color="#8A8A9E" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
