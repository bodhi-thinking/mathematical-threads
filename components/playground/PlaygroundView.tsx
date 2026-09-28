"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MAX_BASE,
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

export type PlaygroundConfig = {
  id: string;
  title: string;
  description: string;
};

const DEFAULT_BASE = 10;

export function PlaygroundView({ playground }: { playground: PlaygroundConfig }) {
  const [base, setBase] = useState(DEFAULT_BASE);
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
    <section className="card playground-card" aria-labelledby="place-value-playground-title">
      <div className="eyebrow">Playground</div>
      <h2 id="place-value-playground-title">{playground.title}</h2>
      <p className="playground-description">{playground.description}</p>

      <div className="place-controls" aria-label="Place value controls">
        <label className="base-control">
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

        <button className="clear-button" type="button" onClick={clear} disabled={quantity === 0}>
          Clear
        </button>
      </div>

      <div ref={placeBoardRef} className="place-board" aria-label={`Base ${base} place value board`}>
        <div className="place-columns">
          {allPlaceValues.map((place) => (
            <div className="place-column" key={place.index}>
              <div className="place-heading">
                <span className="place-name">{formatPower(place.value)}</span>
              </div>

              <PlaceGrid base={base} place={place} />

              <div className="place-count" aria-live="polite">
                {place.count}
              </div>

              <div className="place-actions" aria-label={`Change ${formatPower(place.value)} place`}>
                <button
                  className="place-action place-action-minus"
                  type="button"
                  onClick={() => changeAtPlace(place.index, -1)}
                  disabled={quantity < place.value}
                  aria-label={`Subtract ${formatPower(place.value)}`}
                >
                  −
                </button>
                <button
                  className="place-action place-action-plus"
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

      <div className="playground-number" aria-live="polite">
        <span className="playground-number-label">Number</span>
        <strong>{formatQuantity(quantity)}</strong>
      </div>

      <div className="playground-note">
        <span>Base {base}</span>
        <span>·</span>
        <span>When a place fills, it becomes one unit in the place to its left.</span>
      </div>
    </section>
  );
}
