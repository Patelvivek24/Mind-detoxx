import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Activities.module.scss";
import { HOME_ACTIVITIES } from "@/data/activities";
import HomeActivityCard from "@/components/common/HomeActivityCard/HomeActivityCard";

export default function Activities() {
  return (
    <section id="activities" className={styles.section} aria-label="Our Practices">
      <Container fluid="lg" className="px-0">
        <div className={styles.header}>
          <h2 className={styles.heading}>What we practise</h2>
          <Link href="/activities" className={styles.viewAllLink}>
            View All Activities &rarr;
          </Link>
        </div>

        <Row className="g-4">
          {HOME_ACTIVITIES.map((act) => (
            <Col key={act.title} xs={12} md={6} lg={4}>
              <HomeActivityCard activity={act} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
