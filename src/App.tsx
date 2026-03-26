import ShopsPage from "./pages/ShopsPage/ShopsPage";
import OrdersPage from "./pages/ShopsPage/ShopsPage";
import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import css from "./App.module.css";

export default function App() {
  return (
    <div className={css.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/shops" />} />

        <Route path="/shops" element={<ShopsPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        <Route path="*" element={<h2>Page not found!</h2>} />
      </Routes>
    </div>
  );
}