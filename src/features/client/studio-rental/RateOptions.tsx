import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RENTAL_RATE_OPTIONS } from "@/data/client/studio-rental";
import styles from "./StudioRental.module.scss";

interface RateOptionsProps {
  selectedDuration: string;
  onSelect: (durationValue: string) => void;
}

/** Section 3: selectable rate cards plus the booking fine print. */
export default function RateOptions({ selectedDuration, onSelect }: RateOptionsProps) {
  return (
    <section className={styles.ratesSection}>
      <Container className={styles.container}>
        <h2 className={styles.sectionTitle}>Rates</h2>

        <Row className="g-4 mb-4">
          {RENTAL_RATE_OPTIONS.map((rate) => {
            const isSelected = selectedDuration === rate.durationValue;
            return (
              <Col key={rate.id} xs={12} lg={4}>
                <div
                  className={`${styles.rateCard} ${isSelected ? styles.selectedRate : ""}`}
                  onClick={() => onSelect(rate.durationValue)}
                >
                  <span className={styles.rateTag}>{rate.tag}</span>
                  <div className={styles.ratePriceRow}>
                    <span className={styles.ratePrice}>{rate.price}</span>
                    <span className={styles.ratePeriod}>/ {rate.period}</span>
                  </div>
                  <p className={styles.rateDesc}>{rate.description}</p>
                  <button
                    type="button"
                    className={styles.rateSelectBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(rate.durationValue);
                    }}
                  >
                    {isSelected ? "Selected" : "Select this slot"}
                  </button>
                </div>
              </Col>
            );
          })}
        </Row>

        <div className={styles.finePrintNotes}>
          <p>
            • A 50% advance confirms the slot. Cancellations more than 48 hours
            ahead are refunded in full.
          </p>
          <p>
            • Please leave the room as you found it — mats stacked, windows shut.
          </p>
        </div>
      </Container>
    </section>
  );
}
