import type { PlaceValue } from "../../lib/base-system";
import styles from "./PlaygroundView.module.css";

type PlaceGridProps = {
  base: number;
  place: PlaceValue;
};

const GRID_COLUMNS = 5;

function gridForBase(base: number) {
  const safeBase = Math.max(1, Math.min(99, Math.trunc(base)));
  return {
    columns: GRID_COLUMNS,
    rows: Math.ceil(safeBase / GRID_COLUMNS),
  };
}

export function PlaceGrid({ base, place }: PlaceGridProps) {
  const { columns, rows } = gridForBase(base);
  const capacityCells = columns * rows;
  const activeCount = Math.min(place.count, base);
  const placeColorClass = `place-unit-color-${place.index % 5}`;
  const cells = Array.from({ length: capacityCells }, (_, index) => index);

  return (
    <div className={styles["place-grid-wrap"]}>
      <div
        className={styles["place-grid"]}
        style={{
          gridTemplateColumns: `repeat(${columns}, var(--place-cell-size))`,
          gridTemplateRows: `repeat(${rows}, var(--place-cell-size))`,
        }}
        aria-label={`${place.count} units of ${place.value.toLocaleString("en-IN")}`}
      >
        {cells.map((cell) => {
          const active = cell < base;
          const filled = cell < activeCount;

          return (
            <div
              className={
                active
                  ? styles["place-cell"]
                  : `${styles["place-cell"]} ${styles["place-cell-inactive"]}`
              }
              key={cell}
            >
              {active && filled ? (
                <span className={`${styles["place-unit"]} ${styles[placeColorClass]}`} aria-hidden="true" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
