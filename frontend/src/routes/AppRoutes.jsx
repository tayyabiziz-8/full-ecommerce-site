import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Profile from "../pages/Profile.jsx";
import ProductListing from "../pages/ProductListing.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Cart from "../pages/Cart.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import Checkout from "../pages/Checkout.jsx";
import Orders from "../pages/Orders.jsx";
import OrderDetail from "../pages/OrderDetail.jsx";
import AdminWorkInProgress from "../pages/admin/AdminWorkInProgress.jsx";
import NotFound from "../pages/NotFound.jsx";
import Categories from "../pages/Categories.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Route>
        <Route path="/admin/*" element={<AdminWorkInProgress />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}