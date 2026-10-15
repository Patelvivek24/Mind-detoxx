"use client";

import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PracticeCard from "@/components/client/ui/PracticeCard/PracticeCard";
import type { ActivitiesData, ActivityCategory } from "@/types/content";
import styles from "./Activities.module.scss";

interface PracticesCatalogProps {
  categories: ActivitiesData["categories"];
  practices: ActivitiesData["practices"];
  /** WhatsApp line each practice card enquires on. */
  whatsappNumber: string;
}

/** Category filter pills and the filtered practices grid. */
export default function PracticesCatalog({ categories, practices, whatsappNumber }: PracticesCatalogProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ActivityCategory>("All");

  const filteredPractices = practices.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <>
      {/* Filter Pills */}
      <div className={styles.filterBar} role="tablist" aria-label="Practice Categories">
        {categories.map((cat) => (
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
            <PracticeCard practice={practice} whatsappNumber={whatsappNumber} />
          </Col>
        ))}
      </Row>
    </>
  );
}
