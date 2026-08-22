import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesRequest } from "../api/category.api.js";

export default function Categories() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesRequest,
  });

  if (isLoading) return <p className="mx-auto max-w-6xl px-6 py-20 text-muted">Loading categories…</p>;

  const topLevel = categories.filter((c) => c.parentId === null);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-2xl font-semibold">Categories</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topLevel.map((cat) => (
          <div key={cat.id} className="rounded border border-line p-5">
            <Link
              to={`/products?category=${cat.slug}`}
              className="font-display text-lg font-semibold hover:text-accent"
            >
              {cat.name}
            </Link>
            {cat.description && <p className="mt-1 text-sm text-muted">{cat.description}</p>}
            {cat.subCategories?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.subCategories.map((sub) => (
                  <Link
                    key={sub.id}
                    to={`/products?category=${sub.slug}`}
                    className="rounded-full border border-line px-3 py-1 text-xs text-ink/80 transition-colors hover:border-accent hover:text-accent"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}