import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-display text-2xl font-semibold">
        {user.firstName} {user.lastName}
      </h1>
      <p className="mt-2 text-muted">{user.email}</p>
      <Link
        to="/orders"
        className="mt-6 inline-block rounded border border-ink px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
      >
        View order history
      </Link>
    </div>
  );
}