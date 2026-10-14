import Link from "next/link";
import type { Clue } from "../../lib/worksheet-types";
import styles from "./ClueCard.module.css";

type ClueCardProps = {
  /** Used to build the worksheet link, e.g. "001-counting". */
  journeyId: string;
  clue: Clue;
};

/**
 * Invitation to a journey's worksheet. All copy comes from the journey's
 * worksheet.ts (`clue`), so new journeys never need to edit this component.
 * The secret itself is never shown here — only how many characters it has.
 */
export function ClueCard({ journeyId, clue }: ClueCardProps) {
  const worksheetHref = `/lesson/${journeyId}/worksheet`;
  const number = String(clue.number).padStart(2, "0");
  const blanks = Array.from({ length: clue.secret.length }, () => "—").join(" ");

  return (
    <section className={styles["clue-card"]} aria-labelledby="clue-card-title">
      <div className={styles["clue-card-copy"]}>
        <p className={styles["clue-card-kicker"]}>{clue.kicker}</p>

        <h2 id="clue-card-title">{clue.title}</h2>

        <p>{clue.description}</p>

        <p className={styles["clue-card-reminder"]}>{clue.reminder}</p>

        <div className={styles["clue-card-actions"]}>
          <Link className={styles["clue-card-button"]} href={worksheetHref}>
            Open the worksheet <span aria-hidden="true">→</span>
          </Link>

          <Link className={styles["clue-card-print-link"]} href={`${worksheetHref}#print`}>
            Open a print-ready copy
          </Link>
        </div>
      </div>

      <div className={styles["clue-card-number"]} aria-hidden="true">
        <span>{number}</span>
        <small>{clue.caption}</small>
        <span className={styles["clue-card-dashes"]}>{blanks}</span>
      </div>
    </section>
  );
}
