import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getShops } from "../../api/shopsApi";
import type { Shop } from "../../types/shop";
import FiltersShops from "../../components/FiltersShops/FiltersShops";
import ListShops from "../../components/ListShops/ListShops";
import css from "./ShopsPage.module.css";


export default function ShopsPage() {
const [filters, setFilter] = useState<{ minRating?: number; maxRating?: number }>({});

  const { data: shops = [] } = useQuery<Shop[]>({
    queryKey: ["shops", filters],
    queryFn: () => getShops(filters),
    placeholderData: (prev) => prev,
  });

  return (
    <section className={css.shopsPage}>
      <FiltersShops onChange={setFilter} />
      <h1 className={css.title}>Shops:</h1>
      <ListShops items={shops} />
    </section>
  );
}


