// src/store/useExploreSearchStore.ts
import { create } from "zustand";
import { SearchCategory } from "@/utils/types";

interface ExploreSearchStore {
  query: string;
  activeFilter: SearchCategory | "all";
  recentSearches: string[];
  setQuery: (query: string) => void;
  setActiveFilter: (filter: SearchCategory | "all") => void;
  addRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
}

const MAX_RECENT = 8;

export const useExploreSearchStore = create<ExploreSearchStore>((set) => ({
  query: "",
  activeFilter: "all",
  recentSearches: [],

  setQuery: (query) => set({ query }),
  setActiveFilter: (activeFilter) => set({ activeFilter }),

  addRecentSearch: (term) =>
    set((state) => {
      const trimmed = term.trim();
      if (!trimmed) return state;
      const deduped = [trimmed, ...state.recentSearches.filter((t) => t !== trimmed)];
      return { recentSearches: deduped.slice(0, MAX_RECENT) };
    }),

  clearRecentSearches: () => set({ recentSearches: [] }),
}));