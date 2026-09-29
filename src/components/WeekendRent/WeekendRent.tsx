"use client";

import React from "react";
import Link from "next/link";
import styles from "./WeekendRent.module.scss";

export default function WeekendRent() {
  return (
    <section id="weekend-rent" className={styles.section}>
      <div className={styles.bannerCard}>
        <div className={styles.leftContent}>
          <span className={styles.kicker}>OUR SPACE IS ALSO YOURS</span>
          <h2 className={styles.title}>Rent the space on weekends</h2>
          <p className={styles.description}>
            A peaceful venue for retreats, workshops, sound baths and private wellness events.
            The full studio and sound system is at your disposal.
          </p>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.price}>₹1,500</div>
          <span className={styles.period}>PER HOUR, MIN 4 HOURS</span>
          <Link href="#contact" className={styles.bookBtn}>
            Book weekend rent
          </Link>
        </div>
      </div>
    </section>
  );
}
