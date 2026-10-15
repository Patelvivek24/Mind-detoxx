import React from "react";
import Container from "react-bootstrap/Container";
import SectionTitle from "@/components/client/ui/SectionTitle/SectionTitle";
import { STUDIO_WHATSAPP } from "@/data/client/contact";
import { whatsappUrl } from "@/lib/whatsapp";
import PracticesCatalog from "./PracticesCatalog";
import styles from "./Activities.module.scss";

const GUIDANCE_URL = whatsappUrl(
  STUDIO_WHATSAPP,
  "Hi Mind Detoxx, I am not sure which activity to choose for my week. Could you guide me?"
);

/** Activities page body. Server Component; only the filterable catalogue hydrates. */
export default function ActivitiesContent() {
  return (
    <div className={styles.pageContent}>
      {/* ───────── Hero Header Section (Shape 0 · Torus) ───────── */}
      <section className={styles.heroSection} data-shape="0">
        <Container className={styles.container}>
          <SectionTitle
            as="h1"
            eyebrow="TWELVE PRACTICES"
            title="Pick the one that matches what you"
            titleLine2="are carrying."
            subtitle="Everything here runs as a drop-in class and as a guided course that lets you start wherever you are. Tell us on WhatsApp and we will put you down where it's quiet."
          />

          <PracticesCatalog />

          {/* ───────── Not sure which one? CTA Banner ───────── */}
          <div className={styles.ctaBanner}>
            <div className={styles.ctaText}>
              <h2 className={styles.ctaTitle}>Not sure which one?</h2>
              <p className={styles.ctaSubtitle}>
                Send us a message describing your week. We will suggest one class and one batch time,
                and you can change it after the first session.
              </p>
            </div>
            <a
              href={GUIDANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              Ask on WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
