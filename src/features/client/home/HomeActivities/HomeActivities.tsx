import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./HomeActivities.module.scss";
import { ACTIVITIES } from "@/data/client/activities";
import HomeActivityCard from "@/components/client/ui/HomeActivityCard/HomeActivityCard";

export default function HomeActivities() {
  return (
    <section id="activities" className={styles.section} aria-label="Our Practices">
      <Container fluid="lg" className="px-0">
        <div className={styles.header}>
          <h2 className={styles.heading}>{ACTIVITIES.homeSection.heading}</h2>
          <Link href={ACTIVITIES.homeSection.viewAllHref} className={styles.viewAllLink}>
            {ACTIVITIES.homeSection.viewAllLabel}
          </Link>
        </div>

        <Row className="g-4">
          {ACTIVITIES.homeHighlights.map((act) => (
            <Col key={act.id} xs={12} md={6} lg={4}>
              <HomeActivityCard activity={act} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
