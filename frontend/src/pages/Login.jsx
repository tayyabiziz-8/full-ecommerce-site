import { useFormik } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth.js";
import { loginSchema } from "../utils/validationSchemas.js";
import { getErrorMessage } from "../api/axiosClient.js";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const user = await login(values);
        toast.success(`Welcome back, ${user.firstName}`);
        navigate(from, { replace: true });
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="mx-auto flex max-w-sm flex-col px-6 py-20">
      <h1 className="font-display text-2xl font-semibold">Sign in</h1>
      <form onSubmit={formik.handleSubmit} className="mt-8 flex flex-col gap-4" noValidate>
        <Field
          label="Email"
          name="email"
          type="email"
          formik={formik}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          formik={formik}
        />
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="mt-2 rounded bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent/90 disabled:opacity-60"
        >
          {formik.isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-sm text-muted">
        No account?{" "}
        <Link to="/register" className="font-medium text-accent">
          Create one
        </Link>
      </p>
    </div>
  );
}

function Field({ label, name, type, formik }) {
  const error = formik.touched[name] && formik.errors[name];
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink/90">{label}</span>
      <input
        type={type}
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