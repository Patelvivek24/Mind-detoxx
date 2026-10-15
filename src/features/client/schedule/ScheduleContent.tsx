import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PricingCard from "@/components/client/ui/PricingCard/PricingCard";
import { SCHEDULE_PLANS } from "@/data/client/pricing";
import { SCHEDULE } from "@/data/client/schedule";
import WeekdayHighlights from "./WeekdayHighlights";
import WeeklyTimetable from "./WeeklyTimetable";
import styles from "./Schedule.module.scss";

const { page, packages } = SCHEDULE;

/** Schedule page body. Server Component; only the weekday highlight tabs hydrate. */
export default function ScheduleContent() {
  return (
    <div className={styles.pageWrapper}>
      {/* ───────── Section 1: Hero & Highlights ───────── */}
      <section className={styles.heroSection} data-shape="0">
        <Container className={styles.container}>
          <span className={styles.eyebrow}>{page.eyebrow}</span>

          <h1 className={styles.headline}>
            {page.headlineLine1}
            <br />
            {page.headlineLine2}
          </h1>

          <p className={styles.introParagraph}>{page.intro}</p>

          <WeekdayHighlights data={SCHEDULE.weekdayHighlights} />
          <WeeklyTimetable />
        </Container>
      </section>

      {/* ───────── Section 2: Membership Plans ───────── */}
      <section className={styles.pricingSection} data-shape="1">
        <Container className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeading}>{packages.heading}</h2>
            <p className={styles.sectionSubtitle}>{packages.subtitle}</p>
          </div>

          <Row className="g-4 align-items-stretch">
            {SCHEDULE_PLANS.map((plan) => (
              <Col key={plan.id} xs={12} lg={4}>
                <PricingCard plan={plan} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}
