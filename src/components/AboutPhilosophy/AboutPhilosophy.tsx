"use client";

import React from "react";
import Link from "next/link";
import styles from "./AboutPhilosophy.module.scss";

export default function AboutPhilosophy() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.titleCol}>
          <h2 className={styles.heading}>
            Small steps.
            <br />
            Big changes.
          </h2>
        </div>

        <div className={styles.textCol}>
          <p>
            Mind Detoxx is not about fitness trends or pushing your body to exhaustion.
            It&apos;s about slowing down, tuning into your breath, and cultivating deep,
            sustainable inner peace in an increasingly noisy world.
          </p>
          <p>
            Whether you are stepping onto a yoga mat for the first time or returning after
            years, our mindful classes and experienced instructors create a safe, welcoming
            container for your personal journey.
          </p>
          <Link href="/about-us" className={styles.storyLink}>
            Read our story &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
