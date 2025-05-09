import type React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import StoreLayout from "./layouts/store-layout"
import IntranetLayout from "./layouts/intranet-layout"
import LoginPage from "./pages/login"
import { UserProvider } from "./context/user-context"
import Index from "./pages/store"
import EmployeesPage from "./pages/intranet/employees"
import UsersPage from "./pages/intranet/users"
import ProductsPage from "./pages/intranet/products"
import InvoicesPage from "./pages/intranet/invoices"
import OrdersPage from "./pages/intranet/orders"
import PaymentsPage from "./pages/intranet/payments"
import NotificationsPage from "./pages/intranet/notifications"
import RatingsPage from "./pages/intranet/ratings"
import ShopPage from "./pages/store/shop"
import CartPage from "./pages/store/cart"
import StoreOrdersPage from "./pages/store/orders"
import StorePaymentsPage from "./pages/store/payments"


const AppRoutes: React.FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/intranet" element={<IntranetLayout />}>
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="ratings" element={<RatingsPage />} />
        </Route>

        <Route path="/" element={<StoreLayout />}>
          <Route index element={<ShopPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="orders" element={<StoreOrdersPage />} />
          <Route path="payments" element={<StorePaymentsPage />} />
        </Route>
        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserProvider>
  )
}

export default AppRoutes

