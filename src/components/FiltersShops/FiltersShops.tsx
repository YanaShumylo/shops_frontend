import { useState } from "react";
import css from "./FiltersShops.module.css";

interface FilterShopsProps {
  onChange: (filter: { minRating?: number; maxRating?: number }) => void;
}

export default function FilterShops({ onChange }: FilterShopsProps) {
  const [minRating, setMinRating] = useState<number>();
  const [maxRating, setMaxRating] = useState<number>();

  const handleFilter = () => {
    onChange({ minRating, maxRating });
  };

  const handleReset = () => {
    setMinRating(undefined);
    setMaxRating(undefined);
    onChange({});
  };

  return (
    <div className={css.filter}>
      <div className={css.wrapperLabel}>
      <label className={css.label}>
        Min Rating:
        <input
          type="number"
          min={1}
          max={5}
          step={0.1}
          value={minRating ?? "0"}
          className={css.input}
          onChange={(e) => setMinRating(Number(e.target.value))}
        />
      </label>

      <label className={css.label}>
        Max Rating:
        <input
          type="number"
          min={1}
          max={5}
          step={0.1}
          value={maxRating ?? "5"}
          className={css.input}
          onChange={(e) => setMaxRating(Number(e.target.value))}
        />
        </label>
      </div>

      <div className={css.btn}>
      <button className={css.btnRating} onClick={handleFilter}>Rating</button>
      <button className={css.btnRating} onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}