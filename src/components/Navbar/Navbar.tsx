"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";
import {
  BRAND_CONFIG,
  NAV_LINKS,
  CTA_CONFIG,
  type NavLinkItem,
} from "@/data/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const lastScrollYRef = useRef(0);
  const mobileOpenRef = useRef(mobileOpen);
  const rafIdRef = useRef<number | null>(null);

  // Keep ref synchronized to avoid re-binding scroll event listener
  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  // Close mobile drawer automatically when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpenRef.current) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Optimized RAF-throttled scroll listener
  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      const scrollDiff = currentScrollY - lastScrollY;

      if (currentScrollY <= 20) {
        setScrolled(false);
        setVisible(true);
      } else {
        setScrolled(true);

        // Keep navbar visible when mobile drawer is open
        if (!mobileOpenRef.current) {
          if (scrollDiff > 8 && currentScrollY > 80) {
            // Scrolling down -> hide navbar
            setVisible(false);
          } else if (scrollDiff < -4) {
            // Scrolling up -> reveal navbar
            setVisible(true);
          }
        }
      }

      lastScrollYRef.current = currentScrollY <= 0 ? 0 : currentScrollY;
      rafIdRef.current = null;
    };

    const handleScroll = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = window.requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const isLinkActive = useCallback(
    (link: NavLinkItem) => {
      if (pathname === link.href) return true;
      if (link.aliases && link.aliases.includes(pathname)) return true;
      return false;
    },
    [pathname]
  );

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        !visible ? styles.hidden : ""
      }`}
    >
      <div className={styles.container}>
        <Link
          href={BRAND_CONFIG.href}
          className={styles.logo}
          aria-label={BRAND_CONFIG.ariaLabel}
          onClick={closeMobileMenu}
        >
          <Image
            src={BRAND_CONFIG.logo.src}
            alt={BRAND_CONFIG.logo.alt}
            width={BRAND_CONFIG.logo.width}
            height={BRAND_CONFIG.logo.height}
            priority={BRAND_CONFIG.logo.priority}
            sizes={BRAND_CONFIG.logo.sizes}
            className={styles.logoBadge}
          />
        </Link>

        <nav
          id="primary-navigation"
          className={`${styles.navLinks} ${
            mobileOpen ? styles.mobileOpen : ""
          }`}
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={active ? styles.active : ""}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actionGroup}>
          <Link
            href={CTA_CONFIG.href}
            className={styles.ctaButton}
            onClick={closeMobileMenu}
          >
            {CTA_CONFIG.label}
          </Link>
          <button
            type="button"
            className={`${styles.mobileMenuBtn} ${
              mobileOpen ? styles.menuOpen : ""
            }`}
            onClick={toggleMobileMenu}
            aria-controls="primary-navigation"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
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
