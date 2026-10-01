export type PuzzleHint = {
  label: string;
  text: string;
};

export type PuzzleImage = {
  src: string;
  alt: string;
};

export type PuzzleAnswer = {
  accepted: string[];
  placeholder?: string;
  mode?: "exact" | "contains";
};

export type Puzzle = {
  id: string;
  title: string;
  type:
    | "notice"
    | "describe"
    | "represent"
    | "predict"
    | "generalise"
    | "reasoning"
    | "challenge";
  prompt: string;
  instructions?: string[];
  hints?: PuzzleHint[];
  reveal?: string;
  answer?: PuzzleAnswer;
  image?: PuzzleImage;
};
