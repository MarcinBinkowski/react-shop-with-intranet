import type React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import StoreLayout from "./layouts/store-layout"
import IntranetLayout from "./layouts/intranet-layout"
import Dashboard from "./pages/dashboard"
import ProductsPage from "./pages/intranet/products"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/intranet" element={<IntranetLayout />}>
        <Route index element={<Dashboard />} />
        <Route
          path="documents"
          element={
            <div className="p-6">
              <h1 className="text-2xl font-bold">Documents</h1>
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
        <Route
          path="calendar"
          element={
            <div className="p-6">
              <h1 className="text-2xl font-bold">Calendar</h1>
            </div>
          }
        />
        <Route
          path="projects"
          element={
            <div className="p-6">
              <h1 className="text-2xl font-bold">Projects</h1>
            </div>
          }
        />
        <Route
          path="reports"
          element={
            <div className="p-6">
              <h1 className="text-2xl font-bold">Reports</h1>
            </div>
          }
        />
      </Route>

      <Route path="/" element={<StoreLayout />}>
        <Route path="products" element={<ProductsPage />} />
        <Route
          path="customers"
          element={
            <div className="p-6">
              <h1 className="text-2xl font-bold">Customers</h1>
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
        <Route
          path="analytics"
          element={
            <div className="p-6">
              <h1 className="text-2xl font-bold">Analytics</h1>
            </div>
          }
        />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes

