import { decodeAnswer, derivedAnswer, getChallengesPage } from "./clue";
import type { Journey } from "./course-types";
import { SUPPORTED_PLAYGROUND_KINDS } from "./playground-types";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ValidateOptions = {
  /**
   * Given a public URL path such as "/course/001-counting/assets/x.png",
   * return whether the file exists. Omit to skip the asset check.
   */
  assetExists?: (publicPath: string) => boolean;
};

function duplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) dupes.add(value);
    seen.add(value);
  }
  return [...dupes];
}

/** Returns a list of human-readable problems. Empty means the journey is well-formed. */
export function validateJourney(journey: Journey, options: ValidateOptions = {}): string[] {
  const problems: string[] = [];
  const id = journey.meta?.id ?? "(missing id)";
  const where = (part: string) => `[${id}] ${part}`;
  const checkAsset = (src: string, part: string) => {
    if (!src.startsWith("/")) {
      problems.push(where(`${part}: image path "${src}" must start with "/" (served from public/).`));
    } else if (options.assetExists && !options.assetExists(src)) {
      problems.push(where(`${part}: image file not found in public/ → ${src}`));
    }
  };

  /* ----- meta ----- */
  if (!journey.meta?.id || !SLUG.test(journey.meta.id)) {
    problems.push(where("meta.id must be a lowercase slug such as \"001-counting\"."));
  }
  if (!journey.meta?.title?.trim()) problems.push(where("meta.title is empty."));

  /* ----- story ----- */
  const beats = journey.story?.beats ?? [];
  if (!journey.story?.title?.trim()) problems.push(where("story.title is empty."));
  if (beats.length === 0) problems.push(where("story has no beats."));
  for (const dupe of duplicates(beats.map((beat) => beat.id))) {
    problems.push(where(`story: duplicate beat id "${dupe}".`));
  }
  beats.forEach((beat, beatIndex) => {
    const label = `story beat ${beatIndex + 1} ("${beat.id}")`;
    if (!beat.blocks || beat.blocks.length === 0) {
      problems.push(where(`${label} has no blocks.`));
      return;
    }
    beat.blocks.forEach((block, blockIndex) => {
      const blockLabel = `${label}, block ${blockIndex + 1}`;
      if (block.type === "image") {
        if (!block.alt?.trim()) problems.push(where(`${blockLabel}: image is missing alt text.`));
        checkAsset(block.src, blockLabel);
      } else if (block.type === "list") {
        if (!Array.isArray(block.items) || block.items.length === 0) {
          problems.push(where(`${blockLabel}: list has no items.`));
        }
      } else if (!block.text?.trim()) {
        problems.push(where(`${blockLabel}: ${block.type} block has empty text.`));
      }
    });
  });

  /* ----- playground ----- */
  const playground = journey.playground;
  if (!playground?.id || !playground?.title?.trim()) {
    problems.push(where("playground needs an id and a title."));
  }
  const kind = playground?.kind ?? "place-value";
  if (!SUPPORTED_PLAYGROUND_KINDS.includes(kind)) {
    problems.push(where(`playground.kind "${kind}" is not supported.`));
  }

  /* ----- puzzles ----- */
  const puzzles = journey.puzzles?.puzzles ?? [];
  for (const dupe of duplicates(puzzles.map((puzzle) => puzzle.id))) {
    problems.push(where(`puzzles: duplicate puzzle id "${dupe}".`));
  }
  puzzles.forEach((puzzle, index) => {
    const label = `puzzle ${index + 1} ("${puzzle.id}")`;
    if (!puzzle.title?.trim() || !puzzle.prompt?.trim()) {
      problems.push(where(`${label} needs a title and a prompt.`));
    }
    if (puzzle.answer && (!puzzle.answer.accepted || puzzle.answer.accepted.length === 0)) {
      problems.push(where(`${label}: answer.accepted is empty, so it can never be marked correct.`));
    }
    if (puzzle.answer?.accepted?.some((value) => !value.trim())) {
      problems.push(where(`${label}: answer.accepted contains an empty string.`));
    }
    const hintDupes = duplicates((puzzle.hints ?? []).map((hint) => hint.label));
    if (hintDupes.length > 0) {
      problems.push(where(`${label}: duplicate hint labels (${hintDupes.join(", ")}).`));
    }
    if (puzzle.image) {
      if (!puzzle.image.alt?.trim()) problems.push(where(`${label}: image is missing alt text.`));
      checkAsset(puzzle.image.src, label);
    }
  });

  /* ----- worksheet (optional) ----- */
  const worksheet = journey.worksheet;
  if (worksheet) {
    if (!worksheet.pages || worksheet.pages.length === 0) {
      problems.push(where("worksheet has no pages."));
    }

    const challengesPage = getChallengesPage(worksheet);
    if (!challengesPage) {
      problems.push(where("worksheet needs one page of kind \"challenges\" to carry the clue."));
    } else {
      const challenges = challengesPage.challenges ?? [];
      for (const dupe of duplicates(challenges.map((challenge) => challenge.id))) {
        problems.push(where(`worksheet: duplicate challenge id "${dupe}".`));
      }

      let decoded = "";
      challenges.forEach((challenge, index) => {
        const label = `worksheet challenge ${index + 1} ("${challenge.id}")`;
        const derived = derivedAnswer(challenge);

        if (challenge.type === "convert" && derived === undefined) {
          problems.push(
            where(`${label}: "${challenge.digits}" is not a valid base-${challenge.base} numeral.`),
          );
        } else if (derived !== undefined && derived !== challenge.answer) {
          problems.push(
            where(`${label}: stored answer ${challenge.answer} but the numeral works out to ${derived}.`),
          );
        }

        const letter = decodeAnswer(challenge.answer, challengesPage.codeKey);
        if (letter === undefined) {
          problems.push(where(`${label}: answer ${challenge.answer} is outside the code key.`));
        } else {
          decoded += letter;
        }
      });

      if (decoded !== worksheet.clue?.secret) {
        problems.push(
          where(`worksheet answers decode to "${decoded}" but clue.secret is "${worksheet.clue?.secret}".`),
        );
      }
    }

    worksheet.pages?.forEach((page, index) => {
      if (!page.title?.trim()) problems.push(where(`worksheet page ${index + 1} has no title.`));
      if (page.kind === "lab" && (!page.board?.columns || page.board.columns.length === 0)) {
        problems.push(where(`worksheet page ${index + 1}: lab board needs at least one column.`));
      }
    });

    if (!worksheet.clue?.secret) problems.push(where("worksheet.clue.secret is empty."));
  }

  return problems;
}
