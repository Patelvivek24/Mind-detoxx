import React from "react";
import styles from "./MantraTicker.module.scss";

const MANTRAS = ["BREATHE", "MOVE", "HEAL", "GROW", "REPEAT"] as const;

export default function MantraTicker() {
  return (
    <div className={styles.tickerSection} aria-label="Mind Detoxx Core Mantras">
      <div className={styles.mantraContainer}>
        {MANTRAS.map((word) => (
          <span key={word} className={styles.mantraWord}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
