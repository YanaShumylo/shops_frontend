import type {Shop} from "../../types/shop";
import CardShops from "../CardShops/CardShops";
import css from "./ListShops.module.css";

interface ShopsListProps {
    items: Shop[];
    onSelect: (id: string) => void;
}

export default function ListShops({items, onSelect}:ShopsListProps) {

return (
    <ul className={css.listShops}>      
            {items.map(item => (
                <CardShops key={item._id} item={item} onClick={() => onSelect(item._id)} />
            ))}
    </ul>
  );
};

