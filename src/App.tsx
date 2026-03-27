import ShopsPage from "./pages/ShopsPage/ShopsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import css from "./App.module.css";
import Loader from "./components/Loader/Loader"; 

export default function App() {
  return (
    <div className={css.app}>
      <Header />
      <Loader overlay />
      <Routes>
        <Route path="/" element={<Navigate to="/shops" />} />

        <Route path="/shops" element={<ShopsPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        <Route path="*" element={<h2 className={css.text}>Page not found!</h2>} />
      </Routes>
    </div>
  );
}