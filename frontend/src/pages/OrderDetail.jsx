import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrderRequest } from "../api/order.api.js";
import OrderStatusBadge from "../components/order/OrderStatusBadge.jsx";

export default function OrderDetail() {
  const { id } = useParams();
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderRequest(id),
  });

  if (isLoading) return <p className="mx-auto max-w-3xl px-6 py-20 text-muted">Loading…</p>;
  if (!order) return <p className="mx-auto max-w-3xl px-6 py-20 text-muted">Order not found.</p>;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link to="/orders" className="text-sm text-muted hover:text-accent">
        ← Back to orders
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Order #{order.id}</h1>
        <OrderStatusBadge status={order.status} />
      </div>
      <p className="mt-1 text-sm text-muted">
        Placed on {new Date(order.created_at).toLocaleDateString()}
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b border-line pb-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded bg-line/40">
              {item.product?.images?.[0] && (
                <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.product?.name}</p>
              <p className="text-xs text-muted">Qty {item.quantity} × ${Number(item.price).toFixed(2)}</p>
            </div>
            <span className="text-sm font-medium">
              ${(Number(item.price) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <span className="text-sm text-muted">Total</span>
        <span className="font-display text-lg font-semibold">${Number(order.totalAmount).toFixed(2)}</span>
      </div>

      <div className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <span className="eyebrow">Shipping address</span>
          <p className="mt-1 text-ink/80">{order.shippingAddress}</p>
        </div>
        <div>
          <span className="eyebrow">Payment</span>
          <p className="mt-1 capitalize text-ink/80">
            {order.paymentMethod?.replace("_", " ")} · {order.paymentStatus}
          </p>
        </div>
      </div>
    </div>
  );
}