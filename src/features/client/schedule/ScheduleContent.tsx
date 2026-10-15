import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PricingCard from "@/components/client/ui/PricingCard/PricingCard";
import { SCHEDULE_PACKAGE_PLANS } from "@/data/client/pricing";
import WeekdayHighlights from "./WeekdayHighlights";
import WeeklyTimetable from "./WeeklyTimetable";
import styles from "./Schedule.module.scss";

/** Schedule page body. Server Component; only the weekday highlight tabs hydrate. */
export default function ScheduleContent() {
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

          <WeekdayHighlights />
          <WeeklyTimetable />
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
