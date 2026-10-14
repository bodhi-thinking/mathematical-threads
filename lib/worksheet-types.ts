/**
 * Worksheet contract.
 *
 * A journey's worksheet.ts exports one `Worksheet`. The shared <WorksheetView />
 * renders it as a printable A4-landscape sheet, one printed page per entry in
 * `pages`. The clue lives here too, so a journey's worksheet and clue stay
 * together and the shared <ClueCard /> never needs editing.
 */

/* ---------- Code key (how numeric answers become the secret) ---------- */

export type CodeRule = {
  /** Inclusive range of numeric answers this rule decodes. */
  from: number;
  to: number;
  /** "letter": from→A, from+1→B …   "digit": from→0, from+1→1 … */
  kind: "letter" | "digit";
};

export type CodeKey = {
  rules: CodeRule[];
};

/* ---------- Challenges ---------- */

export type ConvertChallenge = {
  id: string;
  type: "convert";
  /** The numeral as written, e.g. "10000". */
  digits: string;
  /** Base the numeral is written in (rendered as a subscript). */
  base: number;
  /** The decimal answer. Cross-checked against digits/base at build time. */
  answer: number;
};

export type FreeChallenge = {
  id: string;
  type: "free";
  prompt: string;
  /** Numeric answer used to decode the clue. */
  answer: number;
};

export type WorksheetChallenge = ConvertChallenge | FreeChallenge;

/* ---------- Pages ---------- */

export type ChallengesPage = {
  kind: "challenges";
  title: string;
  intro: string;
  codeKey: CodeKey;
  challenges: WorksheetChallenge[];
  /** Instruction printed under "THE SECRET". */
  secretPrompt: string;
};

export type LabField = {
  /** Small caps label, e.g. "My base". */
  label: string;
  prompt: string;
};

export type LabPage = {
  kind: "lab";
  title: string;
  intro: string;
  /** Short fill-in fields shown in a band above the board. */
  fields: LabField[];
  board: {
    title: string;
    /** One drawing column per entry. */
    columns: string[];
  };
  write: {
    title: string;
    prompt: string;
  };
  /** Closing reflection line printed at the foot of the page. */
  reflection: string;
};

export type WorksheetPage = ChallengesPage | LabPage;

/* ---------- Clue ---------- */

export type Clue = {
  /** 1 → "01". */
  number: number;
  /** Small label above the card title, e.g. "Lilavati’s Clue Trail · Clue 01". */
  kicker: string;
  title: string;
  description: string;
  reminder: string;
  /** Caption under the large number, e.g. "First clue". */
  caption: string;
  /**
   * The decoded secret. Used only to validate the worksheet at build time and
   * to draw the right number of blanks. It is never rendered.
   */
  secret: string;
};

export type Worksheet = {
  /** Running header/footer, e.g. "MATHEMATICAL THREADS | NUMBER SYSTEMS". */
  runningTitle: string;
  pages: WorksheetPage[];
  clue: Clue;
};
