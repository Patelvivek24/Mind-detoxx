"use client";

import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PracticeCard from "@/components/client/ui/PracticeCard/PracticeCard";
import {
  ALL_PRACTICES,
  ACTIVITY_CATEGORIES,
  type ActivityCategory,
} from "@/data/client/activities";
import styles from "./Activities.module.scss";

/** Category filter pills and the filtered practices grid. */
export default function PracticesCatalog() {
  const [selectedCategory, setSelectedCategory] =
    useState<ActivityCategory>("All");

  const filteredPractices = ALL_PRACTICES.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <>
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
    </>
  );
}
