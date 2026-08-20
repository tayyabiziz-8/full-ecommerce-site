import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 rounded bg-accent px-5 py-2.5 text-sm font-semibold text-paper">
        Back home
      </Link>
    </div>
  );
}