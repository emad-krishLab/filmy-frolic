import { ScrollView, Text, Pressable } from 'react-native';

const FILTERS = ['All', 'Mine', 'Trending', 'Genre', 'New'] as const;
type Filter = (typeof FILTERS)[number];

interface Props {
  active: Filter;
  onChange: (filter: Filter) => void;
}

export function FilterTabs({ active, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4"
      contentContainerStyle={{ gap: 8 }}
    >
      {FILTERS.map((filter) => {
        const isActive = filter === active;
        return (
          <Pressable
            key={filter}
            onPress={() => onChange(filter)}
            className={`px-4 py-1.5 rounded-full border ${
              isActive
                ? 'bg-info/15 border-info'
                : 'bg-surface border-border-light'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                isActive ? 'text-info' : 'text-text-secondary'
              }`}
            >
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}