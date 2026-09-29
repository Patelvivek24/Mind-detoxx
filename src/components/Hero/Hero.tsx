"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section id="home" className={styles.heroSection}>
      <div className={styles.visualWrapper}>
        <div className={styles.brandHeader}>
          <Image
            src="/images/logo.png"
            alt="Mind Detoxx Emblem"
            width={58}
            height={58}
            className={styles.heroLogoBadge}
            priority
          />
          <span className={styles.brandTitle}>MIND DETOXX</span>
          <span className={styles.brandTagline}>Detox the mind, elevate the soul.</span>
        </div>
      </div>

      {/* Open 3D Stage spacer where 3D particle torus breathes */}
      <div className={styles.particleStageSpacer} aria-hidden="true" />

      {/* Headline & CTAs */}
      <div className={styles.contentWrapper}>
        <span className={styles.kicker}>YOGA &bull; BREATHWORK &bull; RETREATS</span>
        <h1 className={styles.mainHeading}>
          Detox the mind,
          <br />
          in motion
        </h1>
        <p className={styles.description}>
          A calm space to slow down, unclutter your thoughts and come back to yourself —
          one breath at a time. A yoga &amp; wellness studio on VIP Road, Surat.
        </p>
        <div className={styles.ctaGroup}>
          <Link href="#contact" className={styles.primaryBtn}>
            Book a Class
          </Link>
          <Link href="#schedule" className={styles.secondaryBtn}>
            See Schedule
          </Link>
        </div>
      </div>
    </section>
  );
}
