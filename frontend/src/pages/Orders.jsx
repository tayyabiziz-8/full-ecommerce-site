import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyOrdersRequest } from "../api/order.api.js";
import OrderStatusBadge from "../components/order/OrderStatusBadge.jsx";

export default function Orders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrdersRequest,
  });

  if (isLoading) return <p className="mx-auto max-w-3xl px-6 py-20 text-muted">Loading orders…</p>;

  if (!orders?.length) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
        <h1 className="font-display text-2xl font-semibold">No orders yet</h1>
        <Link to="/products" className="mt-6 rounded bg-accent px-5 py-2.5 text-sm font-semibold text-paper">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-display text-2xl font-semibold">Order history</h1>
      <div className="mt-6 flex flex-col gap-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="flex items-center justify-between rounded border border-line p-4 transition-colors hover:border-accent"
          >
            <div>
              <p className="text-sm font-medium">Order #{order.id}</p>
              <p className="mt-1 text-xs text-muted">
                {new Date(order.created_at).toLocaleDateString()} · {order.items.length} item
                {order.items.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-sm font-semibold">
                ${Number(order.totalAmount).toFixed(2)}
              </span>
              <OrderStatusBadge status={order.status} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}