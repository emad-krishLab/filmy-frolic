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