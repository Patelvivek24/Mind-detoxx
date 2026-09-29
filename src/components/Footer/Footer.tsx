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
            102, 2nd Floor, Ambience Business Center,
            <br />
            VIP Road, Surat, Gujarat 395007
          </address>
        </div>

        <div className={styles.colLinks}>
          <Link href="#about">About us</Link>
          <Link href="#activities">Activities</Link>
          <Link href="#weekend-rent">Weekend studio rent</Link>
          <Link href="#policies">Studio policies</Link>
        </div>

        <div className={styles.colContact}>
          <a href="tel:+919998012345" className={styles.contactItem}>
            +91 99980 12345
          </a>
          <a href="mailto:info@minddetoxx.com" className={styles.contactItem}>
            info@minddetoxx.com
          </a>
          <div className={styles.slogan}>FREE THE MIND · ELEVATE THE SOUL</div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>© {new Date().getFullYear()} Mind Detoxx, Surat. All rights reserved.</span>
        <span>VIP Road · Surat, Gujarat</span>
      </div>
    </footer>
  );
}
