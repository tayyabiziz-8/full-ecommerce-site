import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth.js";
import { changePasswordRequest, updateProfilePictureRequest } from "../api/auth.api.js";
import { changePasswordSchema } from "../utils/validationSchemas.js";
import { getErrorMessage } from "../api/axiosClient.js";
import { resolveMediaUrl } from "../utils/media.js";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const pictureMutation = useMutation({
    mutationFn: updateProfilePictureRequest,
    onSuccess: (updatedUser) => {
      updateUser({ profilePicture: updatedUser.profilePicture });
      toast.success("Profile picture updated");
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
      setPreviewUrl(null);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    pictureMutation.mutate(file);
  };

  const passwordMutation = useMutation({
    mutationFn: changePasswordRequest,
    onSuccess: () => {
      toast.success("Password changed");
      passwordFormik.resetForm();
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const passwordFormik = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    validationSchema: changePasswordSchema,
    onSubmit: (values) => passwordMutation.mutate(values),
  });

  const avatarSrc = previewUrl || resolveMediaUrl(user.profilePicture);

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <div className="flex items-center gap-5">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-line bg-line/40"
          aria-label="Change profile picture"
        >
          {avatarSrc ? (
            <img src={avatarSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-display text-xl text-muted">
              {user.firstName?.[0]}
            </span>
          )}
          {pictureMutation.isPending && (
            <span className="absolute inset-0 flex items-center justify-center bg-ink/40 text-xs text-paper">
              Uploading…
            </span>
          )}
        </button>
        <div>
          <h1 className="font-display text-2xl font-semibold">
            {user.firstName} {user.lastName}
          </h1>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 text-xs font-medium text-accent hover:underline"
          >
            Change photo
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <Link
        to="/orders"
        className="mt-8 inline-block rounded border border-ink px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
      >
        View order history
      </Link>

      <div className="mt-10 border-t border-line pt-8">
        <h2 className="font-display text-lg font-semibold">Change password</h2>
        <form onSubmit={passwordFormik.handleSubmit} className="mt-4 flex flex-col gap-4" noValidate>
          <PasswordField name="oldPassword" label="Current password" formik={passwordFormik} />
          <PasswordField name="newPassword" label="New password" formik={passwordFormik} />
          <PasswordField name="confirmPassword" label="Confirm new password" formik={passwordFormik} />
          <button
            type="submit"
            disabled={passwordMutation.isPending}
            className="mt-1 w-fit rounded bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent/90 disabled:opacity-60"
          >
            {passwordMutation.isPending ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}

function PasswordField({ name, label, formik }) {
  const error = formik.touched[name] && formik.errors[name];
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink/90">{label}</span>
      <input
        type="password"
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