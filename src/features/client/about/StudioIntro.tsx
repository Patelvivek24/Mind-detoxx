import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ABOUT } from "@/data/client/about";
import { CONTACT } from "@/data/client/contact";

const studio = ABOUT.studio;
import styles from "./AboutUs.module.scss";

/** Section 2: the studio photo, description, address and directions (Shape 1 · Wave). */
export default function StudioIntro() {
  return (
    <section className={styles.studioSection} data-shape="1">
      <Container className={styles.container}>
        <Row className="g-4 g-lg-5 align-items-center">
          <Col xs={12} lg={6}>
            <div className={styles.studioPhotoBox}>
              <span className={styles.photoLabel}>{studio.photoLabel}</span>
            </div>
          </Col>

          <Col xs={12} lg={6}>
            <div className={styles.studioContent}>
              <h2 className={styles.studioHeading}>{studio.heading}</h2>
              <p className={styles.studioDescription}>{studio.description}</p>

              <div className={styles.studioAddress}>
                {CONTACT.address.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <a
                href={CONTACT.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directionsLink}
              >
                {studio.directionsLabel}
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
