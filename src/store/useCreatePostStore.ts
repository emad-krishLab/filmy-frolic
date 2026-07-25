// src/store/useCreatePostStore.ts
import { CreatePostForm, INITIAL_POST_FORM } from "@/utils/types";
import { create } from "zustand";

interface CreatePostStore extends CreatePostForm {
  setContent: (content: string) => void;
  setCommunityTag: (tag: string | null) => void;
  reset: () => void;
}

export const useCreatePostStore = create<CreatePostStore>((set) => ({
  ...INITIAL_POST_FORM,
  setContent: (content) => set({ content }),

  setCommunityTag: (communityTag) => set({ communityTag }),
  reset: () => set(INITIAL_POST_FORM),
}));
