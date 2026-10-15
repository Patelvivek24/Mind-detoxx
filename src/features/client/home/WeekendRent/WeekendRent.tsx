import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./WeekendRent.module.scss";
import { STUDIO_RENTAL } from "@/data/client/studio-rental";

const teaser = STUDIO_RENTAL.homeTeaser;

export default function WeekendRent() {
  return (
    <section id="weekend-rent" className={styles.section} aria-label="Studio on Rent on Weekends">
      <Container fluid="lg" className="px-0">
        <div className={styles.bannerCard}>
          <Row className="w-100 g-4 align-items-center justify-content-between m-0">
            <Col lg={8} className="p-0">
              <div className={styles.leftContent}>
                <span className={styles.kicker}>{teaser.kicker}</span>
                <h2 className={styles.title}>{teaser.title}</h2>
                <p className={styles.description}>
                  {teaser.description}
                </p>
              </div>
            </Col>

            <Col lg={4} className="p-0">
              <div className={styles.rightContent}>
                <div className={styles.price}>{teaser.price}</div>
                <span className={styles.period}>{teaser.period}</span>
                <Link href={teaser.buttonHref} className={styles.bookBtn}>
                  {teaser.buttonText}
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}
