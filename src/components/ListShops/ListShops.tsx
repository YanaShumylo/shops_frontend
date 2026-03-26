import type {Shop} from "../../types/shop";
import CardShops from "../CardShops/CardShops";
import css from "./ListShops.module.css";

interface ShopsListProps {
    items: Shop[];
}

export default function ListShops({items}:ShopsListProps) {

return (
    <ul className={css.listShops}>      
            {items.map(item => (
                <CardShops key={item._id} item={item} />
            ))}
    </ul>
  );
};

