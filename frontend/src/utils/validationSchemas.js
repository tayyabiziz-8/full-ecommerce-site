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

export const checkoutSchema = Yup.object({
  street: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string().required("Postal code is required"),
  country: Yup.string().required("Country is required"),
  paymentMethod: Yup.string().oneOf(["card", "cash_on_delivery"]).required("Choose a payment method"),
});