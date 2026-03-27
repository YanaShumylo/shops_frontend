import type { Product } from "../../types/product";
import CardProduct from "../CardProduct/CardProduct";
import css from "./ListProducts.module.css";

interface Props {
  items: Product[];
}

export default function ListProducts({ items }: Props) {
  return (
    <ul className={css.listProducts}>
      {items.map((item) => (
        <CardProduct key={item._id} item={item} />
      ))}
    </ul>
  );
}