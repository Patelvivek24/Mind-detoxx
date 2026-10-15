"use client";

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import WhatsAppButton from "@/components/client/ui/WhatsAppButton/WhatsAppButton";
import type { RetreatsData } from "@/types/content";
import { retreatEnquiry } from "./retreatEnquiry";
import styles from "./Retreats.module.scss";

interface UpcomingEventsProps {
  data: RetreatsData["upcomingEvents"];
  whatsappNumber: string;
}

/** Section 2: "Coming up" — expandable list of upcoming events (one open at a time). */
export default function UpcomingEvents({ data, whatsappNumber }: UpcomingEventsProps) {
  const { heading, enquireLabel, events } = data;
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const handleToggleEvent = (id: string) => {
    setExpandedEventId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.comingUpSection} data-shape="1">
      <Container className={styles.container}>
        <h2 className={styles.sectionHeading}>{heading}</h2>

        <div className={styles.eventsTableWrapper}>
          {events.map((evt) => {
            const isExpanded = expandedEventId === evt.id;
            return (
              <React.Fragment key={evt.id}>
                <div
                  className={styles.eventRow}
                  onClick={() => handleToggleEvent(evt.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleToggleEvent(evt.id);
                    }
                  }}
                >
                  <div className={styles.eventRowCol}>
                    <span className={styles.rowLabelWireframe}>EVENT</span>
                    <span className={styles.eventRowName}>{evt.name}</span>
                  </div>

                  <div className={styles.eventRowCol}>
                    <span className={styles.rowLabelWireframe}>DATE</span>
                    <span className={styles.eventRowDate}>{evt.date}</span>
                  </div>

                  <div className={styles.eventRowCol}>
                    <span className={styles.rowLabelWireframe}>VENUE &amp; CITY</span>
                    <span className={styles.eventRowVenue}>
                      {evt.venue}, {evt.city}
                    </span>
                  </div>

                  <div className={styles.eventRowAction}>
                    <span className={styles.infoBadge}>
                      <span>{isExpanded ? "CLOSE" : "DETAILS"}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                        style={{
                          transform: isExpanded ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className={styles.eventDetailsExpanded}>
                    <p>{evt.description}</p>
                    <p>
                      <strong style={{ color: "#2fe3c6" }}>Notice: </strong>
                      {evt.highlight}
                    </p>
                    <div className={styles.detailsActionRow}>
                      <WhatsAppButton
                        number={whatsappNumber}
                        message={retreatEnquiry(`Registering for ${evt.name}`)}
                        className={styles.reserveButton}
                        style={{ padding: "8px 20px", fontSize: "12.5px" }}
                      >
                        <span>{enquireLabel}</span>
                      </WhatsAppButton>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
