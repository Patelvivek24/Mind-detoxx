"use client";

import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.colBrand}>
          <span className={styles.brandName}>MIND DETOXX</span>
          <address className={styles.address}>
            207, 2nd Floor, International Business Center
            <br />
            VIP Road, Surat — 395007
          </address>
        </div>

        <div className={styles.colLinks}>
          <Link href="/about-us">About us</Link>
          <Link href="/activities">Activities</Link>
          <Link href="/schedule">Schedule &amp; membership</Link>
          <Link href="/retreats">Retreats &amp; workshops</Link>
          <Link href="/#weekend-rent">Studio on rent</Link>
        </div>

        <div className={styles.colContact}>
          <a href="tel:+919979061803" className={styles.contactItem}>
            +91 99790 61803
          </a>
          <a
            href="https://instagram.com/mind.detoxx.surat"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            @mind.detoxx.surat
          </a>
          <div className={styles.slogan}>FREE THE MIND. ELEVATE THE SOUL.</div>
        </div>
      </div>
    </footer>
  );
}
