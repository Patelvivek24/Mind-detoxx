"use client";

import React from "react";
import styles from "./MantraTicker.module.scss";

export default function MantraTicker() {
  const mantras = ["BREATHE", "MOVE", "HEAL", "GROW", "REPEAT"];

  return (
    <div className={styles.tickerSection} aria-label="Mind Detoxx Core Mantras">
      <div className={styles.mantraContainer}>
        {mantras.map((word) => (
          <span key={word} className={styles.mantraWord}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
