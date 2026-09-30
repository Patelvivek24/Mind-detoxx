"use client";

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import styles from "./StudioRental.module.scss";
import { RENTAL_RATE_OPTIONS } from "@/data/studio-rental";

export default function StudioRentalClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    duration: "2 Hours (Minimum)",
    purpose: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSelectRate = (durationVal: string) => {
    setFormData((prev) => ({ ...prev, duration: durationVal }));
    const element = document.getElementById("check-date");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `Hi Mind Detoxx Surat, I would like to check studio rental availability for weekends:\n\n• Name: ${
      formData.fullName || "Not specified"
    }\n• WhatsApp: ${formData.phone || "Not specified"}\n• Date: ${
      formData.date || "Not specified"
    }\n• Hours Needed: ${formData.duration}\n• What's it for: ${
      formData.purpose || "Studio Practice / Workshop"
    }\n\nPlease let me know if this slot is available and share terms.`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919979061803?text=${encodedText}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* ───────────────────────── SECTION 1: HERO ───────────────────────── */}
      <section className={styles.heroSection}>
        <Container className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <span className={styles.eyebrow}>STUDIO ON RENT</span>
              <h1 className={styles.headline}>
                Our room. Your practice.{" "}
                <span className={styles.goldText}>Weekends.</span>
              </h1>
              <p className={styles.introParagraph}>
                The studio is vacant on Saturdays and Sundays for yoga teachers,
                workshop leaders, sound healing practitioners, and creative
                movements to gather, host, or practice together.
              </p>

              <div className={styles.pricingActionBlock}>
                <div className={styles.priceCallout}>
                  <span className={styles.priceAmount}>₹1,500</span>
                  <span className={styles.priceUnit}>
                    / PER HOUR · SATURDAY &amp; SUNDAY
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => {
                    const el = document.getElementById("check-date");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Request date &amp; time
                </button>
              </div>
            </div>

            {/* Glowing Cosmic Aura Art */}
            <div className={styles.heroRight}>
              <div className={styles.auraArtBox}>
                <div className={styles.auraGlowSphere} />
                <div className={styles.auraRing} />
                <div className={styles.auraTextTag}>
                  <span>SURAT · VIP ROAD · 2ND FLOOR</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────── SECTION 2: WHAT'S IN THE ROOM ───────────────────────── */}
      <section className={styles.specsSection}>
        <Container className={styles.container}>
          <div className={styles.specsGrid}>
            <div className={styles.specsColumnLeft}>
              <h2 className={styles.sectionTitle}>What&apos;s in the room</h2>
              <ul className={styles.specList}>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <span>10 aerial silk rigging points with tested carabiners</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <span>
                    Tibetan singing bowls, gong, chimes &amp; sound instruments
                  </span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <span>
                    Premium high-density yoga mats, organic cotton bolsters, blocks
                  </span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Dual aspect natural light with privacy sheer shades</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Full studio Bluetooth sound system and ambient dimmers</span>
                </li>
              </ul>
            </div>

            <div className={styles.specsColumnRight}>
              <h2 className={styles.sectionTitle}>Who rents it</h2>
              <div className={styles.audienceList}>
                <div className={styles.audienceItem}>
                  <h4>Visiting teachers and therapists</h4>
                  <p>
                    From Mumbai, Ahmedabad, Delhi, or abroad holding weekend
                    workshops.
                  </p>
                </div>
                <div className={styles.audienceItem}>
                  <h4>Weekend and one-day events</h4>
                  <p>Sound healing, meditation, art &amp; therapy, flower mandalas.</p>
                </div>
                <div className={styles.audienceItem}>
                  <h4>Corporate wellness sessions</h4>
                  <p>Bring a team for an afternoon. We can supply the teacher too.</p>
                </div>
                <div className={styles.audienceItem}>
                  <h4>Photo and video shoots</h4>
                  <p>Daylight on two sides, neutral walls, no fixed signage in room.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────── SECTION 3: RATES ───────────────────────── */}
      <section className={styles.ratesSection}>
        <Container className={styles.container}>
          <h2 className={styles.sectionTitle}>Rates</h2>

          <Row className="g-4 mb-4">
            {RENTAL_RATE_OPTIONS.map((rate) => (
              <Col key={rate.id} xs={12} lg={4}>
                <div
                  className={`${styles.rateCard} ${
                    formData.duration === rate.durationValue
                      ? styles.selectedRate
                      : ""
                  }`}
                  onClick={() => handleSelectRate(rate.durationValue)}
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
                      handleSelectRate(rate.durationValue);
                    }}
                  >
                    {formData.duration === rate.durationValue
                      ? "Selected"
                      : "Select this slot"}
                  </button>
                </div>
              </Col>
            ))}
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

      {/* ───────────────────────── SECTION 4: CHECK A DATE ───────────────────────── */}
      <section id="check-date" className={styles.bookingSection}>
        <Container className={styles.container}>
          <div className={styles.bookingBox}>
            <div className={styles.bookingHeader}>
              <h2 className={styles.bookingTitle}>Check a date</h2>
              <p className={styles.bookingSubtitle}>
                Tell us the day and time you&apos;d like. We reply on WhatsApp with
                availability and terms.
              </p>
            </div>

            <Form onSubmit={handleSubmit} className={styles.bookingForm}>
              <Row className="g-3 mb-3">
                <Col xs={12} sm={6} md={3}>
                  <Form.Group controlId="fullName">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} sm={6} md={3}>
                  <Form.Group controlId="phone">
                    <Form.Label>WhatsApp number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="+91 ..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} sm={6} md={3}>
                  <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} sm={6} md={3}>
                  <Form.Group controlId="duration">
                    <Form.Label>Hours needed</Form.Label>
                    <Form.Select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                    >
                      <option value="2 Hours (Minimum)">2 Hours (Minimum)</option>
                      <option value="3 Hours">3 Hours</option>
                      <option value="Half Day (4 Hours)">
                        Half Day (4 Hours)
                      </option>
                      <option value="Full Day (8+ Hours)">
                        Full Day (8+ Hours)
                      </option>
                      <option value="Custom Duration">Custom Duration</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="purpose" className="mb-4">
                <Form.Label>What&apos;s it for?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="purpose"
                  placeholder="A yoga workshop, sound bath, photo shoot, corporate session..."
                  value={formData.purpose}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <div className={styles.submitRow}>
                <button type="submit" className={styles.submitBtn}>
                  Send to WhatsApp
                </button>
                <span className={styles.orCallText}>
                  or call{" "}
                  <a href="tel:+919979261002" className={styles.phoneLink}>
                    +91 99792 61002
                  </a>
                  {" / "}
                  <a href="tel:+919979061803" className={styles.phoneLink}>
                    +91 99790 61803
                  </a>
                </span>
              </div>

              {submitted && (
                <div className={styles.successMessage} role="status">
                  ✓ Request created! Opening WhatsApp to chat with our studio team directly.
                </div>
              )}
            </Form>
          </div>
        </Container>
      </section>
    </div>
  );
}
