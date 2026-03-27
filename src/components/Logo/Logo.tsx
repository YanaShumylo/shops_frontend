import { FaUtensils } from "react-icons/fa"; 
import css from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={css.logo}>
      <FaUtensils className={css.icon} />
      <span className={css.text}>FoodDelivery</span>
    </div>
  );
}