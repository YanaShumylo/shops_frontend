import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

export default function Header() {
  return (
      <header className={css.header}>
          <div className={css.logo}>FoodDelivery</div>
      <nav className={css.nav}>
        <NavLink
          to="/shops"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          Shops
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          Shopping Cart
        </NavLink>
      </nav>
    </header>
  );
}