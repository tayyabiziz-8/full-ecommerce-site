export default function StarRating({ value = 0, size = "text-sm" }) {
  const rounded = Math.round(Number(value) || 0);
  return (
    <span className={`${size} tracking-tight text-accent-warm`} aria-label={`${value} out of 5 stars`}>
      {"★".repeat(rounded)}
      <span className="text-line">{"★".repeat(5 - rounded)}</span>
    </span>
  );
}