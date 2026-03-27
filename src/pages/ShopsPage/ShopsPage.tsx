import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getShops } from "../../api/shopsApi";
import type { Shop } from "../../types/shop";
import FiltersShops from "../../components/FiltersShops/FiltersShops";
import ListShops from "../../components/ListShops/ListShops";
import css from "./ShopsPage.module.css";
import { getProducts } from "../../api/productsApi";
import type { Product } from "../../types/product";
import ListProducts from "../../components/ListProducts/ListProducts";
import FiltersProducts from "../../components/FiltersProducts/FiltersProducts";

export default function ShopsPage() {
  const [filters, setFilter] = useState<{minRating?: number; maxRating?: number;}>({});
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [productFilters, setProductFilters] = useState<{ categories?: string[];
  sortBy?: string; order?: string;}>({});

  const { data: shops = [] } = useQuery<Shop[]>({
    queryKey: ["shops", filters],
    queryFn: () => getShops(filters),
    placeholderData: (prev) => prev,
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products", selectedShop, productFilters],
    queryFn: () =>
      selectedShop
        ? getProducts({ shopId: selectedShop, ...productFilters })
        : Promise.resolve([]),
    enabled: !!selectedShop,
    placeholderData: (prev) => prev,
    });
  
  const handleSelectShop = (id: string) => {
    setSelectedShop(id);
    setProductFilters({});
    };

  return (
    <section className={css.shopsPage}>
      <FiltersShops onChange={setFilter} />
      <h3 className={css.title}>Shops:</h3>
      <ListShops items={shops} onSelect={handleSelectShop}/>

      {selectedShop && (
        <>
          <h3 className={css.title}>Products of selected shop</h3>
          <FiltersProducts products={products}  onChange={setProductFilters} />
          <ListProducts items={products} />
        </>
      )}
    </section>
  );
}


