import { Comment, FeedPost, Room, SearchResult } from "./types";

export const trendingItems = [
  {
    id: "1",
    label: "Marvel",
    heatCount: 1245,
  },
  {
    id: "2",
    label: "Christopher Nolan",
    heatCount: 932,
  },
  {
    id: "3",
    label: "DC Universe",
    heatCount: 741,
  },
  {
    id: "4",
    label: "Tom Cruise",
    heatCount: 680,
  },
  {
    id: "5",
    label: "Interstellar",
    heatCount: 531,
  },
];

export const mockPosts: FeedPost[] = [
  {
    id: "1",
    authorName: "gajula_jagadis",
    createdAt: "2026-07-24T10:00:00Z",
    content:
      "Just watched Oppenheimer for the third time. The Trinity test sequence still gives me chills. Nolan is a master of cinema.",
    reactions: { wow: 12, fire: 34, heart: 28, thumbsUp: 15 },
    commentCount: 8,
    isSaved: false,
    isFollowing: false,
  },
  {
    id: "2",
    authorName: "Theonekrishna",
    createdAt: "2026-07-23T15:30:00Z",
    content:
      "Hot take: The Dark Knight Rises is better than The Dark Knight. Bane's philosophy and the epic conclusion make it superior.",
    reactions: { wow: 5, fire: 18, heart: 9, thumbsUp: 22 },
    commentCount: 15,
    isSaved: true,
    isFollowing: false,
  },
  {
    id: "3",
    authorName: "movie_buff_2024",
    createdAt: "2026-07-22T20:15:00Z",
    content:
      'Just discovered A24\'s "Everything Everywhere All At Once". How did I miss this masterpiece? The multiverse concept is mind-blowing! 🎬',
    reactions: { wow: 45, fire: 62, heart: 38, thumbsUp: 41 },
    commentCount: 23,
    isSaved: false,
    isFollowing: false,
  },
  {
    id: "4",
    authorName: "film_nerd_99",
    createdAt: "2026-07-21T12:45:00Z",
    content:
      "Rewatching The Godfather and noticing new details every time. Coppola's attention to small character moments is unparalleled. Michael's transformation is cinema perfection.",
    reactions: { wow: 8, fire: 19, heart: 33, thumbsUp: 27 },
    commentCount: 11,
    isSaved: false,
    isFollowing: false,
  },
  {
    id: "5",
    authorName: "cinematic_journey",
    createdAt: "2026-07-20T09:30:00Z",
    content:
      "My prediction for best picture at next year's Oscars: The movie that currently has no buzz will win. It's always the quiet masterpiece that sneaks through.",
    reactions: { wow: 3, fire: 7, heart: 12, thumbsUp: 4 },
    commentCount: 6,
    isSaved: false,
    isFollowing: false,
  },
  {
    id: "6",
    authorName: "indie_film_lover",
    createdAt: "2026-07-19T18:20:00Z",
    content:
      "Moonlight is still the most beautiful coming-of-age story I've ever seen. The three act structure, the cinematography, the performances - it's flawless.",
    reactions: { wow: 24, fire: 15, heart: 42, thumbsUp: 19 },
    commentCount: 17,
    isSaved: true,
    isFollowing: false,
  },
  {
    id: "7",
    authorName: "hitchcock_fan",
    createdAt: "2026-07-18T22:10:00Z",
    content:
      "Just rewatched Vertigo. The spiral motif, the obsession, the tragic ending - Hitchcock was ahead of his time. This is the definitive cinematic nightmare.",
    reactions: { wow: 16, fire: 9, heart: 21, thumbsUp: 13 },
    commentCount: 9,
    isSaved: false,
    isFollowing: false,
  },
  {
    id: "8",
    authorName: "animation_enthusiast",
    createdAt: "2026-07-17T14:55:00Z",
    content:
      'Studio Ghibli\'s "Spirited Away" remains the gold standard for animated storytelling. Every frame is a painting, every scene is magical.',
    reactions: { wow: 31, fire: 27, heart: 44, thumbsUp: 36 },
    commentCount: 20,
    isSaved: false,
    isFollowing: false,
  },
];


// Mock comments data
export const mockComments: Record<string, Comment[]> = {
  '1': [
    { id: 'c1', authorName: 'film_buff', content: 'Totally agree! The cinematography was breathtaking.', timestamp: '2026-07-24T11:00:00Z' },
    { id: 'c2', authorName: 'cinephile_2024', content: 'Have you seen it in IMAX? That\'s the real experience.', timestamp: '2026-07-24T12:30:00Z' },
  ],
  '2': [
    { id: 'c3', authorName: 'batman_fan', content: 'Bane\'s dialogue was so powerful! "Peace has cost you your strength."', timestamp: '2026-07-23T16:00:00Z' },
    { id: 'c4', authorName: 'movie_lover', content: 'I respectfully disagree. Heath Ledger\'s Joker remains unmatched.', timestamp: '2026-07-23T17:30:00Z' },
  ],
  '3': [
    { id: 'c5', authorName: 'a24_fan', content: 'The hot dog fingers scene was absolutely wild! 😂', timestamp: '2026-07-22T21:00:00Z' },
  ],
};



export const ALL_RESULTS: SearchResult[] = [
  { id: "m1", type: "movie", title: "Dune: Part Two", subtitle: "Sci-Fi · 2024", metaLabel: "8.5" },
  { id: "m2", type: "movie", title: "Oppenheimer", subtitle: "Drama · 2023", metaLabel: "8.9" },
  { id: "c1", type: "community", title: "Sci-Fi Fanatics", subtitle: "General", metaLabel: "1.2k members" },
  { id: "c2", type: "community", title: "hera bete", subtitle: "Sci-Fi", metaLabel: "1 member" },
  { id: "r1", type: "room", title: "Oppenheimer Watch Party", subtitle: "Hosted by bibek jana", metaLabel: "Live" },
  { id: "g1", type: "gossip", title: "Are Hollywood's Favourites Recasting?", subtitle: "@deepguchhait001", metaLabel: "50%" },
  { id: "a1", type: "article", title: "The Rise of A24 Studios", subtitle: "Industry", metaLabel: "5 min read" },
  { id: "gm1", type: "game", title: "Guess the Movie", subtitle: "Trivia", metaLabel: "New" },
  { id: "p1", type: "person", title: "gajula_jagadis", subtitle: "@gajula_jagadis", metaLabel: "340 followers" },
];



export const rooms: Room[] = [
  {
    id: "1",
    name: "DDD",
    description: "ddd",
    thumbnailUrl: "https://your-cdn.com/cinema-banner.jpg",
    isLive: true,
    viewerCount: 1,
    hostName: "bibek Jana",
    category: "video-room",
    isFollowingHost: false,
    isHostedByMe: false,
  },
  {
    id: "2",
    name: "Oppenheimer Watch Party",
    thumbnailUrl: "https://your-cdn.com/cinema-banner.jpg",
    isLive: true,
    viewerCount: 24,
    hostName: "emad",
    category: "watch-party",
    isFollowingHost: true,
    isHostedByMe: true,
  },
];

export const roomStats = { activeRooms: 24, watchParties: 8 };