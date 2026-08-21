import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderRequest } from "../api/order.api.js";
import { checkoutSchema } from "../utils/validationSchemas.js";
import { getErrorMessage } from "../api/axiosClient.js";
import { useCart } from "../hooks/useCart.js";

export default function Checkout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { items, subtotal, isLoading } = useCart();

  const mutation = useMutation({
    mutationFn: createOrderRequest,
    onSuccess: (order) => {
      toast.success("Order placed!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate(`/orders/${order.id}`, { replace: true });
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const formik = useFormik({
    initialValues: { street: "", city: "", postalCode: "", country: "", paymentMethod: "card" },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      const shippingAddress = `${values.street}, ${values.city}, ${values.postalCode}, ${values.country}`;
      mutation.mutate({ shippingAddress, paymentMethod: values.paymentMethod });
    },
  });

  if (isLoading) return <p className="mx-auto max-w-3xl px-6 py-20 text-muted">Loading…</p>;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-muted">Add something to your cart before checking out.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-10 px-6 py-10 md:grid-cols-2">
      <div>
        <h1 className="font-display text-2xl font-semibold">Checkout</h1>
        <form onSubmit={formik.handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
          <TextField name="street" label="Street address" formik={formik} />
          <div className="grid grid-cols-2 gap-4">
            <TextField name="city" label="City" formik={formik} />
            <TextField name="postalCode" label="Postal code" formik={formik} />
          </div>
          <TextField name="country" label="Country" formik={formik} />

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-1 text-sm font-medium text-ink/90">Payment method</legend>
            {[
              { value: "card", label: "Card" },
              { value: "cash_on_delivery", label: "Cash on delivery" },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={opt.value}
                  checked={formik.values.paymentMethod === opt.value}
                  onChange={formik.handleChange}
                  className="accent-accent"
                />
                {opt.label}
              </label>
            ))}
          </fieldset>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="mt-2 rounded bg-accent px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent/90 disabled:opacity-60"
          >
            {mutation.isPending ? "Placing order…" : `Place order: $${subtotal.toFixed(2)}`}
          </button>
        </form>
      </div>

      <div>
        <h2 className="eyebrow">Order summary</h2>
        <div className="mt-4 flex flex-col gap-3">
          {items.map((item) => {
            const unitPrice = item.product.discountPrice ?? item.product.price;
            return (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-ink/80">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-medium">${(Number(unitPrice) * item.quantity).toFixed(2)}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-between border-t border-line pt-4">
          <span className="text-sm text-muted">Total</span>
          <span className="font-display text-lg font-semibold">${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function TextField({ name, label, formik }) {
  const error = formik.touched[name] && formik.errors[name];
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink/90">{label}</span>
      <input
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`rounded border px-3 py-2 text-sm outline-none focus:border-accent ${
          error ? "border-red-400" : "border-line"
        }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}