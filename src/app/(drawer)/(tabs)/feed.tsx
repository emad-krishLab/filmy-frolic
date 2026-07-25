// src/app/(tabs)/feed.tsx
import TopBar from "@/components/common/TopBar";
import { CommentsBottomSheet } from "@/components/feed/CommentsBottomSheet";
import { FeedHeader } from "@/components/feed/FeedHeader";
import { PostCard } from "@/components/feed/PostCard";
import { mockComments, mockPosts } from "@/utils/data";
import { Comment, TrendingItem } from "@/utils/types";
import { DrawerActions } from "expo-router/react-navigation";
import { useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock data

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

  // Handlers
  const handleComposePress = () => {
    console.log("Open compose screen");
    // router.push('/compose'); // Uncomment when compose screen exists
  };

  const handleTrendingItemPress = (item: TrendingItem) => {
    console.log("Trending item pressed:", item.label);
  };

  const handleCommentPress = (postId: string) => {
    setSelectedPostId(postId);
    setIsCommentsVisible(true);
  };

  const handleAddComment = (postId: string, commentText: string) => {
    // Create new comment object
    const newComment: Comment = {
      id: `c${Date.now()}`,
      authorName: "Current User",
      content: commentText,
      timestamp: new Date().toISOString(),
    };

    // Add to comments state
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    // Increment comment count on the post
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
    // In production, show a confirmation dialog
    console.log("Report post:", postId);
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setIsError(false);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In production, fetch new posts here
      setPosts(mockPosts);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const handleFollowToggle = () => {};

  // Render empty state
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
          console.log("Navigate to notifications");
          // router.push('/notifications');
        }}
        onSettingsPress={() => {
          console.log("Navigate to settings");
          // router.push('/settings');
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
        ListHeaderComponent={FeedHeader}
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
          paddingBottom: insets.bottom + 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        // Performance optimization
        maxToRenderPerBatch={5}
        windowSize={10}
        initialNumToRender={3}
      />

      {/* Comments Bottom Sheet */}
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
