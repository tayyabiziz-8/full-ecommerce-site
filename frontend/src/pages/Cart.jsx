import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../hooks/useCart.js";
import CartLineItem from "../components/cart/CartLineItem.jsx";

export default function Cart() {
  const { items, subtotal, isLoading, clearCart, isMutating } = useCart();

  if (isLoading) return <p className="mx-auto max-w-3xl px-6 py-20 text-muted">Loading your cart…</p>;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
        <h1 className="font-display text-2xl font-semibold">Your cart is empty</h1>
        <Link to="/products" className="mt-6 rounded bg-accent px-5 py-2.5 text-sm font-semibold text-paper">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Your cart</h1>
        <button
          onClick={() => clearCart()}
          disabled={isMutating}
          className="text-sm text-muted hover:text-red-500 disabled:opacity-40"
        >
          Clear cart
        </button>
      </div>

      <div className="mt-6">
        {items.map((item) => (
          <CartLineItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
        <span className="text-sm text-muted">Subtotal</span>
        <span className="font-display text-xl font-semibold">${subtotal.toFixed(2)}</span>
      </div>

      <button
        onClick={() => toast.info("Checkout is coming in the next iteration")}
        className="mt-6 w-full rounded bg-accent px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
      >
        Proceed to checkout
      </button>
    </div>
  );
}