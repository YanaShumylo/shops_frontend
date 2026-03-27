import type { Shop } from "../../types/shop";
import css from "./CardShops.module.css";

interface CardShopsProps {
  item: Shop;
  onClick?: () => void;
}

export default function CardShops({ item, onClick }: CardShopsProps) {

  return (
    <li className={css.card} onClick={onClick}>
      {item.image && <img src={item .image} alt={item.name} className={css.image} />}
      <div className={css.content}>
        <h2 className={css.name}>{item .name}</h2>
        <p className={css.description}>{item .description}</p>
        <p className={css.rating}>Rating: {item .rating.toFixed(1)}</p>
      </div>
    </li>
  );
};
