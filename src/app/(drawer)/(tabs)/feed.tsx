// src/app/(tabs)/feed.tsx
import { FloatingActionButton } from "@/components/common/FloatingActionButton";
import TopBar from "@/components/common/TopBar";
import { CommentsBottomSheet } from "@/components/feed/CommentsBottomSheet";
import { PostCard } from "@/components/feed/PostCard";
import { mockComments, mockPosts } from "@/utils/data";
import { Comment, TrendingItem } from "@/utils/types";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "expo-router/react-navigation";
import { useCallback, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const mockTrending: TrendingItem[] = [
  { id: "t1", label: "Oppenheimer", heatCount: 142 },
  { id: "t2", label: "Barbie", heatCount: 98 },
  { id: "t3", label: "A24 Films", heatCount: 76 },
  { id: "t4", label: "Nolan", heatCount: 54 },
  { id: "t5", label: "Miyazaki", heatCount: 43 },
];

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  const [posts, setPosts] = useState(mockPosts);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [comments, setComments] = useState(mockComments);
  const currentComments = selectedPostId ? comments[selectedPostId] || [] : [];

  const savedCount = posts.filter((p) => p.isSaved).length;

  const handleComposePress = () => {
    router.push("/create-post");
  };

  const handleTrendingItemPress = (item: TrendingItem) => {
    console.log("Trending item pressed:", item.label);
  };

  const handleCommentPress = (postId: string) => {
    setSelectedPostId(postId);
    setIsCommentsVisible(true);
  };

  const handleAddComment = (postId: string, commentText: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      authorName: "Current User",
      content: commentText,
      timestamp: new Date().toISOString(),
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, commentCount: post.commentCount + 1 }
          : post,
      ),
    );
  };

  const handleCommentsClose = () => {
    setIsCommentsVisible(false);
    setSelectedPostId(null);
  };
  const handleSharePress = (postId: string) => {
    console.log("Share post:", postId);
  };

  const handleSavePress = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isSaved: !post.isSaved } : post,
      ),
    );
  };

  const handleReportPress = (postId: string) => {
    console.log("Report post:", postId);
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setIsError(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPosts(mockPosts);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const handleFollowToggle = () => {};

  const renderEmptyState = () => {
    if (isError) {
      return (
        <View className="flex-1 items-center justify-center py-12 px-6">
          <Text className="text-text-muted text-center text-base">
            Failed to load posts.
          </Text>
          <Text className="text-text-muted text-center text-sm mt-1">
            Pull to refresh or try again later.
          </Text>
        </View>
      );
    }

    return (
      <View className="flex-1 items-center justify-center py-12 px-6">
        <Text className="text-text-primary text-center text-lg font-semibold">
          No posts yet
        </Text>
        <Text className="text-text-muted text-center text-sm mt-2">
          Be the first to share something cinematic!
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <TopBar
        showLogo
        showSettings
        notificationCount={3}
        onDrawerPress={openDrawer}
        onNotificationsPress={() => {
          router.push("/notification");
        }}
        onSettingsPress={() => {
          router.push("/settings");
        }}
      />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onCommentPress={handleCommentPress}
            onSharePress={handleSharePress}
            onSavePress={handleSavePress}
            onReportPress={handleReportPress}
            onFollowToggle={handleFollowToggle}
          />
        )}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#F5C518"
            colors={["#F5C518"]}
          />
        }
        contentContainerStyle={{
          paddingBottom: insets.bottom + 90,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        windowSize={10}
        initialNumToRender={3}
      />

      <FloatingActionButton onPress={handleComposePress} />

      <CommentsBottomSheet
        isVisible={isCommentsVisible}
        onClose={handleCommentsClose}
        postId={selectedPostId || ""}
        comments={currentComments}
        onAddComment={handleAddComment}
      />
    </View>
  );
}
