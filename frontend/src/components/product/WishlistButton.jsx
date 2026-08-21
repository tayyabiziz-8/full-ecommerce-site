import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth.js";
import { useWishlist } from "../../hooks/useWishlist.js";

export default function WishlistButton({ productId, className = "" }) {
  const { isAuthenticated } = useAuth();
  const { isWishlisted, toggle, isMutating } = useWishlist();
  const active = isAuthenticated && isWishlisted(productId);

  const handleClick = (e) => {
    e.preventDefault(); // stop parent <Link> navigation when used on ProductCard
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.info("Sign in to use your wishlist");
      return;
    }
    toggle(productId);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isMutating}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-lg transition-colors ${
        active ? "text-accent" : "text-ink/60 hover:text-accent"
      } ${className}`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}