"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PlaygroundConfig } from "../../lib/playground-types";
import {
  MAX_BASE,
  clampBase,
  MIN_BASE,
  MAX_QUANTITY,
  addQuantity,
  decomposeQuantity,
  formatPower,
  formatQuantity,
  parseBase,
  powerOfBase,
} from "../../lib/base-system";
import { PlaceGrid } from "./PlaceGrid";
import styles from "./PlaygroundView.module.css";

const DEFAULT_BASE = 10;

export function PlaygroundView({ playground }: { playground: PlaygroundConfig }) {
  // Only the place-value environment exists today; see lib/playground-types.ts.
  return <PlaceValuePlayground playground={playground} />;
}

function PlaceValuePlayground({ playground }: { playground: PlaygroundConfig }) {
  const [base, setBase] = useState(clampBase(playground.defaultBase ?? DEFAULT_BASE));
  const [quantity, setQuantity] = useState(0);
  const placeBoardRef = useRef<HTMLDivElement | null>(null);

  const places = useMemo(() => decomposeQuantity(quantity, base), [quantity, base]);
  const allPlaceValues = useMemo(() => {
    const values: { index: number; value: number; count: number }[] = [];
    let value = 1;
    let index = 0;

    while (value <= MAX_QUANTITY) {
      const existing = places.find((place) => place.index === index);
      values.push(existing ?? { index, value, count: 0 });

      if (value > Math.floor(MAX_QUANTITY / base)) break;
      value *= base;
      index += 1;
    }

    return values.reverse();
  }, [base, places]);

  useEffect(() => {
    const board = placeBoardRef.current;
    if (!board) return;

    const frame = window.requestAnimationFrame(() => {
      board.scrollLeft = board.scrollWidth;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [base, allPlaceValues.length]);

  const handleBaseChange = (value: string) => {
    setBase(parseBase(value));
  };

  const changeAtPlace = (place: number, direction: 1 | -1) => {
    const amount = powerOfBase(base, place);
    setQuantity((current) => {
      if (direction === 1) return addQuantity(current, amount);
      return Math.max(0, current - amount);
    });
  };

  const clear = () => setQuantity(0);

  return (
    <section className={`card ${styles["playground-card"]}`} aria-labelledby="place-value-playground-title">
      <div className="eyebrow">Playground</div>
      <h2 id="place-value-playground-title">{playground.title}</h2>
      <p className={styles["playground-description"]}>{playground.description}</p>

      <div className={styles["place-controls"]} aria-label="Place value controls">
        <label className={styles["base-control"]}>
          <span>Base</span>
          <input
            type="number"
            min={MIN_BASE}
            max={MAX_BASE}
            step={1}
            value={base}
            onChange={(event) => handleBaseChange(event.target.value)}
            aria-label={`Base, from ${MIN_BASE} to ${MAX_BASE}`}
          />
        </label>

        <button className={styles["clear-button"]} type="button" onClick={clear} disabled={quantity === 0}>
          Clear
        </button>
      </div>

      <div ref={placeBoardRef} className={styles["place-board"]} aria-label={`Base ${base} place value board`}>
        <div className={styles["place-columns"]}>
          {allPlaceValues.map((place) => (
            <div className={styles["place-column"]} key={place.index}>
              <div className={styles["place-heading"]}>
                <span className={styles["place-name"]}>{formatPower(place.value)}</span>
              </div>

              <PlaceGrid base={base} place={place} />

              <div className={styles["place-count"]} aria-live="polite">
                {place.count}
              </div>

              <div className={styles["place-actions"]} aria-label={`Change ${formatPower(place.value)} place`}>
                <button
                  className={styles["place-action"]}
                  type="button"
                  onClick={() => changeAtPlace(place.index, -1)}
                  disabled={quantity < place.value}
                  aria-label={`Subtract ${formatPower(place.value)}`}
                >
                  −
                </button>
                <button
                  className={styles["place-action"]}
                  type="button"
                  onClick={() => changeAtPlace(place.index, 1)}
                  disabled={quantity + place.value > MAX_QUANTITY}
                  aria-label={`Add ${formatPower(place.value)}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles["playground-number"]} aria-live="polite">
        <span className={styles["playground-number-label"]}>Number</span>
        <strong>{formatQuantity(quantity)}</strong>
      </div>

      <div className={styles["playground-note"]}>
        <span>Base {base}</span>
        <span>·</span>
        <span>When a place fills, it becomes one unit in the place to its left.</span>
      </div>
    </section>
  );
}
