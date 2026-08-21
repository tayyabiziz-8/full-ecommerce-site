import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Profile from "../pages/Profile.jsx";
import AdminWorkInProgress from "../pages/admin/AdminWorkInProgress.jsx";
import NotFound from "../pages/NotFound.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/admin/*" element={<AdminWorkInProgress />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}