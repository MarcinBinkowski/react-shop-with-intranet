import type React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import StoreLayout from "./layouts/store-layout"
import IntranetLayout from "./layouts/intranet-layout"
import ProductsPage from "./pages/intranet/products"
import LoginPage from "./pages/login"
import { UserProvider } from "./context/user-context"
import Dashboard from "./pages/intranet/dashboard"
import Index from "./pages/store"

const AppRoutes: React.FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/intranet" element={<IntranetLayout />}>
        {/* <Route index element={<Dashboard />} /> */}

          <Route path="products" element={<ProductsPage />} />
          <Route
            path="documents"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold">Documents</h1>
              </div>
            }
          />
        <Route
            path="customers"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold">Customers</h1>
              </div>
            }
          />
          <Route
            path="team"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold">Team</h1>
              </div>
            }
          />
        </Route>

        <Route path="/" element={<StoreLayout />}>
          <Route index element={<Index />} />
          <Route
            path="products"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold">Store Products</h1>
              </div>
            }
          />
          <Route
            path="orders"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold">Orders</h1>
              </div>
            }
          />
        </Route>
        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserProvider>
  )
}

export default AppRoutes

