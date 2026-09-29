"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      const scrollDiff = currentScrollY - lastScrollY;

      // When near top (<= 20px), completely transparent background & always visible
      if (currentScrollY <= 20) {
        setScrolled(false);
        setVisible(true);
      } else {
        setScrolled(true);

        // If mobile drawer is open, keep header visible
        if (!mobileOpen) {
          if (scrollDiff > 8 && currentScrollY > 80) {
            // Scrolling down -> hide navbar
            setVisible(false);
          } else if (scrollDiff < -4) {
            // Scrolling up even slightly -> show navbar
            setVisible(true);
          }
        }
      }

      lastScrollYRef.current = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        !visible ? styles.hidden : ""
      }`}
    >
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

        <nav
          className={`${styles.navLinks} ${
            mobileOpen ? styles.mobileOpen : ""
          }`}
        >
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={pathname === "/" ? styles.active : ""}
          >
            Home
          </Link>
          <Link
            href="/about-us"
            onClick={() => setMobileOpen(false)}
            className={
              pathname === "/about-us" || pathname === "/about"
                ? styles.active
                : ""
            }
          >
            About us
          </Link>
          <Link
            href="/activities"
            onClick={() => setMobileOpen(false)}
            className={pathname === "/activities" ? styles.active : ""}
          >
            Activities
          </Link>
          <Link
            href="/schedule"
            onClick={() => setMobileOpen(false)}
            className={pathname === "/schedule" ? styles.active : ""}
          >
            Schedule
          </Link>
          <Link
            href="/retreats"
            onClick={() => setMobileOpen(false)}
            className={pathname === "/retreats" ? styles.active : ""}
          >
            Retreats
          </Link>
          <Link
            href="/studio-on-rent"
            onClick={() => setMobileOpen(false)}
            className={pathname === "/studio-on-rent" ? styles.active : ""}
          >
            Studio on rent
          </Link>
        </nav>

        <div className={styles.actionGroup}>
          <Link href="/#contact" className={styles.ctaButton}>
            Book now
          </Link>
          <button
            className={`${styles.mobileMenuBtn} ${
              mobileOpen ? styles.menuOpen : ""
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </div>
    </header>
  );
}

