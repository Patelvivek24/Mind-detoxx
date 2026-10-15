import React from "react";
import Container from "react-bootstrap/Container";
import SectionTitle from "@/components/client/ui/SectionTitle/SectionTitle";
import { ACTIVITIES } from "@/data/client/activities";
import { CONTACT } from "@/data/client/contact";
import { whatsappUrl } from "@/lib/whatsapp";
import PracticesCatalog from "./PracticesCatalog";
import styles from "./Activities.module.scss";

const { page } = ACTIVITIES;
const guidanceUrl = whatsappUrl(CONTACT.whatsapp.primary, page.guidance.whatsappMessage);

/** Activities page body. Server Component; only the filterable catalogue hydrates. */
export default function ActivitiesContent() {
  return (
    <div className={styles.pageContent}>
      {/* ───────── Hero Header Section (Shape 0 · Torus) ───────── */}
      <section className={styles.heroSection} data-shape="0">
        <Container className={styles.container}>
          <SectionTitle
            as="h1"
            eyebrow={page.eyebrow}
            title={page.title}
            titleLine2={page.titleLine2}
            subtitle={page.subtitle}
          />

          <PracticesCatalog
            categories={ACTIVITIES.categories}
            practices={ACTIVITIES.practices}
            whatsappNumber={CONTACT.whatsapp.primary}
          />

          {/* ───────── Not sure which one? CTA Banner ───────── */}
          <div className={styles.ctaBanner}>
            <div className={styles.ctaText}>
              <h2 className={styles.ctaTitle}>{page.guidance.title}</h2>
              <p className={styles.ctaSubtitle}>{page.guidance.text}</p>
            </div>
            <a
              href={guidanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              {page.guidance.buttonLabel}
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
