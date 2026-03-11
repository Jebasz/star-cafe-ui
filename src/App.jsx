import { Routes, Route, Navigate } from "react-router-dom";
import BillingPage from "./pages/BillingPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ProductManagement from "./pages/ProductManagement";
import LoginPage from "./pages/LoginPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AboutPage from "./pages/AboutPage";
import AdminSettings from "./pages/AdminSettings";
import DeleteProduct from "./components/admin/DeleteProduct";

function App() {
  return (
    <Routes>

      {/* Login - Only for NOT logged-in users */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Billing - Accessible to ADMIN + STAFF */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <BillingPage />
          </ProtectedRoute>
        }
      />

      <Route path="/about" element={<AboutPage />} />

      {/* Admin Layout - ADMIN only */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="delete-products" element={<DeleteProduct />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;