import StarRating from "./StarRating.jsx";

export default function ReviewList({ reviews }) {
  if (!reviews.length) {
    return <p className="mt-4 text-sm text-muted">No reviews yet — be the first.</p>;
  }
  return (
    <ul className="mt-4 flex flex-col gap-4">
      {reviews.map((r) => (
        <li key={r.id} className="border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <StarRating value={r.rating} />
            <span className="text-sm font-medium">
              {r.user?.firstName} {r.user?.lastName}
            </span>
          </div>
          {r.comment && <p className="mt-1 text-sm text-ink/80">{r.comment}</p>}
        </li>
      ))}
    </ul>
  );
}