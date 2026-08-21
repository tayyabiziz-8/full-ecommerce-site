import { Link } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist.js";
import ProductCard from "../components/product/ProductCard.jsx";

export default function Wishlist() {
  const { items, isLoading } = useWishlist();

  if (isLoading) return <p className="mx-auto max-w-6xl px-6 py-20 text-muted">Loading your wishlist…</p>;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
        <h1 className="font-display text-2xl font-semibold">Your wishlist is empty</h1>
        <Link to="/products" className="mt-6 rounded bg-accent px-5 py-2.5 text-sm font-semibold text-paper">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-2xl font-semibold">Your wishlist</h1>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ProductCard key={item.id} product={item.product} />
        ))}
      </div>
    </div>
  );
}