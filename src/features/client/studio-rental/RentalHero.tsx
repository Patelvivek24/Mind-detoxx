"use client";

import React from "react";
import Container from "react-bootstrap/Container";
import type { StudioRentalData } from "@/types/content";
import { scrollToBooking } from "./scrollToBooking";
import styles from "./StudioRental.module.scss";

interface RentalHeroProps {
  hero: StudioRentalData["hero"];
}

/** Section 1: headline, hourly price callout and the aura artwork. */
export default function RentalHero({ hero }: RentalHeroProps) {
  return (
    <section className={styles.heroSection}>
      <Container className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <span className={styles.eyebrow}>{hero.eyebrow}</span>
            <h1 className={styles.headline}>
              {hero.headline}{" "}
              <span className={styles.goldText}>{hero.headlineAccent}</span>
            </h1>
            <p className={styles.introParagraph}>{hero.intro}</p>

            <div className={styles.pricingActionBlock}>
              <div className={styles.priceCallout}>
                <span className={styles.priceAmount}>{hero.price}</span>
                <span className={styles.priceUnit}>{hero.priceUnit}</span>
              </div>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={scrollToBooking}
              >
                {hero.buttonLabel}
              </button>
            </div>
          </div>

          {/* Glowing Cosmic Aura Art */}
          <div className={styles.heroRight}>
            <div className={styles.auraArtBox}>
              <div className={styles.auraGlowSphere} />
              <div className={styles.auraRing} />
              <div className={styles.auraTextTag}>
                <span>{hero.auraTag}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
