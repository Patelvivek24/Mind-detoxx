"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="Mind Detoxx Emblem"
            width={34}
            height={34}
            className={styles.logoBadge}
          />
          <span>MIND DETOXX</span>
        </Link>

        <nav className={`${styles.navLinks} ${mobileOpen ? styles.mobileOpen : ""}`}>
          <Link href="#home" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="#about" onClick={() => setMobileOpen(false)}>
            About us
          </Link>
          <Link href="#activities" onClick={() => setMobileOpen(false)}>
            Activities
          </Link>
          <Link href="#schedule" onClick={() => setMobileOpen(false)}>
            Schedule
          </Link>
          <Link href="#pricing" onClick={() => setMobileOpen(false)}>
            Pricing
          </Link>
          <Link href="#weekend-rent" onClick={() => setMobileOpen(false)}>
            Weekend rent
          </Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="#contact" className={styles.ctaButton}>
            Book now
          </Link>
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
