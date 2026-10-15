import React from "react";
import Image from "next/image";
import styles from "./PracticeCard.module.scss";
import type { ActivityItem } from "@/data/activities";

interface PracticeCardProps {
  practice: ActivityItem;
  className?: string;
}

export default function PracticeCard({
  practice,
  className = "",
}: PracticeCardProps) {
  const whatsappUrl = `https://wa.me/919979061803?text=${encodeURIComponent(
    `Hi Mind Detoxx, I would like to inquire about ${practice.title} (${practice.durationOrType}).`
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${className}`}
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
          <h3 className={styles.cardTitle}>{practice.title}</h3>
          <p className={styles.cardDescription}>{practice.description}</p>
        </div>

        <div className={styles.cardMetaRow}>
          <span className={styles.metaTag}>{practice.metaTag}</span>
          <span className={styles.metaDuration}>{practice.durationOrType}</span>
        </div>
      </div>
    </a>
  );
}
