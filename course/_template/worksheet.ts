import type { Worksheet } from "../../lib/worksheet-types";

/** Example clue: answers 8 and 9 decode to "HI". */
export const worksheet: Worksheet = {
  runningTitle: "MATHEMATICAL THREADS | YOUR TOPIC",
  pages: [
    {
      kind: "challenges",
      title: "Can you crack the code?",
      intro: "Solve each problem. Turn the answers into letters.",
      codeKey: {
        rules: [
          { from: 1, to: 26, kind: "letter" },
          { from: 27, to: 36, kind: "digit" },
        ],
      },
      challenges: [
        { id: "c1", type: "free", prompt: "What is 3 + 5?", answer: 8 },
        { id: "c2", type: "free", prompt: "What is 4 + 5?", answer: 9 },
      ],
      secretPrompt: "Write the letter for each answer in order.",
    },
  ],
  clue: {
    number: 2,
    kicker: "Lilavati’s Clue Trail · Clue 02",
    title: "The Quest: Title",
    description: "One or two sentences that set up the worksheet.",
    reminder: "Keep your answers. You will need them as the trail continues.",
    caption: "Second clue",
    secret: "HI",
  },
};
