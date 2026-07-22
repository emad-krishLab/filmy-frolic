// src/store/useCreateCommunityStore.ts
import { create } from "zustand";
import {
  CreateCommunityForm,
  INITIAL_FORM,
  PrivacyType,
} from "@/utils/types";

interface CreateCommunityStore extends CreateCommunityForm {
  setIcon: (icon: string) => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  toggleGenre: (genre: string) => void;
  setBanner: (uri: string | null) => void;
  setPrivacy: (privacy: PrivacyType) => void;
  reset: () => void;
}

const MAX_GENRES = 3;

export const useCreateCommunityStore = create<CreateCommunityStore>((set) => ({
  ...INITIAL_FORM,

  setIcon: (icon) => set({ icon }),
  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),

  toggleGenre: (genre) =>
    set((state) => {
      const alreadySelected = state.genres.includes(genre);
      if (alreadySelected) {
        return { genres: state.genres.filter((g) => g !== genre) };
      }
      if (state.genres.length >= MAX_GENRES) {
        return state; // no-op, limit reached
      }
      return { genres: [...state.genres, genre] };
    }),

  setBanner: (bannerUri) => set({ bannerUri }),
  setPrivacy: (privacy) => set({ privacy }),

  reset: () => set(INITIAL_FORM),
}));
