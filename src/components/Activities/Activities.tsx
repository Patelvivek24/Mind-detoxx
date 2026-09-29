"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Activities.module.scss";

interface Activity {
  title: string;
  image: string;
  description: string;
  meta: string;
}

const activities: Activity[] = [
  {
    title: "Yoga",
    image: "/images/yoga.jpg",
    description: "Traditional asana and breathwork for flexibility, strength and inner balance.",
    meta: "MON–FRI · 60 MIN SESSIONS",
  },
  {
    title: "Sound healing",
    image: "/images/sound-healing.jpg",
    description: "Vibrational therapy using Tibetan singing bowls to reduce stress and reset your nervous system.",
    meta: "SPECIAL SESSIONS & WORKSHOPS",
  },
  {
    title: "Aerial yoga",
    image: "/images/aerial-yoga.jpg",
    description: "Decompress the spine and build core strength suspended in soft, supportive aerial silks.",
    meta: "ALL LEVELS · 45 MIN SESSIONS",
  },
  {
    title: "Meditation",
    image: "/images/meditation.jpg",
    description: "Guided practice to quiet the mental chatter, reduce anxiety, and reconnect with your inner stillness.",
    meta: "DAILY · MORNING & EVENING",
  },
  {
    title: "Zumba & belly dance",
    image: "/images/zumba-belly-dance.jpg",
    description: "Joyful, high-energy movement combining aerobic dance with fluid, expressive body isolations.",
    meta: "WEEKLY · HIGH ENERGY",
  },
  {
    title: "Aqua pilates",
    image: "/images/aqua-pilates.jpg",
    description: "Core conditioning and low-impact resistance training performed on floating aquatic mats.",
    meta: "WEEKEND SESSIONS",
  },
];

export default function Activities() {
  return (
    <section id="activities" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>What we practise</h2>
        <Link href="/activities" className={styles.viewAllLink}>
          View All Activities &rarr;
        </Link>
      </div>

      <div className={styles.grid}>
        {activities.map((act) => (
          <Link href="/activities" key={act.title} className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={act.image}
                alt={act.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.title}>{act.title}</h3>
              <p className={styles.description}>{act.description}</p>
              <div className={styles.meta}>{act.meta}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
