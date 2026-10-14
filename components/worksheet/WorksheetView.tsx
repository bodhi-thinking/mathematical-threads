import Link from "next/link";
import { describeCodeKey } from "../../lib/clue";
import type {
  ChallengesPage,
  LabPage,
  Worksheet,
  WorksheetChallenge,
} from "../../lib/worksheet-types";
import { PrintButton } from "./PrintButton";
import styles from "./WorksheetView.module.css";

type WorksheetViewProps = {
  worksheet: Worksheet;
  /** Where the toolbar's back link goes. */
  backHref: string;
  backLabel?: string;
};

function Blank({ wide = false }: { wide?: boolean }) {
  return (
    <span
      className={wide ? `${styles["blank"]} ${styles["blank-wide"]}` : styles["blank"]}
      aria-hidden="true"
    />
  );
}

function ChallengePrompt({ challenge }: { challenge: WorksheetChallenge }) {
  if (challenge.type === "free") return <>{challenge.prompt}</>;

  return (
    <>
      Convert {challenge.digits}
      <sub>{challenge.base}</sub> to base 10.
    </>
  );
}

function ChallengesSheet({ page, secretLength }: { page: ChallengesPage; secretLength: number }) {
  const keyParts = describeCodeKey(page.codeKey);

  return (
    <>
      <h1 className={styles["sheet-title"]}>{page.title}</h1>
      <p className={styles["sheet-intro"]}>{page.intro}</p>

      <div className={styles["code-key"]}>
        {keyParts.map((part, index) => (
          <span key={part}>
            {index === 0 ? <strong>CODE KEY: </strong> : null}
            <strong>{part}</strong>
            {index < keyParts.length - 1 ? <i aria-hidden="true">|</i> : null}
          </span>
        ))}
      </div>

      <ol className={styles["challenge-grid"]}>
        {page.challenges.map((challenge, index) => (
          <li className={styles["challenge"]} key={challenge.id}>
            <span className={styles["challenge-label"]}>CHALLENGE {index + 1}</span>
            <span className={styles["challenge-prompt"]}>
              <ChallengePrompt challenge={challenge} />
            </span>
            <span className={styles["answer-line"]}>
              Answer: <Blank wide />
            </span>
          </li>
        ))}
      </ol>

      <div className={styles["secret"]}>
        <span className={styles["secret-label"]}>THE SECRET:</span>
        <span className={styles["secret-blanks"]} aria-label={`${secretLength} characters`}>
          {Array.from({ length: secretLength }, (_, index) => (
            <span key={index} aria-hidden="true">
              _
            </span>
          ))}
        </span>
      </div>
      <p className={styles["secret-prompt"]}>{page.secretPrompt}</p>
    </>
  );
}

function LabSheet({ page }: { page: LabPage }) {
  return (
    <>
      <h1 className={styles["sheet-title"]}>{page.title}</h1>
      <p className={styles["sheet-intro"]}>{page.intro}</p>

      {page.fields.length > 0 && (
        <div className={styles["lab-fields"]}>
          {page.fields.map((field) => (
            <div className={styles["lab-field"]} key={field.label}>
              <span className={styles["lab-field-label"]}>{field.label.toUpperCase()}</span>
              <span className={styles["answer-line"]}>
                {field.prompt} <Blank wide />
              </span>
            </div>
          ))}
        </div>
      )}

      <h2 className={styles["section-heading"]}>{page.board.title.toUpperCase()}</h2>
      <div
        className={styles["board"]}
        style={{ gridTemplateColumns: `repeat(${page.board.columns.length}, minmax(0, 1fr))` }}
        role="presentation"
      >
        {page.board.columns.map((column, index) => (
          <div className={styles["board-column"]} key={`${index}-${column}`}>
            <div className={styles["board-head"]}>{column.toUpperCase()}</div>
            <div className={styles["board-body"]} />
          </div>
        ))}
      </div>

      <h2 className={styles["section-heading"]}>{page.write.title.toUpperCase()}</h2>
      <div className={styles["write-box"]}>
        <span className={styles["answer-line"]}>
          {page.write.prompt} <Blank wide />
        </span>
      </div>

      <p className={styles["reflection"]}>{page.reflection}</p>
    </>
  );
}

/**
 * Printable worksheet. One printed A4-landscape page per entry in
 * worksheet.pages. The toolbar is hidden when printing.
 */
export function WorksheetView({ worksheet, backHref, backLabel = "← Back to the lesson" }: WorksheetViewProps) {
  const pages = Array.isArray(worksheet?.pages) ? worksheet.pages : [];

  return (
    <div className={styles["worksheet-root"]}>
      <div className={styles["toolbar"]} id="print">
        <Link className={styles["toolbar-link"]} href={backHref}>
          {backLabel}
        </Link>
        <PrintButton />
      </div>

      {pages.map((page, index) => (
        <section
          className={styles["sheet"]}
          key={`${index}-${page.kind}`}
          aria-label={`Worksheet page ${index + 1} of ${pages.length}`}
        >
          <div className={styles["running-head"]}>{worksheet.runningTitle}</div>

          <div className={styles["sheet-body"]}>
            {page.kind === "challenges" ? (
              <ChallengesSheet page={page} secretLength={worksheet.clue.secret.length} />
            ) : (
              <LabSheet page={page} />
            )}
          </div>

          <div className={styles["running-foot"]}>{worksheet.runningTitle}</div>
        </section>
      ))}
    </div>
  );
}
