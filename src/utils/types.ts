// src/types/community.ts
export interface Community {
  id: string;
  name: string;
  bannerUrl: string;
  iconUrl?: string;
  iconEmoji?: string;
  description: string;
  memberCount: number;
  postsToday: number;
  genre?: string;
  accessType: "public" | "invite-only";
  isJoined?: boolean;
}

export interface SuggestedCommunity {
  id: string;
  name: string;
  iconUrl?: string;
  memberCount: number;
}

export interface LiveRoom {
  id: string;
  name: string;
  viewerCount: number;
}

export const featuredCommunity: Community = {
  id: "featured-1",
  name: "Invite Fshbfegs Community",
  bannerUrl: "https://your-cdn.com/cinema-banner.jpg",
  description: "General",
  memberCount: 1,
  postsToday: 0,
  accessType: "invite-only",
};

// src/types/createCommunity.ts
export type PrivacyType = "public" | "private" | "invite-only";

export interface CreateCommunityForm {
  icon: string; // emoji
  name: string;
  description: string;
  genres: string[];
  bannerUri: string | null;
  privacy: PrivacyType;
}

export const INITIAL_FORM: CreateCommunityForm = {
  icon: "🎬",
  name: "",
  description: "",
  genres: [],
  bannerUri: null,
  privacy: "public",
};

export const communities: Community[] = [
  {
    id: "1",
    name: "Test Public Community",
    bannerUrl: "https://your-cdn.com/cinema-banner.jpg",
    description: "Anyone can join",
    memberCount: 2,
    postsToday: 0,
    accessType: "public",
  },
  {
    id: "2",
    name: "ncd",
    bannerUrl: "https://your-cdn.com/cinema-banner.jpg",
    description: "dsnc sd",
    memberCount: 2,
    postsToday: 0,
    genre: "Horror",
    accessType: "public",
  },
  // ...more
];

export const suggestedCommunities: SuggestedCommunity[] = [
  { id: "s1", name: "b", memberCount: 2 },
  { id: "s2", name: "rfdc", memberCount: 6 },
];

export const liveRooms: LiveRoom[] = [
  { id: "r1", name: "fasdfs", viewerCount: 1 },
  { id: "r2", name: "BIBEK", viewerCount: 1 },
];

export const COMMUNITY_ICONS = [
  "🎬",
  "🎭",
  "🚀",
  "👻",
  "⛩️",
  "🐍",
  "🎵",
  "🎨",
  "💉",
  "💕",
  "😂",
  "🧠",
  "🏆",
  "📹",
  "⚡",
];

export const GENRES = [
  "Anime",
  "Sci-Fi",
  "Horror",
  "Fantasy",
  "Drama",
  "Comedy",
  "Action",
  "Thriller",
  "Romance",
  "Documentary",
];

export const MAX_GENRES = 3;

export type CommunityTab =
  "Feed" | "About" | "Members" | "Events" | "Media" | "Rules";

export interface CommunityDetail {
  id: string;
  name: string;
  icon: string;
  bannerUrl: string;
  memberCount: number;
  postsToday: number;
  description: string;
  isJoined: boolean;
  isPublic: boolean;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
}

export const mockCommunityDetail: CommunityDetail = {
  id: "1",
  name: "Invite Fshbfegs Community",
  icon: "🎬",
  bannerUrl: "https://your-cdn.com/cinema-banner.jpg",
  memberCount: 1,
  postsToday: 0,
  description: "A community for cinema lovers.",
  isJoined: false,
  isPublic: true,
};

export const mockCommunityPosts: CommunityPost[] = [];

export type ReactionType = "wow" | "fire" | "heart" | "thumbsUp";

export interface FeedPost {
  id: string;

  authorName: string;
  authorAvatarUrl?: string;

  createdAt: string;

  content: string;

  // Future ready
  movieTitle?: string;
  moviePosterUrl?: string;

  reactions: {
    wow: number;
    fire: number;
    heart: number;
    thumbsUp: number;
  };

  viewerReaction?: ReactionType;

  commentCount: number;

  isSaved: boolean;
  isFollowing: boolean;
}

export interface TrendingItem {
  id: string;
  label: string;
  authorAvatarUrl?: string;
  heatCount: number;
}

export interface Comment {
  id: string;
  authorName: string;
  content: string;
  timestamp: string;
}

export interface CreatePostForm {
  content: string;
  communityTag: string | null; // optional: which community this post appears in
}

export const INITIAL_POST_FORM: CreatePostForm = {
  content: "",
  communityTag: null,
};

export const MAX_POST_LENGTH = 500;


// src/types/search.ts
export type SearchCategory =
  | "movie" | "community" | "room" | "gossip" | "article" | "game" | "person";

export interface SearchResult {
  id: string;
  type: SearchCategory;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  metaLabel?: string; // e.g. "4.2k members", "8.5 IMDb", "Live now"
}

export interface CategoryConfig {
  type: SearchCategory;
  label: string;
  pluralLabel: string;
}

export const CATEGORIES: CategoryConfig[] = [
  { type: "movie", label: "Movie", pluralLabel: "Movies" },
  { type: "community", label: "Community", pluralLabel: "Communities" },
  { type: "room", label: "Room", pluralLabel: "Rooms" },
  { type: "gossip", label: "Gossip", pluralLabel: "Gossips" },
  { type: "article", label: "Article", pluralLabel: "Articles" },
  { type: "game", label: "Game", pluralLabel: "Games" },
  { type: "person", label: "Person", pluralLabel: "People" },
];

export const TRENDING_SEARCHES = ["Oppenheimer", "A24", "Sci-Fi communities", "Watch parties"];



export type RoomCategory = "watch-party" | "voice-room" | "discussion" | "video-room";

export interface Room {
  id: string;
  name: string;
  description?: string;
  thumbnailUrl: string;
  isLive: boolean;
  viewerCount: number;
  hostName: string;
  hostAvatarUrl?: string;
  category: RoomCategory;
  isFollowingHost: boolean;
  isHostedByMe: boolean;
}

export const ROOM_CATEGORY_LABELS: Record<RoomCategory, string> = {
  "watch-party": "Watch Party",
  "voice-room": "Voice Room",
  discussion: "Discussion",
  "video-room": "Video Room",
};
