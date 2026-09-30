import React from "react";
import styles from "./PillarCard.module.scss";
import type { AboutPillar } from "@/data/about";

interface PillarCardProps {
  pillar: AboutPillar;
  className?: string;
}

export default function PillarCard({ pillar, className = "" }: PillarCardProps) {
  return (
    <div className={`${styles.pillarCard} ${className}`}>
      <h3 className={styles.pillarTitle}>{pillar.title}</h3>
      <p className={styles.pillarText}>{pillar.text}</p>
    </div>
  );
}
