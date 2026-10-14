/**
 * Playground contract.
 *
 * `kind` selects which interactive environment PlaygroundView renders.
 * Only "place-value" exists today. To add another (e.g. a calendar wheel),
 * add its kind here and handle it in components/playground/PlaygroundView.tsx.
 */
export type PlaygroundKind = "place-value";

export type PlaygroundConfig = {
  id: string;
  title: string;
  description: string;
  /** Defaults to "place-value". */
  kind?: PlaygroundKind;
  /** Starting base for the place-value playground. Defaults to 10. */
  defaultBase?: number;
};

export const SUPPORTED_PLAYGROUND_KINDS: readonly PlaygroundKind[] = ["place-value"];
