import type { Puzzle, PuzzleSetConfig } from "../../lib/puzzle-types";

const puzzles: Puzzle[] = [
  {
    id: "example-puzzle",
    title: "Example puzzle",
    type: "reasoning",
    prompt: "What is 2 + 2?",
    hints: [{ label: "Hint 1", text: "Count on your fingers." }],
    answer: { accepted: ["4", "four"], placeholder: "Your answer" },
    reveal: "Explain the idea the puzzle shows.",
  },
];

export const puzzleSet: PuzzleSetConfig = {
  heading: "Now try it yourself.",
  intro: ["A short introduction to this journey's puzzles."],
  puzzles,
};
