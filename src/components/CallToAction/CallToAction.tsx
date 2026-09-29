"use client";

import React from "react";
import Link from "next/link";
import styles from "./CallToAction.module.scss";

export default function CallToAction() {
  return (
    <section id="contact" className={styles.section}>
      <h2 className={styles.heading}>
        Transform your mind.
        <br />
        Transform your life.
      </h2>
      <p className={styles.subtitle}>
        Reach us on WhatsApp or call to book your first trial session today.
      </p>
      <div className={styles.buttonGroup}>
        <a
          href="https://wa.me/919998012345"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBtn}
        >
          Message +91 99980 12345
        </a>
        <Link href="/schedule" className={styles.scheduleBtn}>
          View Schedule
        </Link>
      </div>
    </section>
  );
}
