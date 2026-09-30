import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./WeekendRent.module.scss";
import { HOME_WEEKEND_RENT_DATA } from "@/data/studio-rental";

export default function WeekendRent() {
  return (
    <section id="weekend-rent" className={styles.section} aria-label="Studio on Rent on Weekends">
      <Container fluid="lg" className="px-0">
        <div className={styles.bannerCard}>
          <Row className="w-100 g-4 align-items-center justify-content-between m-0">
            <Col lg={8} className="p-0">
              <div className={styles.leftContent}>
                <span className={styles.kicker}>{HOME_WEEKEND_RENT_DATA.kicker}</span>
                <h2 className={styles.title}>{HOME_WEEKEND_RENT_DATA.title}</h2>
                <p className={styles.description}>
                  {HOME_WEEKEND_RENT_DATA.description}
                </p>
              </div>
            </Col>

            <Col lg={4} className="p-0">
              <div className={styles.rightContent}>
                <div className={styles.price}>{HOME_WEEKEND_RENT_DATA.price}</div>
                <span className={styles.period}>{HOME_WEEKEND_RENT_DATA.period}</span>
                <Link href={HOME_WEEKEND_RENT_DATA.buttonHref} className={styles.bookBtn}>
                  {HOME_WEEKEND_RENT_DATA.buttonText}
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}
