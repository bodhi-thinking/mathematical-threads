import type { PlaceValue } from "../../lib/base-system";

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
    <div className="place-grid-wrap">
      <div
        className="place-grid"
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
              className={`place-cell${active ? "" : " place-cell-inactive"}`}
              key={cell}
            >
              {active && filled ? (
                <span className={`place-unit ${placeColorClass}`} aria-hidden="true" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
