import React from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionTitle from "@/components/client/ui/SectionTitle/SectionTitle";
import WhatsAppButton from "@/components/client/ui/WhatsAppButton/WhatsAppButton";
import { RETREATS } from "@/data/client/retreats";
import { CONTACT } from "@/data/client/contact";
import { retreatEnquiry } from "./retreatEnquiry";
import styles from "./Retreats.module.scss";

/** Section 1: hero heading, the featured retreat card and the booking notice. */
export default function FeaturedRetreat() {
  const featured = RETREATS.featured;
  const { featuredEvent, notice } = featured;
  const bookingPhone = CONTACT.phones.secondary;

  return (
    <section className={styles.heroSection} data-shape="0">
      <Container className={styles.container}>
        <SectionTitle
          as="h1"
          eyebrow={featured.eyebrow}
          title={featured.headlineLine1}
          titleLine2={featured.headlineLine2}
          subtitle={featured.intro}
        />

        {/* Featured Event Card: Aqua Pilates & Aqua Yoga */}
        <article className={styles.featuredCard}>
          <div className={styles.featuredImageContainer}>
            <Image
              src={featuredEvent.image}
              alt={featuredEvent.imageAlt}
              width={1200}
              height={640}
              priority
              className={styles.featuredImage}
            />
            <div className={styles.imageOverlayGradient} />
          </div>

          <div className={styles.featuredCardBody}>
            <span className={styles.eventKicker}>{featuredEvent.kicker}</span>

            <h2 className={styles.eventTitle}>{featuredEvent.title}</h2>

            <p className={styles.eventDescription}>{featuredEvent.description}</p>

            {/* 3-Column Metadata */}
            <Row className="g-4 mb-4">
              <Col xs={12} sm={4} className={styles.metaCol}>
                <span className={styles.metaLabel}>WHEN</span>
                <span className={styles.metaValue}>{featuredEvent.whenDate}</span>
                <span className={styles.metaSub}>{featuredEvent.whenTime}</span>
              </Col>

              <Col xs={12} sm={4} className={styles.metaCol}>
                <span className={styles.metaLabel}>WHERE</span>
                <span className={styles.metaValue}>{featuredEvent.whereVenue}</span>
                <span className={styles.metaSub}>{featuredEvent.whereCity}</span>
              </Col>

              <Col xs={12} sm={4} className={styles.metaCol}>
                <span className={styles.metaLabel}>BOOKINGS</span>
                <span className={styles.metaValue}>{featuredEvent.bookingType}</span>
                <a
                  href={`tel:${bookingPhone.tel}`}
                  className={`${styles.metaSub} ${styles.metaLink}`}
                >
                  {bookingPhone.display}
                </a>
              </Col>
            </Row>

            {/* Tag Badges */}
            <div className={styles.tagsRow}>
              {featuredEvent.tags.map((tag) => (
                <span key={tag} className={styles.tagPill}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Button */}
            <WhatsAppButton
              number={CONTACT.whatsapp.secondary}
              message={retreatEnquiry(
                `Reserving a mat for ${featuredEvent.title} at ${featuredEvent.whereVenue}`
              )}
              className={styles.reserveButton}
            >
              <span>{featuredEvent.reserveLabel}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </WhatsAppButton>
          </div>
        </article>

        {/* Important Notice Banner */}
        <div className={styles.noticeBanner}>
          <div>
            <span className={styles.noticeHighlight}>{notice.highlight}</span>{" "}
            {notice.body}
          </div>
        </div>
      </Container>
    </section>
  );
}
