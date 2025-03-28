import { Navigate, Route, Routes } from "react-router-dom";
import StoreLayout from "./layouts/store-layout";
import IntranetLayout from "./layouts/intranet-layout";


const AppRoutes() => {

    return (
        <Routes>
        <Route
          path="/intranet"
          element={
            true ? <IntranetLayout /> : <Navigate to="/" replace />
          }
        >
        </Route>
  
        <Route path="/" element={<StoreLayout />}>
        </Route>
  
        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    )
}