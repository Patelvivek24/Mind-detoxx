import React from "react";
import Link from "next/link";
import styles from "./PricingCard.module.scss";
import type { PricingPlan } from "@/data/pricing";

interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
}

export default function PricingCard({
  plan,
  className = "",
}: PricingCardProps) {
  const isExternal =
    plan.buttonHref?.startsWith("http") ||
    plan.buttonHref?.startsWith("tel:") ||
    plan.buttonHref?.startsWith("https://wa.me");

  return (
    <div
      className={`${styles.card} ${plan.isFeatured ? styles.featured : ""} ${className}`}
    >
      <span className={styles.tierLabel}>{plan.tier}</span>
      <div className={styles.price}>{plan.price}</div>
      <p className={styles.description}>{plan.description}</p>

      {isExternal ? (
        <a
          href={plan.buttonHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.actionButton} ${
            plan.isFeatured ? styles.filled : styles.outlined
          }`}
        >
          {plan.buttonText}
        </a>
      ) : (
        <Link
          href={plan.buttonHref || "#contact"}
          className={`${styles.actionButton} ${
            plan.isFeatured ? styles.filled : styles.outlined
          }`}
        >
          {plan.buttonText}
        </Link>
      )}
    </div>
  );
}
