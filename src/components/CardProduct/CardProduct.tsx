import type { Product } from "../../types/product";
import css from "./CardProduct.module.css";

interface Props {
  item: Product;
}

export default function CardProduct({ item }: Props) {
  return (
    <li className={css.card}>
      <img src={item.image} alt={item.name} className={css.image} />

      <div className={css.content}>
        <h2 className={css.name}>{item.name}</h2>
        <p className={css.price}>${item.price}</p>
        <p className={css.category}>{item.category}</p>
        <button className={css.btnCart}>add to Cart</button>
      </div>
      
    </li>
  );
}