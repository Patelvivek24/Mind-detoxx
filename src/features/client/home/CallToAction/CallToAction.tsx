import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import styles from "./CallToAction.module.scss";
import { HOME } from "@/data/client/home";
import { CONTACT } from "@/data/client/contact";
import { whatsappUrl } from "@/lib/whatsapp";

const cta = HOME.callToAction;

export default function CallToAction() {
  return (
    <section id="contact" className={styles.section} aria-label="Call to Action">
      <Container fluid="md">
        <h2 className={styles.heading}>
          {cta.headingLine1}
          <br />
          {cta.headingLine2}
        </h2>
        <p className={styles.subtitle}>{cta.subtitle}</p>
        <div className={styles.buttonGroup}>
          <a
            href={whatsappUrl(CONTACT.whatsapp.primary)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            {`${cta.whatsappLabel} ${CONTACT.phones.primary.display}`}
          </a>
          <Link href={cta.scheduleHref} className={styles.scheduleBtn}>
            {cta.scheduleText}
          </Link>
        </div>
      </Container>
    </section>
  );
}
