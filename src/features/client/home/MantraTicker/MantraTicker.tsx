import React from "react";
import styles from "./MantraTicker.module.scss";
import { HOME } from "@/data/client/home";

export default function MantraTicker() {
  return (
    <div className={styles.tickerSection} aria-label="Mind Detoxx Core Mantras">
      <div className={styles.mantraContainer}>
        {HOME.mantras.map((word) => (
          <span key={word} className={styles.mantraWord}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
