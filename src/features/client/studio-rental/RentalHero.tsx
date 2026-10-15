"use client";

import React from "react";
import Container from "react-bootstrap/Container";
import { scrollToBooking } from "./scrollToBooking";
import styles from "./StudioRental.module.scss";

/** Section 1: headline, hourly price callout and the aura artwork. */
export default function RentalHero() {
  return (
    <section className={styles.heroSection}>
      <Container className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <span className={styles.eyebrow}>STUDIO ON RENT</span>
            <h1 className={styles.headline}>
              Our room. Your practice.{" "}
              <span className={styles.goldText}>Weekends.</span>
            </h1>
            <p className={styles.introParagraph}>
              The studio is vacant on Saturdays and Sundays for yoga teachers,
              workshop leaders, sound healing practitioners, and creative
              movements to gather, host, or practice together.
            </p>

            <div className={styles.pricingActionBlock}>
              <div className={styles.priceCallout}>
                <span className={styles.priceAmount}>₹1,500</span>
                <span className={styles.priceUnit}>
                  / PER HOUR · SATURDAY &amp; SUNDAY
                </span>
              </div>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={scrollToBooking}
              >
                Request date &amp; time
              </button>
            </div>
          </div>

          {/* Glowing Cosmic Aura Art */}
          <div className={styles.heroRight}>
            <div className={styles.auraArtBox}>
              <div className={styles.auraGlowSphere} />
              <div className={styles.auraRing} />
              <div className={styles.auraTextTag}>
                <span>SURAT · VIP ROAD · 2ND FLOOR</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
