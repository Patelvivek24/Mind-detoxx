import React from "react";
import { SCHEDULE_TABLE_DATA } from "@/data/client/schedule";
import styles from "./Schedule.module.scss";

/** Full Monday–Saturday master timetable. */
export default function WeeklyTimetable() {
  return (
    <div className={styles.tableCard}>
      <div className={styles.tableHeaderBar}>
        <h2 className={styles.tableTitle}>Master Weekly Timetable</h2>
        <span className={styles.tableBadge}>MON – SAT SCHEDULE</span>
      </div>

      <div className={styles.tableResponsiveWrapper}>
        <table className={styles.scheduleTable}>
          <thead>
            <tr>
              <th>TIME / BATCH</th>
              <th>MON</th>
              <th>TUE</th>
              <th>WED</th>
              <th>THU</th>
              <th>FRI</th>
              <th>SAT</th>
            </tr>
          </thead>
          <tbody>
            {SCHEDULE_TABLE_DATA.map((row) => (
              <tr key={row.time}>
                <td className={styles.timeCell}>{row.time}</td>
                <td>{row.mon}</td>
                <td>{row.tue}</td>
                <td>{row.wed}</td>
                <td>{row.thu}</td>
                <td>{row.fri}</td>
                <td>{row.sat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
