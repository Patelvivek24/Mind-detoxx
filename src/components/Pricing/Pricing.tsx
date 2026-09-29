"use client";

import React from "react";
import Link from "next/link";
import styles from "./Pricing.module.scss";

interface Plan {
  tier: string;
  price: string;
  description: string;
  buttonText: string;
  isFeatured?: boolean;
}

const plans: Plan[] = [
  {
    tier: "DROP-IN CLASS",
    price: "[YOUR PRICE]",
    description: "A single session whenever you need to recharge and reset. No commitment required.",
    buttonText: "Book a class",
    isFeatured: false,
  },
  {
    tier: "MONTHLY MEMBERSHIP",
    price: "₹3,500",
    description: "The most popular choice for committed practitioners. Unlimited access to all regular weekday classes and sound healing workshops.",
    buttonText: "Get the monthly package",
    isFeatured: true,
  },
  {
    tier: "SMALL GROUP (5 PACK)",
    price: "₹3,000",
    description: "Per person, per month, when five friends or colleagues commit to practice together.",
    buttonText: "Group inquiry / sign up",
    isFeatured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <h2 className={styles.heading}>Ways to join</h2>
      <div className={styles.grid}>
        {plans.map((p) => (
          <div
            key={p.tier}
            className={`${styles.card} ${p.isFeatured ? styles.featured : ""}`}
          >
            <span className={styles.tierLabel}>{p.tier}</span>
            <div className={styles.price}>{p.price}</div>
            <p className={styles.description}>{p.description}</p>
            <Link
              href="#contact"
              className={`${styles.actionButton} ${p.isFeatured ? styles.filled : styles.outlined}`}
            >
              {p.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
