import type { Journey } from "../../lib/course-types";
import { playground } from "./playground";
import { puzzleSet } from "./puzzles";
import { story } from "./story";
import { worksheet } from "./worksheet";

export const journey: Journey = {
  meta: {
    id: "001-counting",
    title: "When Did Humans Begin Counting?",
    subtitle: "A journey from sheep and pebbles to place value and zero.",
    status: "available",
  },
  story,
  playground,
  puzzles: puzzleSet,
  worksheet,
};
