import React from "react";
import styles from "./SectionTitle.module.scss";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  titleLine2?: string;
  subtitle?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  titleLine2,
  subtitle,
  as = "h2",
  align = "left",
  className = "",
}: SectionTitleProps) {
  const HeadingTag = as;

  return (
    <div
      className={`${styles.container} ${
        align === "center" ? styles.centered : ""
      } ${className}`}
    >
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <HeadingTag className={styles.headline}>
        {title}
        {titleLine2 && (
          <>
            <br />
            {titleLine2}
          </>
        )}
      </HeadingTag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
