import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomeActivityCard.module.scss";
import type { HomeActivityItem } from "@/data/activities";

interface HomeActivityCardProps {
  activity: HomeActivityItem;
  href?: string;
  className?: string;
}

export default function HomeActivityCard({
  activity,
  href = "/activities",
  className = "",
}: HomeActivityCardProps) {
  return (
    <Link href={href} className={`${styles.card} ${className}`}>
      <div className={styles.imageWrap}>
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.title}>{activity.title}</h3>
        <p className={styles.description}>{activity.description}</p>
        <div className={styles.meta}>{activity.meta}</div>
      </div>
    </Link>
  );
}
