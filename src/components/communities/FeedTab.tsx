// src/components/communityDetail/tabs/FeedTab.tsx
import { View, Text } from 'react-native';
import { CommunityPost } from '@/utils/types';

interface Props {
  posts: CommunityPost[];
}

export function FeedTab({ posts }: Props) {
  if (!posts.length) {
    return (
      <View className="items-center justify-center py-16">
        <Text className="text-text-muted text-sm">Failed to load posts.</Text>
      </View>
    );
  }

  return (
    <View className="px-4 gap-3">
      {posts.map((post) => (
        <View key={post.id} className="bg-surface-card border border-border-light rounded-md p-3">
          <Text className="text-text-primary font-semibold text-sm mb-1">{post.authorName}</Text>
          <Text className="text-text-secondary text-sm">{post.content}</Text>
        </View>
      ))}
    </View>
  );
}