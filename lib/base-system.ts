export const MIN_BASE = 2;
export const MAX_BASE = 99;
export const MAX_PLACES = 20;

// The engine is deliberately bounded. 2^20 - 1 is exactly representable by
// JavaScript Number and can be represented in every supported base using at
// most 20 places, including base 2.
export const MAX_QUANTITY = 10_000;

export type PlaceValue = {
  index: number;
  value: number;
  count: number;
};

export function clampBase(value: number): number {
  if (!Number.isFinite(value)) return 10;
  return Math.min(MAX_BASE, Math.max(MIN_BASE, Math.trunc(value)));
}

export function parseBase(value: string): number {
  if (value.trim() === "") return 10;
  const parsed = Number.parseInt(value, 10);
  return clampBase(parsed);
}

export function clampQuantity(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.min(MAX_QUANTITY, Math.trunc(value));
}

export function powerOfBase(base: number, place: number): number {
  const safeBase = clampBase(base);
  const safePlace = Math.min(MAX_PLACES - 1, Math.max(0, Math.trunc(place)));
  let result = 1;

  for (let index = 0; index < safePlace; index += 1) {
    result *= safeBase;
    if (result >= MAX_QUANTITY) return MAX_QUANTITY;
  }

  return result;
}

export function getPlaceValues(base: number): number[] {
  const safeBase = clampBase(base);
  const values: number[] = [];
  let value = 1;

  for (let index = 0; index < MAX_PLACES; index += 1) {
    values.push(value);

    if (value > Math.floor(MAX_QUANTITY / safeBase)) break;
    value *= safeBase;
  }

  return values;
}

export function decomposeQuantity(quantity: number, base: number): PlaceValue[] {
  const safeQuantity = clampQuantity(quantity);
  const values = getPlaceValues(base);
  const places: PlaceValue[] = [];
  let remaining = safeQuantity;

  for (let index = values.length - 1; index >= 0; index -= 1) {
    const value = values[index];
    const count = Math.floor(remaining / value);
    remaining -= count * value;

    if (count > 0 || index === 0) {
      places.push({ index, value, count });
    }
  }

  return places;
}

export function addQuantity(quantity: number, amount: number): number {
  const safeQuantity = clampQuantity(quantity);
  const safeAmount = Number.isFinite(amount) && amount > 0 ? Math.trunc(amount) : 0;
  return clampQuantity(safeQuantity + safeAmount);
}

export function formatQuantity(quantity: number): string {
  return clampQuantity(quantity).toLocaleString("en-IN");
}

export function formatPower(value: number): string {
  return value.toLocaleString("en-IN");
}

export function gridShape(capacity: number): { columns: number; rows: number } {
  const safeCapacity = Math.max(1, Math.min(MAX_BASE, Math.trunc(capacity)));

  // Prefer a compact rectangle whose dimensions are factors of the base.
  // This gives base 10 a natural 5 × 2 grid, while keeping prime bases
  // compact without ever creating an unbounded number of cells.
  let bestColumns = safeCapacity;
  let bestRows = 1;
  let bestArea = safeCapacity;
  const limit = Math.ceil(Math.sqrt(safeCapacity));

  for (let columns = 1; columns <= limit; columns += 1) {
    const rows = Math.ceil(safeCapacity / columns);
    const area = columns * rows;

    if (area < bestArea || (area === bestArea && Math.abs(columns - rows) < Math.abs(bestColumns - bestRows))) {
      bestColumns = columns;
      bestRows = rows;
      bestArea = area;
    }
  }

  return { columns: bestColumns, rows: bestRows };
}
