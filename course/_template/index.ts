import type { Journey } from "../../lib/course-types";
import { playground } from "./playground";
import { puzzleSet } from "./puzzles";
import { story } from "./story";
import { worksheet } from "./worksheet";

export const journey: Journey = {
  meta: {
    id: "000-template", // must match the folder name once you copy this
    title: "Journey title",
    subtitle: "One sentence for the homepage card.",
    status: "available", // use "coming-soon" to list it without a link
  },
  story,
  playground,
  puzzles: puzzleSet,
  worksheet,
};
