import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart.js";

export default function CartLineItem({ item }) {
  const { updateItem, removeItem, isMutating } = useCart();
  const { product } = item;
  const unitPrice = product.discountPrice ?? product.price;

  return (
    <div className="flex items-center gap-4 border-b border-line py-4">
      <Link to={`/products/${product.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded bg-line/40">
        {product.images?.[0] && (
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        )}
      </Link>

      <div className="flex-1">
        <Link to={`/products/${product.id}`} className="text-sm font-medium text-ink hover:text-accent">
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-muted">${Number(unitPrice).toFixed(2)} each</p>
      </div>

      <div className="flex items-center rounded border border-line">
        <button
          onClick={() => updateItem({ itemId: item.id, quantity: Math.max(1, item.quantity - 1) })}
          disabled={isMutating}
          className="px-3 py-1.5 text-ink/70 hover:text-accent disabled:opacity-40"
        >
          −
        </button>
        <span className="w-8 text-center text-sm">{item.quantity}</span>
        <button
          onClick={() =>
            updateItem({ itemId: item.id, quantity: Math.min(product.stock, item.quantity + 1) })
          }
          disabled={isMutating || item.quantity >= product.stock}
          className="px-3 py-1.5 text-ink/70 hover:text-accent disabled:opacity-40"
        >
          +
        </button>
      </div>

      <span className="w-20 text-right text-sm font-medium">
        ${(Number(unitPrice) * item.quantity).toFixed(2)}
      </span>

      <button
        onClick={() => removeItem(item.id)}
        disabled={isMutating}
        className="text-sm text-muted hover:text-red-500 disabled:opacity-40"
      >
        Remove
      </button>
    </div>
  );
}