// src/app/(drawer)/(tabs)/explore.tsx
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SectionList,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { searchAll } from "@/utils/helpers";
import { CATEGORIES, SearchResult, TRENDING_SEARCHES } from "@/utils/types";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { useExploreSearchStore } from "../../../store/useExploreSearchStore";

import { CategoryFilterChips } from "../../../components/explore/CategoryFilterChips";
import { ExploreSearchInput } from "../../../components/explore/ExploreSearchInput";
import { RecentSearches } from "../../../components/explore/RecentSearches";
import { SearchResultRow } from "../../../components/explore/SearchResultRow";
import { TrendingSearches } from "../../../components/explore/TrendingSearches";

export default function ExploreScreen() {
  const {
    query,
    activeFilter,
    recentSearches,
    setQuery,
    setActiveFilter,
    addRecentSearch,
    clearRecentSearches,
  } = useExploreSearchStore();

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    searchAll(debouncedQuery).then((data) => {
      setResults(data);
      setIsLoading(false);
    });
  }, [debouncedQuery]);

  const handleSubmit = () => {
    if (query.trim()) addRecentSearch(query.trim());
  };

  const handleRecentOrTrendingSelect = (term: string) => {
    setQuery(term);
    addRecentSearch(term);
  };

  // Flat list for a specific category filter
  const flatFilteredResults = useMemo(() => {
    if (activeFilter === "all") return results;
    return results.filter((r) => r.type === activeFilter);
  }, [results, activeFilter]);

  // Grouped sections for the "All" view
  const groupedSections = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      title: cat.pluralLabel,
      data: results.filter((r) => r.type === cat.type).slice(0, 3), // cap preview to 3 per group
    })).filter((section) => section.data.length > 0);
  }, [results]);

  const hasQuery = debouncedQuery.trim().length > 0;
  const showIdleState = !hasQuery;
  const showEmptyState = hasQuery && !isLoading && results.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ExploreSearchInput
        value={query}
        onChangeText={setQuery}
        onSubmit={handleSubmit}
      />

      {hasQuery && (
        <CategoryFilterChips active={activeFilter} onChange={setActiveFilter} />
      )}

      {showIdleState && (
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={
            <>
              <RecentSearches
                searches={recentSearches}
                onSelect={handleRecentOrTrendingSelect}
                onClear={clearRecentSearches}
              />
              <TrendingSearches
                searches={TRENDING_SEARCHES}
                onSelect={handleRecentOrTrendingSelect}
              />
            </>
          }
        />
      )}

      {hasQuery && isLoading && (
        <View className="items-center justify-center py-16">
          <ActivityIndicator color="#F5C518" />
        </View>
      )}

      {hasQuery && !isLoading && showEmptyState && (
        <View className="items-center justify-center py-16 px-6">
          <Text className="text-text-muted text-sm text-center">
            No results for "{debouncedQuery}" — try a different search term.
          </Text>
        </View>
      )}

      {hasQuery && !isLoading && !showEmptyState && activeFilter === "all" && (
        <SectionList
          sections={groupedSections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SearchResultRow result={item} onPress={() => {}} />
          )}
          renderSectionHeader={({ section }) => (
            <Text className="text-text-secondary text-xs font-semibold uppercase px-4 pt-4 pb-2 bg-background">
              {section.title}
            </Text>
          )}
          stickySectionHeadersEnabled={false}
        />
      )}

      {hasQuery && !isLoading && !showEmptyState && activeFilter !== "all" && (
        <FlatList
          data={flatFilteredResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SearchResultRow result={item} onPress={() => {}} />
          )}
        />
      )}
    </SafeAreaView>
  );
}
