import React from "react";
import Container from "react-bootstrap/Container";
import { ROOM_FEATURES, RENTAL_AUDIENCES } from "@/data/client/studio-rental";
import styles from "./StudioRental.module.scss";

/** Section 2: what's in the room and who usually rents it. */
export default function RoomDetails() {
  return (
    <section className={styles.specsSection}>
      <Container className={styles.container}>
        <div className={styles.specsGrid}>
          <div className={styles.specsColumnLeft}>
            <h2 className={styles.sectionTitle}>What&apos;s in the room</h2>
            <ul className={styles.specList}>
              {ROOM_FEATURES.map((feature) => (
                <li key={feature}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.specsColumnRight}>
            <h2 className={styles.sectionTitle}>Who rents it</h2>
            <div className={styles.audienceList}>
              {RENTAL_AUDIENCES.map((audience) => (
                <div key={audience.title} className={styles.audienceItem}>
                  <h4>{audience.title}</h4>
                  <p>{audience.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
