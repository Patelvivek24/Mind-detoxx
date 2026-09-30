"use client";

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PricingCard from "@/components/common/PricingCard/PricingCard";
import styles from "./Schedule.module.scss";
import {
  SCHEDULE_TABLE_DATA,
  WEEKDAY_HIGHLIGHTS,
} from "@/data/schedule";
import { SCHEDULE_PACKAGE_PLANS } from "@/data/pricing";

export default function ScheduleClient() {
  const [activeHighlightDay, setActiveHighlightDay] = useState<string>("MONDAY");

  return (
    <div className={styles.pageWrapper}>
      {/* ───────── Section 1: Hero & Highlights ───────── */}
      <section className={styles.heroSection} data-shape="0">
        <Container className={styles.container}>
          <span className={styles.eyebrow}>TIMETABLE &amp; PACKAGES</span>

          <h1 className={styles.headline}>
            Four batch times a day.
            <br />
            Pick yours and keep it.
          </h1>

          <p className={styles.introParagraph}>
            Every sequence is taught in three variations at once. You do not wait
            for a new beginner batch to open — pick your hour and begin.
          </p>

          {/* Weekday Quick Highlights Strip */}
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

          {/* ───────── Full Master Timetable Grid ───────── */}
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
        </Container>
      </section>

      {/* ───────── Section 2: Membership Plans ───────── */}
      <section className={styles.pricingSection} data-shape="1">
        <Container className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeading}>Membership &amp; packages</h2>
            <p className={styles.sectionSubtitle}>
              Fair pricing with no hidden charges. All mats, bolsters, and props are
              clean and waiting for you.
            </p>
          </div>

          <Row className="g-4 align-items-stretch">
            {SCHEDULE_PACKAGE_PLANS.map((plan) => (
              <Col key={plan.tier} xs={12} lg={4}>
                <PricingCard plan={plan} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}
