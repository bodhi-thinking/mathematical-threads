import Link from "next/link";
import type { Journey } from "../../lib/course-types";
import { PlaygroundView } from "../playground/PlaygroundView";
import { PuzzleSet } from "../puzzles/PuzzleSet";
import { StoryView } from "../story/StoryView";
import { ClueCard } from "./ClueCard";
import styles from "./LessonLayout.module.css";

/**
 * The shared journey page: Story → Playground → Classic Puzzles → Clue.
 * Every journey renders through this component; it only reads the Journey
 * object, so adding a journey never means copying this page.
 */
export function LessonLayout({ journey }: { journey: Journey }) {
  const { meta, story, playground, puzzles, worksheet } = journey;
  const puzzleCount = puzzles?.puzzles?.length ?? 0;

  const outline = [
    "Story",
    "Playground",
    puzzleCount > 0 ? `${puzzleCount} ${puzzleCount === 1 ? "puzzle" : "puzzles"}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <main className="shell">
      <div className={styles["lesson-topbar"]}>
        <Link className={styles["course-home-link"]} href="/">
          ← Course home
        </Link>
      </div>

      <div className={`muted ${styles["lesson-outline"]}`}>{outline}</div>
      <div className="divider" />

      <StoryView story={story} />

      {worksheet?.clue && (
        <>
          <div className="divider" />
          <ClueCard journeyId={meta.id} clue={worksheet.clue} />
        </>
      )}
<div className="divider" />   {/* add this line if it's missing */}
      <PlaygroundView playground={playground} />

      {puzzleCount > 0 && (
        <>
          <div className="divider" />
          <PuzzleSet puzzleSet={puzzles} />
        </>
      )}

    </main>
  );
}
