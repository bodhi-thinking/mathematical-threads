import type {
  ChallengesPage,
  CodeKey,
  CodeRule,
  Worksheet,
  WorksheetChallenge,
} from "./worksheet-types";

function ruleFor(answer: number, key: CodeKey): CodeRule | undefined {
  return key.rules.find((rule) => answer >= rule.from && answer <= rule.to);
}

/** Decode one numeric answer, or return undefined if the key does not cover it. */
export function decodeAnswer(answer: number, key: CodeKey): string | undefined {
  if (!Number.isInteger(answer)) return undefined;
  const rule = ruleFor(answer, key);
  if (!rule) return undefined;

  const offset = answer - rule.from;
  return rule.kind === "letter" ? String.fromCharCode(65 + offset) : String(offset);
}

/** Human-readable lines for the printed code key, generated from the rules. */
export function describeCodeKey(key: CodeKey): string[] {
  return key.rules.map((rule) => {
    const span = rule.to - rule.from;
    const target =
      rule.kind === "letter"
        ? `A–${String.fromCharCode(65 + span)}`
        : `digits 0–${span}`;
    return `${rule.from}–${rule.to} decode to ${target}`;
  });
}

/** The numeric value a challenge expects, derived where possible. */
export function derivedAnswer(challenge: WorksheetChallenge): number | undefined {
  if (challenge.type === "free") return challenge.answer;

  const { digits, base } = challenge;
  if (!Number.isInteger(base) || base < 2 || base > 36) return undefined;

  const valid = new RegExp(`^[${"0123456789abcdefghijklmnopqrstuvwxyz".slice(0, base)}]+$`, "i");
  if (!valid.test(digits)) return undefined;

  return Number.parseInt(digits, base);
}

export function getChallengesPage(worksheet: Worksheet): ChallengesPage | undefined {
  return worksheet.pages.find(
    (page): page is ChallengesPage => page.kind === "challenges",
  );
}

/** Decode every challenge in order using the worksheet's own code key. */
export function decodeWorksheet(worksheet: Worksheet): string | undefined {
  const page = getChallengesPage(worksheet);
  if (!page) return undefined;

  let secret = "";
  for (const challenge of page.challenges) {
    const decoded = decodeAnswer(challenge.answer, page.codeKey);
    if (decoded === undefined) return undefined;
    secret += decoded;
  }
  return secret;
}
