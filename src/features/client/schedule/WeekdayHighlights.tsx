"use client";

import React, { useState } from "react";
import type { ScheduleData } from "@/types/content";
import styles from "./Schedule.module.scss";

interface WeekdayHighlightsProps {
  data: ScheduleData["weekdayHighlights"];
}

/** Weekday quick-highlight strip; one tab is active at a time. */
export default function WeekdayHighlights({ data }: WeekdayHighlightsProps) {
  const { defaultDay, items } = data;
  const [activeHighlightDay, setActiveHighlightDay] = useState<string>(defaultDay);

  return (
    <div className={styles.highlightsStrip}>
      {items.map((item) => (
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
