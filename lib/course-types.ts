import type { PlaygroundConfig } from "./playground-types";
import type { PuzzleSetConfig } from "./puzzle-types";
import type { Story } from "./story-types";
import type { Worksheet } from "./worksheet-types";

export type JourneyStatus = "available" | "coming-soon";

/** What the homepage needs to list a journey. */
export type JourneyMeta = {
  /** URL slug and folder name, e.g. "001-counting". Lowercase letters, digits, hyphens. */
  id: string;
  title: string;
  subtitle?: string;
  status?: JourneyStatus;
};

/** Everything one journey supplies to the shared lesson page. */
export type Journey = {
  meta: JourneyMeta;
  story: Story;
  playground: PlaygroundConfig;
  puzzles: PuzzleSetConfig;
  /** Optional so a journey can be published before its worksheet is ready. */
  worksheet?: Worksheet;
};

/** @deprecated Use JourneyMeta. Kept so older imports keep compiling. */
export type Lesson = JourneyMeta;
