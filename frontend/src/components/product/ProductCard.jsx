import { useState } from "react";
import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton.jsx";

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);
  const hasDiscount = product.discountPrice && Number(product.discountPrice) < Number(product.price);
  const outOfStock = product.stock <= 0;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded border border-line transition-colors hover:border-accent"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-line/40">
        {!imgError && product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl font-display text-muted">
            {product.name?.[0]}
          </div>
        )}
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded bg-accent-warm px-2 py-0.5 text-xs font-semibold text-ink">
            Sale
          </span>
        )}
        {outOfStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-ink/50 text-sm font-medium text-paper">
            Out of stock
          </span>
        )}
        <WishlistButton productId={product.id} className="absolute right-2 top-2" />
      </div>
      <div className="flex flex-col gap-1 p-3">
        <span className="text-sm text-ink line-clamp-1">{product.name}</span>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-sm font-semibold text-ink">
            ${Number(hasDiscount ? product.discountPrice : product.price).toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted line-through">${Number(product.price).toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}