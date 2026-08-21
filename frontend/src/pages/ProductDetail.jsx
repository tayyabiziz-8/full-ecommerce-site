import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getProductRequest } from "../api/product.api.js";
import { getProductReviewsRequest } from "../api/review.api.js";
import { useAuth } from "../hooks/useAuth.js";
import { useCart } from "../hooks/useCart.js";
import StarRating from "../components/product/StarRating.jsx";
import ReviewList from "../components/product/ReviewList.jsx";
import ReviewForm from "../components/product/ReviewForm.jsx";
import WishlistButton from "../components/product/WishlistButton.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { addToCart, isMutating } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductRequest(id),
  });

  const { data: reviewData } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getProductReviewsRequest(id),
  });

  if (isLoading) return <p className="mx-auto max-w-6xl px-6 py-20 text-muted">Loading…</p>;
  if (!product) return <p className="mx-auto max-w-6xl px-6 py-20 text-muted">Product not found.</p>;

  const hasDiscount = product.discountPrice && Number(product.discountPrice) < Number(product.price);
  const images = product.images?.length ? product.images : [null];
  const outOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.info("Sign in to add items to your cart");
      return;
    }
    addToCart({ productId: product.id, quantity });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="aspect-square w-full overflow-hidden rounded bg-line/40">
            <img
              src={images[activeImage]}
              alt={product.name}
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="h-full w-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 overflow-hidden rounded border ${
                    i === activeImage ? "border-accent" : "border-line"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="eyebrow">{product.category?.name}</span>
              <h1 className="mt-2 font-display text-3xl font-semibold">{product.name}</h1>
            </div>
            <WishlistButton productId={product.id} className="border border-line" />
          </div>

          {reviewData && (
            <div className="mt-2 flex items-center gap-2">
              <StarRating value={reviewData.averageRating || 0} />
              <span className="text-sm text-muted">
                {reviewData.reviewCount} review{reviewData.reviewCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-2xl font-semibold">
              ${Number(hasDiscount ? product.discountPrice : product.price).toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-muted line-through">${Number(product.price).toFixed(2)}</span>
            )}
          </div>

          <p className="mt-4 text-sm text-ink/80">{product.description}</p>

          <p className="mt-4 text-sm">
            {outOfStock ? (
              <span className="text-red-500">Out of stock</span>
            ) : (
              <span className="text-accent">In stock ({product.stock} available)</span>
            )}
          </p>

          {!outOfStock && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded border border-line">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-ink/70 hover:text-accent"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2 text-ink/70 hover:text-accent"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isMutating}
                className="rounded bg-accent px-6 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent/90 disabled:opacity-60"
              >
                {isMutating ? "Adding…" : "Add to cart"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 max-w-2xl">
        <h2 className="font-display text-xl font-semibold">Reviews</h2>
        <ReviewList reviews={reviewData?.reviews || []} />
        {isAuthenticated ? (
          <ReviewForm productId={id} />
        ) : (
          <p className="mt-4 text-sm text-muted">Sign in to leave a review.</p>
        )}
      </div>
    </div>
  );
}