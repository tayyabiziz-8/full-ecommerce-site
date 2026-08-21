import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  phone: Yup.string().optional(),
  password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
});