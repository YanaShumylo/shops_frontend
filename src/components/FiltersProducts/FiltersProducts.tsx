import { useState, useEffect } from "react";
import css from "./FiltersProducts.module.css";
import type { Product } from "../../types/product";

export interface PropsFiltersProducts {
  products: Product[]; 
  onChange: (filters: {
    categories?: string[];
    sortBy?: string;
    order?: string;
  }) => void;
}

const categoriesList = [
  "Burgers",
  "Pizza",
  "Sushi",
  "Pasta",
  "Salads",
  "Soups",
  "Drinks",
  "Coffee",
  "Desserts",
  "Ice Cream",
  "Fries",
  "Snacks",
  "Healthy Food",
  "Vegan",
  "Street Food",
];

export default function FiltersProducts({ products = [], onChange }: PropsFiltersProducts) {
  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    let sortBy: string | undefined;
    let order: string | undefined;

    if (sort === "priceAsc") {
      sortBy = "price";
      order = "asc";
    } else if (sort === "priceDesc") {
      sortBy = "price";
      order = "desc";
    } else if (sort === "nameAsc") {
      sortBy = "name";
      order = "asc";
    } else if (sort === "nameDesc") {
      sortBy = "name";
      order = "desc";
    }

    onChange({
      categories: selected.length > 0 ? selected : undefined,
      sortBy,
      order,
    });
  }, [selected, sort, onChange]);

  const toggleCategory = (cat: string) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleReset = () => {
    setSelected([]);
    setSort("");
  };

  const missingCategories = selected.filter(
    (cat) =>
      !products.some(
        (p) => p.category.trim().toLowerCase() === cat.trim().toLowerCase()
      )
  );

  return (
    <div className={css.filter}>
      {/* Категорії */}
      <div className={css.chips}>
        {categoriesList.map((cat) => (
          <button
            key={cat}
            className={`${css.chip} ${selected.includes(cat) ? css.active : ""}`}
            onClick={() => toggleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {missingCategories.length > 0 && (
        <p className={css.textNo}>
          In this shop, no products in category: {missingCategories.join(", ")}
        </p>
      )}

      {/* Сортування */}
      <select
        className={css.sortBy}
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Default</option>
        <option value="priceAsc">Price ↑</option>
        <option value="priceDesc">Price ↓</option>
        <option value="nameAsc">Name A-Z</option>
        <option value="nameDesc">Name Z-A</option>
      </select>

      <div className={css.btn}>
        <p className={css.text}>
          {selected.length > 0
            ? `Selected: ${selected.join(", ")}`
            : "All categories"}
        </p>
        <button className={css.btnReset} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}