import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./AboutPhilosophy.module.scss";
import { ABOUT } from "@/data/client/about";

const philosophy = ABOUT.homePhilosophy;

export default function AboutPhilosophy() {
  return (
    <section id="about" className={styles.section} aria-label="About Mind Detoxx Philosophy">
      <Container fluid="lg" className="px-0">
        <Row className="g-4 g-lg-5 align-items-center">
          <Col lg={5} className={styles.titleCol}>
            <div className={styles.titleContent}>
              <span className={styles.eyebrow}>{philosophy.eyebrow}</span>
              <h2 className={styles.heading}>
                {philosophy.headingLine1}
                <br />
                {philosophy.headingLine2}
              </h2>
            </div>
          </Col>

          <Col lg={7} className={styles.textCol}>
            <div className={styles.glassCard}>
              {philosophy.paragraphs.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
              <Link href={philosophy.linkHref} className={styles.storyLink}>
                <span>{philosophy.linkText}</span>
                <span className={styles.linkArrow} aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
