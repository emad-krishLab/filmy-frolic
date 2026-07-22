// src/components/createCommunity/GenreChips.tsx
import { View, Text, Pressable } from 'react-native';
import { GENRES, MAX_GENRES } from '@/utils/types';

interface Props {
  selected: string[];
  onToggle: (genre: string) => void;
}

export function GenreChips({ selected, onToggle }: Props) {
  const limitReached = selected.length >= MAX_GENRES;

  return (
    <View className="mb-5">
      <Text className="text-text-secondary text-xs font-semibold uppercase mb-2">
        Genres (pick up to {MAX_GENRES})
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {GENRES.map((genre) => {
          const isActive = selected.includes(genre);
          const isDisabled = !isActive && limitReached;
          return (
            <Pressable
              key={genre}
              disabled={isDisabled}
              onPress={() => onToggle(genre)}
              className={`px-3.5 py-2 rounded-full border ${
                isActive
                  ? 'bg-info/15 border-info'
                  : 'bg-surface border-border-light'
              } ${isDisabled ? 'opacity-40' : ''}`}
            >
              <Text
                className={`text-sm ${
                  isActive ? 'text-info font-medium' : 'text-text-secondary'
                }`}
              >
                {genre}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}