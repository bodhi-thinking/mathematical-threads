import type { Worksheet } from "../../lib/worksheet-types";

/**
 * Journey 001 worksheet and clue.
 *
 * Page 1: number-code challenges → "THE SECRET".
 * Page 2: the place-value lab.
 *
 * Decoding: 16→P, 1→A, 7→G, 5→E, 27→0, 34→7  =  PAGE07
 */
export const worksheet: Worksheet = {
  runningTitle: "MATHEMATICAL THREADS | NUMBER SYSTEMS",

  pages: [
    {
      kind: "challenges",
      title: "Can you crack the number code?",
      intro:
        "Solve each conversion. Turn the answers into letters to reveal the next path in Lilavati’s journey.",
      codeKey: {
        rules: [
          { from: 1, to: 26, kind: "letter" },
          { from: 27, to: 36, kind: "digit" },
        ],
      },
      challenges: [
        { id: "c1", type: "convert", digits: "10000", base: 2, answer: 16 },
        { id: "c2", type: "convert", digits: "1", base: 5, answer: 1 },
        { id: "c3", type: "convert", digits: "21", base: 3, answer: 7 },
        { id: "c4", type: "convert", digits: "10", base: 5, answer: 5 },
        { id: "c5", type: "convert", digits: "33", base: 8, answer: 27 },
        { id: "c6", type: "convert", digits: "42", base: 8, answer: 34 },
      ],
      secretPrompt:
        "Write the letter or digit for each answer in order. What page does the code point you to?",
    },

    {
      kind: "lab",
      title: "My Number system Lab",
      intro:
        "Use beads, stones, paper balls, or drawn counters. Show how grouping changes the way a number is written.",
      fields: [
        { label: "My base", prompt: "How many objects make one new unit?" },
        { label: "My number", prompt: "How many objects am I starting with?" },
      ],
      board: {
        title: "My place-value board",
        columns: ["Largest place", "Next place", "Next place", "Ones"],
      },
      write: {
        title: "Now write the number",
        prompt: "Number in my chosen base:",
      },
      reflection:
        "Try again with a different base. What changes in the written number, and what stays the same?",
    },
  ],

  clue: {
    number: 1,
    kicker: "Lilavati’s Clue Trail · Clue 01",
    title: "The Quest: Crack the Number Code",
    description:
      "Numbers can look different when we change how we group them. Use what you discover about bases to solve the challenges and uncover your first clue.",
    reminder: "Keep your answers. You will need them as the trail continues.",
    caption: "First clue",
    secret: "PAGE07",
  },
};
