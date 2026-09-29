"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Activities.module.scss";

type Category = "All" | "Movement" | "Stillness" | "Healing" | "Guidance";

interface Practice {
  id: string;
  title: string;
  category: "Movement" | "Stillness" | "Healing" | "Guidance";
  metaTag: string;
  durationOrType: string;
  description: string;
  image?: string;
  placeholderLabel?: string;
}

const practices: Practice[] = [
  {
    id: "yoga",
    title: "Yoga",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "60 MIN",
    description: "Hatha and vinyasa. Strength, flexibility and a quieter head, taught at three levels at once.",
    image: "/images/yoga.jpg",
  },
  {
    id: "weight-loss-yoga",
    title: "Weight loss yoga",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "60 MIN",
    description: "Strength, sweat and breath in one progressive sequence you can grow into over a few weeks.",
    image: "/images/weight-loss-yoga.jpg",
  },
  {
    id: "aerial-yoga",
    title: "Aerial yoga",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "60 MIN",
    description: "Silks take the load off the spine and open the hips in ways the floor cannot. Beginners welcome.",
    image: "/images/aerial-yoga.jpg",
  },
  {
    id: "air-bungee",
    title: "Air bungee",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "45 MIN",
    description: "Suspension training that gets the heart rate up without putting it through the knees.",
    placeholderLabel: "[PHOTO — AIR BUNGEE]",
  },
  {
    id: "zumba",
    title: "Zumba",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "60 MIN",
    description: "Cardio that does not feel like cardio. Come for the hour, leave having forgotten the day.",
    placeholderLabel: "[PHOTO — ZUMBA]",
  },
  {
    id: "belly-dance",
    title: "Belly dance",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "60 MIN",
    description: "Core control learned through rhythm instead of repetition. No dance background needed.",
    placeholderLabel: "[PHOTO — BELLY DANCE]",
  },
  {
    id: "sound-healing",
    title: "Sound healing",
    category: "Healing",
    metaTag: "HEALING",
    durationOrType: "60 MIN",
    description: "Himalayan bowls played close enough to feel. The breath slows before you decide to slow it.",
    image: "/images/sound-healing.jpg",
  },
  {
    id: "osho-meditation",
    title: "Osho meditation",
    category: "Stillness",
    metaTag: "STILLNESS",
    durationOrType: "45 MIN",
    description: "Active, cathartic techniques that move the energy before asking you to be still.",
    image: "/images/meditation.jpg",
  },
  {
    id: "garbh-sanskar",
    title: "Garbh sanskar",
    category: "Healing",
    metaTag: "HEALING",
    durationOrType: "COURSE",
    description: "Prenatal practice for mother and child, guided week by week through the pregnancy.",
    placeholderLabel: "[PHOTO — GARBH SANSKAR]",
  },
  {
    id: "aqua-pilates-yoga",
    title: "Aqua pilates & yoga",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "EVENTS ONLY",
    description: "Floating mats in a pool. Low impact, high result — the water carries your joints while the core works.",
    image: "/images/aqua-pilates.jpg",
  },
  {
    id: "tarot-reading",
    title: "Tarot reading",
    category: "Guidance",
    metaTag: "GUIDANCE",
    durationOrType: "1 TO 1",
    description: "A structured conversation with what you already half-know. By appointment.",
    placeholderLabel: "[PHOTO — TAROT]",
  },
  {
    id: "vastu-interiors",
    title: "Vastu & interiors",
    category: "Guidance",
    metaTag: "GUIDANCE",
    durationOrType: "ON SITE",
    description: "Reading a space honestly, correcting what it does to the people in it, then designing it around how you want to feel.",
    placeholderLabel: "[PHOTO — VASTU]",
  },
];

const categories: Category[] = ["All", "Movement", "Stillness", "Healing", "Guidance"];

export default function ActivitiesClient() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredPractices = practices.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className={styles.pageContent}>
      {/* ───────── Hero Header Section (Shape 0 · Torus) ───────── */}
      <section className={styles.heroSection} data-shape="0">
        <div className={styles.container}>
          <span className={styles.eyebrow}>TWELVE PRACTICES</span>

          <h1 className={styles.headline}>
            Pick the one that matches what you
            <br />
            are carrying.
          </h1>

          <p className={styles.introParagraph}>
            Everything here runs as a drop-in class and as a guided course that lets you start wherever you
            are. Tell us on WhatsApp and we will put you down where it&apos;s quiet.
          </p>

          {/* Filter Pills */}
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.filterPill} ${
                  selectedCategory === cat ? styles.filterPillActive : ""
                }`}
                aria-pressed={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Practices Grid */}
          <div className={styles.grid}>
            {filteredPractices.map((practice) => (
              <a
                key={practice.id}
                href={`https://wa.me/919979061803?text=${encodeURIComponent(
                  `Hi Mind Detoxx, I would like to inquire about ${practice.title} (${practice.durationOrType}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                title={`Book or inquire about ${practice.title}`}
              >
                <div className={styles.imageContainer}>
                  {practice.image ? (
                    <Image
                      src={practice.image}
                      alt={practice.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.cardImage}
                    />
                  ) : (
                    <div className={styles.placeholderBox}>
                      <span className={styles.placeholderText}>
                        {practice.placeholderLabel}
                      </span>
                    </div>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardHeaderInfo}>
                    <h2 className={styles.cardTitle}>{practice.title}</h2>
                    <p className={styles.cardDescription}>{practice.description}</p>
                  </div>

                  <div className={styles.cardMetaRow}>
                    <span className={styles.metaTag}>{practice.metaTag}</span>
                    <span className={styles.metaDuration}>{practice.durationOrType}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* ───────── Not sure which one? CTA Banner ───────── */}
          <div className={styles.ctaBanner}>
            <div className={styles.ctaText}>
              <h2 className={styles.ctaTitle}>Not sure which one?</h2>
              <p className={styles.ctaSubtitle}>
                Send us a message describing your week. We will suggest one class and one batch time,
                and you can change it after the first session.
              </p>
            </div>
            <a
              href="https://wa.me/919979061803?text=Hi%20Mind%20Detoxx%2C%20I%20am%20not%20sure%20which%20activity%20to%20choose%20for%20my%20week.%20Could%20you%20guide%20me%3F"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
