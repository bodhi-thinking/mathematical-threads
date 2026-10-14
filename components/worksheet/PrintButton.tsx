"use client";

import styles from "./WorksheetView.module.css";

export function PrintButton() {
  return (
    <button type="button" className={styles["print-button"]} onClick={() => window.print()}>
      Print worksheet
    </button>
  );
}
