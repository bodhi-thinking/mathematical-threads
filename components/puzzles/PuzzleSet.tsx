"use client";

import { useState } from "react";
import type { Puzzle, PuzzleSetConfig } from "../../lib/puzzle-types";
import styles from "./PuzzleSet.module.css";

const normalizeAnswer = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[,_]/g, "")
    .replace(/\s+/g, " ");

function isAnswerCorrect(puzzle: Puzzle, value: string) {
  if (!puzzle.answer) return false;

  const normalized = normalizeAnswer(value);
  if (!normalized) return false;

  return puzzle.answer.accepted.some((answer) => {
    const expected = normalizeAnswer(answer);

    if (puzzle.answer?.mode === "contains") {
      return normalized.includes(expected);
    }

    return normalized === expected;
  });
}

export function PuzzleSet({ puzzleSet }: { puzzleSet: PuzzleSetConfig }) {
  const [score, setScore] = useState(0);
  const puzzles = Array.isArray(puzzleSet?.puzzles) ? puzzleSet.puzzles : [];
  const intro = Array.isArray(puzzleSet?.intro) ? puzzleSet.intro : [];

  // A journey with no puzzles yet simply shows no puzzle section.
  if (puzzles.length === 0) return null;

  return (
    <section className={styles["puzzle-set"]}>
      <div className="eyebrow">Puzzles</div>
      <h2>{puzzleSet.heading}</h2>

      {intro.length > 0 && (
        <div className={styles["puzzle-intro"]}>
          {intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}

      <div className={styles["puzzle-progress"]} aria-live="polite">
        <span>Your progress</span>
        <strong>
          {score} / {puzzles.length}
        </strong>
      </div>

      <div className={styles["puzzle-list"]}>
        {puzzles.map((puzzle, index) => (
          <PuzzleCard
            key={puzzle.id}
            puzzle={puzzle}
            number={index + 1}
            onCorrect={() => setScore((current) => current + 1)}
          />
        ))}
      </div>
    </section>
  );
}

function PuzzleCard({
  puzzle,
  number,
  onCorrect
}: {
  puzzle: Puzzle;
  number: number;
  onCorrect: () => void;
}) {
  const [hintIndex, setHintIndex] = useState(-1);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  const showNextHint = () => {
    if (!puzzle.hints?.length) return;

    setHintIndex((current) =>
      Math.min(current + 1, puzzle.hints!.length - 1)
    );
  };

  const submitAnswer = () => {
    if (!puzzle.answer || correct) return;

    const result = isAnswerCorrect(puzzle, answer);
    setSubmitted(true);
    setCorrect(result);

    if (result) {
      onCorrect();
    }
  };

  return (
    <article className={`card ${styles["puzzle"]}`}>
      <div className={styles["puzzle-number"]}>
        PUZZLE {number} · {puzzle.type.toUpperCase()}
      </div>

      <div className={styles["puzzle-layout"]}>
        <div className={styles["puzzle-content"]}>
          <h2>{puzzle.title}</h2>

          <p className={styles["puzzle-prompt"]}>{puzzle.prompt}</p>

          {puzzle.instructions && (
            <ol className={styles["puzzle-instructions"]}>
              {puzzle.instructions.map((instruction, instructionIndex) => (
                <li key={`${instructionIndex}-${instruction}`}>{instruction}</li>
              ))}
            </ol>
          )}

          {puzzle.answer && (
            <div className={styles["puzzle-challenge"]}>
              <label htmlFor={`answer-${puzzle.id}`}>Your answer</label>
              <div className={styles["puzzle-submit-row"]}>
                <input
                  id={`answer-${puzzle.id}`}
                  type="text"
                  value={answer}
                  placeholder={puzzle.answer.placeholder}
                  onChange={(event) => {
                    setAnswer(event.target.value);
                    if (submitted && !correct) setSubmitted(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") submitAnswer();
                  }}
                  disabled={correct}
                  aria-describedby={`feedback-${puzzle.id}`}
                />
                <button
                  type="button"
                  className={`${styles["puzzle-button"]} ${styles["puzzle-submit-button"]}`}
                  onClick={submitAnswer}
                  disabled={!answer.trim() || correct}
                >
                  {correct ? "✓ Correct!" : "Submit answer"}
                </button>
              </div>

              <div
                id={`feedback-${puzzle.id}`}
                className={`${styles["puzzle-feedback"]} ${
                  submitted
                    ? correct
                      ? styles["is-correct"]
                      : styles["is-try-again"]
                    : ""
                }`}
                aria-live="polite"
              >
                {submitted && correct && "That's it. Now see what the puzzle shows."}
                {submitted && !correct &&
                  "Not quite. Try looking at the problem another way."}
              </div>
            </div>
          )}

          {puzzle.hints && puzzle.hints.length > 0 && (
            <div className={styles["puzzle-actions"]}>
              <button
                type="button"
                className={styles["puzzle-button"]}
                onClick={showNextHint}
                disabled={hintIndex >= puzzle.hints.length - 1}
              >
                {hintIndex < 0
                  ? "Need a hint?"
                  : hintIndex < puzzle.hints.length - 1
                    ? `Show Hint ${hintIndex + 2}`
                    : "All hints shown"}
              </button>

              {hintIndex >= 0 && (
                <div className={styles["puzzle-hints"]}>
                  {puzzle.hints.slice(0, hintIndex + 1).map((hint, hintPosition) => (
                    <div className={styles["puzzle-hint"]} key={`${hintPosition}-${hint.label}`}>
                      <span>{hint.label}</span>
                      <p>{hint.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {puzzle.reveal && (
            <div className={styles["puzzle-answer"]}>
              <button
                type="button"
                className={`${styles["puzzle-button"]} ${styles["puzzle-button-secondary"]}`}
                onClick={() => setShowReveal((visible) => !visible)}
              >
                {showReveal ? "Hide the idea" : "Show the idea"}
              </button>

              {showReveal && (
                <div className={styles["puzzle-reveal"]}>
                  <span>What this shows</span>
                  <p>{puzzle.reveal}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {puzzle.image && (
          <figure className={styles["puzzle-image"]}>
            {/* eslint-disable-next-line @next/next/no-img-element -- plain <img>: public/ assets with no fixed dimensions */}
            <img src={puzzle.image.src} alt={puzzle.image.alt} />
          </figure>
        )}
      </div>
    </article>
  );
}
