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
  '🎬', '🎭', '🚀', '👻', '⛩️', '🐍', '🎵', '🎨', '💉',
  '💕', '😂', '🧠', '🏆', '📹', '⚡',
];

export const GENRES = [
  'Anime', 'Sci-Fi', 'Horror', 'Fantasy', 'Drama', 'Comedy',
  'Action', 'Thriller', 'Romance', 'Documentary',
];

export const MAX_GENRES = 3;