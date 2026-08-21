const STYLES = {
  pending: "bg-line text-ink/70",
  processing: "bg-accent-warm/20 text-accent-warm",
  shipped: "bg-accent/15 text-accent",
  delivered: "bg-accent text-paper",
  cancelled: "bg-red-100 text-red-600",
};

export default function OrderStatusBadge({ status }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STYLES[status] || STYLES.pending}`}>
      {status}
    </span>
  );
}