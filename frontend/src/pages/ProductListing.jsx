import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getProductsRequest } from "../api/product.api.js";
import { getCategoriesRequest } from "../api/category.api.js";
import { useDebouncedValue } from "../hooks/useDebouncedValue.js";
import ProductCard from "../components/product/ProductCard.jsx";

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get("category") || "";
  const searchInput = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") || 1);

  const debouncedSearch = useDebouncedValue(searchInput);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesRequest,
  });

  const topLevelCategories = categories.filter((c) => c.parentId === null);
  const activeCategory = categories.find((c) => c.slug === categorySlug);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", { categoryId: activeCategory?.id, search: debouncedSearch, page }],
    queryFn: () =>
      getProductsRequest({ categoryId: activeCategory?.id, search: debouncedSearch, page, limit: 12 }),
    keepPreviousData: true,
  });

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.set("page", "1");
    setSearchParams(next);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-2xl font-semibold">Shop</h1>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => updateParam("category", "")}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            !categorySlug ? "border-accent text-accent" : "border-line text-ink/80 hover:border-accent"
          }`}
        >
          All
        </button>
        {topLevelCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => updateParam("category", c.slug)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              categorySlug === c.slug ? "border-accent text-accent" : "border-line text-ink/80 hover:border-accent"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <input
        type="search"
        placeholder="Search products…"
        value={searchInput}
        onChange={(e) => updateParam("search", e.target.value)}
        className="mt-4 w-full max-w-sm rounded border border-line px-3 py-2 text-sm outline-none focus:border-accent"
      />

      {isLoading && <p className="mt-10 text-muted">Loading products…</p>}
      {isError && <p className="mt-10 text-red-500">Couldn't load products. Try again.</p>}

      {data && (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {data.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {data.products.length === 0 && (
            <p className="mt-10 text-muted">No products match your filters.</p>
          )}

          {data.pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                disabled={page <= 1}
                onClick={() => updateParam("page", String(page - 1))}
                className="rounded border border-line px-3 py-1.5 text-sm disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-muted">
                Page {data.pagination.page} of {data.pagination.totalPages}
              </span>
              <button
                disabled={page >= data.pagination.totalPages}
                onClick={() => updateParam("page", String(page + 1))}
                className="rounded border border-line px-3 py-1.5 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}