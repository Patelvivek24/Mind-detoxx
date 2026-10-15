import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import styles from "./CallToAction.module.scss";
import { HOME_CTA_DATA } from "@/data/cta";

export default function CallToAction() {
  return (
    <section id="contact" className={styles.section} aria-label="Call to Action">
      <Container fluid="md">
        <h2 className={styles.heading}>
          {HOME_CTA_DATA.headingLine1}
          <br />
          {HOME_CTA_DATA.headingLine2}
        </h2>
        <p className={styles.subtitle}>{HOME_CTA_DATA.subtitle}</p>
        <div className={styles.buttonGroup}>
          <a
            href={HOME_CTA_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            {HOME_CTA_DATA.whatsappDisplay}
          </a>
          <Link href={HOME_CTA_DATA.scheduleHref} className={styles.scheduleBtn}>
            {HOME_CTA_DATA.scheduleText}
          </Link>
        </div>
      </Container>
    </section>
  );
}
