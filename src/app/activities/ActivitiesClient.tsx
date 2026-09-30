"use client";

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PracticeCard from "@/components/common/PracticeCard/PracticeCard";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import styles from "./Activities.module.scss";
import {
  ALL_PRACTICES,
  ACTIVITY_CATEGORIES,
  type ActivityCategory,
} from "@/data/activities";

export default function ActivitiesClient() {
  const [selectedCategory, setSelectedCategory] =
    useState<ActivityCategory>("All");

  const filteredPractices = ALL_PRACTICES.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className={styles.pageContent}>
      {/* ───────── Hero Header Section (Shape 0 · Torus) ───────── */}
      <section className={styles.heroSection} data-shape="0">
        <Container className={styles.container}>
          <SectionTitle
            as="h1"
            eyebrow="TWELVE PRACTICES"
            title="Pick the one that matches what you"
            titleLine2="are carrying."
            subtitle="Everything here runs as a drop-in class and as a guided course that lets you start wherever you are. Tell us on WhatsApp and we will put you down where it's quiet."
          />

          {/* Filter Pills */}
          <div className={styles.filterBar} role="tablist" aria-label="Practice Categories">
            {ACTIVITY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.filterPill} ${
                  selectedCategory === cat ? styles.filterPillActive : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Practices Grid */}
          <Row className="g-4 mb-5">
            {filteredPractices.map((practice) => (
              <Col key={practice.id} xs={12} md={6} lg={4}>
                <PracticeCard practice={practice} />
              </Col>
            ))}
          </Row>

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
        </Container>
      </section>
    </div>
  );
}
