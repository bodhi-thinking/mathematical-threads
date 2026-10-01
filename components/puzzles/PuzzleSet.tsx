"use client";

import { useState } from "react";
import type { Puzzle } from "../../lib/puzzle-types";

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

export function PuzzleSet({ puzzles }: { puzzles: Puzzle[] }) {
  const [score, setScore] = useState(0);

  return (
    <section className="puzzle-set">
      <div className="eyebrow">Puzzles</div>
      <h2>Now try it yourself.</h2>

      <div className="puzzle-intro">
        <p>
          We are going to travel through time, crack secret codes, outsmart
          ancient kings, and even pilot an alien spacecraft.
        </p>
        <p>
          Math isn't just a list of rules—it's the greatest story ever told by
          humanity. Let's see if you can solve the very same mysteries that
          stumped the greatest minds in history. Grab your pencil, and let's
          jump in!
        </p>
      </div>

      <div className="puzzle-progress" aria-live="polite">
        <span>Your progress</span>
        <strong>
          {score} / {puzzles.length}
        </strong>
      </div>

      <div className="puzzle-list">
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
    <article className="card puzzle">
      <div className="puzzle-number">
        PUZZLE {number} · {puzzle.type.toUpperCase()}
      </div>

      <div className="puzzle-layout">
        <div className="puzzle-content">
          <h2>{puzzle.title}</h2>

          <p className="puzzle-prompt">{puzzle.prompt}</p>

          {puzzle.instructions && (
            <ol className="puzzle-instructions">
              {puzzle.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>
          )}

          {puzzle.answer && (
            <div className="puzzle-challenge">
              <label htmlFor={`answer-${puzzle.id}`}>Your answer</label>
              <div className="puzzle-submit-row">
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
                  className="puzzle-button puzzle-submit-button"
                  onClick={submitAnswer}
                  disabled={!answer.trim() || correct}
                >
                  {correct ? "✓ Correct!" : "Submit answer"}
                </button>
              </div>

              <div
                id={`feedback-${puzzle.id}`}
                className={`puzzle-feedback ${
                  submitted ? (correct ? "is-correct" : "is-try-again") : ""
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
            <div className="puzzle-actions">
              <button
                type="button"
                className="puzzle-button"
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
                <div className="puzzle-hints">
                  {puzzle.hints.slice(0, hintIndex + 1).map((hint) => (
                    <div className="puzzle-hint" key={hint.label}>
                      <span>{hint.label}</span>
                      <p>{hint.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {puzzle.reveal && (
            <div className="puzzle-answer">
              <button
                type="button"
                className="puzzle-button puzzle-button-secondary"
                onClick={() => setShowReveal((visible) => !visible)}
              >
                {showReveal ? "Hide the idea" : "Show the idea"}
              </button>

              {showReveal && (
                <div className="puzzle-reveal">
                  <span>What this shows</span>
                  <p>{puzzle.reveal}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {puzzle.image && (
          <figure className="puzzle-image">
            <img src={puzzle.image.src} alt={puzzle.image.alt} />
          </figure>
        )}
      </div>
    </article>
  );
}
