export const resolveMediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = import.meta.env.VITE_API_BASE_URL;
  const normalized = path.replace(/\\/g, "/").replace(/^public\//, "");
  return `${base}/public/${normalized}`;
};