import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReviewRequest } from "../../api/review.api.js";
import { getErrorMessage } from "../../api/axiosClient.js";

const schema = Yup.object({
  rating: Yup.number().min(1, "Pick a rating").max(5).required(),
  comment: Yup.string().max(500, "Keep it under 500 characters"),
});

export default function ReviewForm({ productId }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createReviewRequest,
    onSuccess: () => {
      toast.success("Review submitted");
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      formik.resetForm();
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const formik = useFormik({
    initialValues: { rating: 0, comment: "" },
    validationSchema: schema,
    onSubmit: (values) => mutation.mutate({ productId, ...values }),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-6 flex flex-col gap-3 rounded border border-line p-4">
      <span className="text-sm font-medium">Leave a review</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => formik.setFieldValue("rating", n)}
            className={`text-xl ${n <= formik.values.rating ? "text-accent-warm" : "text-line"}`}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
      </div>
      {formik.touched.rating && formik.errors.rating && (
        <span className="text-xs text-red-500">{formik.errors.rating}</span>
      )}
      <textarea
        name="comment"
        placeholder="Share your thoughts (optional)"
        value={formik.values.comment}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        rows={3}
        className="rounded border border-line px-3 py-2 text-sm outline-none focus:border-accent"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-fit rounded bg-accent px-4 py-2 text-sm font-semibold text-paper disabled:opacity-60"
      >
        {mutation.isPending ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}