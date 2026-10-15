import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { STUDIO_INFO } from "@/data/client/about";
import styles from "./AboutUs.module.scss";

/** Section 2: the studio photo, description, address and directions (Shape 1 · Wave). */
export default function StudioIntro() {
  return (
    <section className={styles.studioSection} data-shape="1">
      <Container className={styles.container}>
        <Row className="g-4 g-lg-5 align-items-center">
          <Col xs={12} lg={6}>
            <div className={styles.studioPhotoBox}>
              <span className={styles.photoLabel}>{STUDIO_INFO.photoLabel}</span>
            </div>
          </Col>

          <Col xs={12} lg={6}>
            <div className={styles.studioContent}>
              <h2 className={styles.studioHeading}>{STUDIO_INFO.heading}</h2>
              <p className={styles.studioDescription}>{STUDIO_INFO.description}</p>

              <div className={styles.studioAddress}>
                {STUDIO_INFO.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <a
                href={STUDIO_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directionsLink}
              >
                Get directions
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
