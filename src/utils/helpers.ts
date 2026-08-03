import { ALL_RESULTS } from "./data";
import { SearchResult } from "./types";

export function getRelativeTime(date: string) {
  const now = new Date().getTime();
  const then = new Date(date).getTime();

  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return `${diff}s`;

  if (diff < 3600)
    return `${Math.floor(diff / 60)}m`;

  if (diff < 86400)
    return `${Math.floor(diff / 3600)}h`;

  if (diff < 2592000)
    return `${Math.floor(diff / 86400)}d`;

  if (diff < 31536000)
    return `${Math.floor(diff / 2592000)}mo`;

  return `${Math.floor(diff / 31536000)}y`;
}

export async function searchAll(query: string): Promise<SearchResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 250)); // simulate network latency
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_RESULTS.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.subtitle?.toLowerCase().includes(q)
  );
}

