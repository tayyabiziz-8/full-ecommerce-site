import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth.js";
import { registerSchema } from "../utils/validationSchemas.js";
import { getErrorMessage } from "../api/axiosClient.js";

const fields = [
  { name: "firstName", label: "First name", type: "text" },
  { name: "lastName", label: "Last name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone (optional)", type: "text" },
  { name: "password", label: "Password", type: "password" },
];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { firstName: "", lastName: "", email: "", phone: "", password: "" },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const user = await register(values);
        toast.success(`Welcome to Shopped, ${user.firstName}`);
        navigate("/", { replace: true });
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="mx-auto flex max-w-sm flex-col px-6 py-20">
      <h1 className="font-display text-2xl font-semibold">Create an account</h1>
      <form onSubmit={formik.handleSubmit} className="mt-8 flex flex-col gap-4" noValidate>
        {fields.map((f) => {
          const error = formik.touched[f.name] && formik.errors[f.name];
          return (
            <label key={f.name} className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink/90">{f.label}</span>
              <input
                type={f.type}
                name={f.name}
                value={formik.values[f.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`rounded border px-3 py-2 text-sm outline-none focus:border-accent ${
                  error ? "border-red-400" : "border-line"
                }`}
              />
              {error && <span className="text-xs text-red-500">{error}</span>}
            </label>
          );
        })}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="mt-2 rounded bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent/90 disabled:opacity-60"
        >
          {formik.isSubmitting ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="mt-6 text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-accent">
          Sign in
        </Link>
      </p>
    </div>
  );
}