"use client";

import React, { useState } from "react";
import { WEEKDAY_HIGHLIGHTS } from "@/data/client/schedule";
import styles from "./Schedule.module.scss";

/** Weekday quick-highlight strip; one tab is active at a time. */
export default function WeekdayHighlights() {
  const [activeHighlightDay, setActiveHighlightDay] = useState<string>("MONDAY");

  return (
    <div className={styles.highlightsStrip}>
      {WEEKDAY_HIGHLIGHTS.map((item) => (
        <button
          key={item.day}
          type="button"
          className={`${styles.highlightTab} ${
            activeHighlightDay === item.day ? styles.highlightTabActive : ""
          }`}
          onClick={() => setActiveHighlightDay(item.day)}
        >
          <span className={styles.tabDay}>{item.day}</span>
          <span className={styles.tabTitle}>{item.title}</span>
          <span className={styles.tabDesc}>{item.description}</span>
        </button>
      ))}
    </div>
  );
}
