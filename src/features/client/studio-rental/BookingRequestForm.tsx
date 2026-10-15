import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { RENTAL_DURATION_OPTIONS } from "@/data/client/studio-rental";
import type { RentalRequest } from "./rentalRequest";
import { BOOKING_SECTION_ID } from "./scrollToBooking";
import styles from "./StudioRental.module.scss";

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface BookingRequestFormProps {
  request: RentalRequest;
  submitted: boolean;
  onChange: (e: React.ChangeEvent<FieldElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/** Section 4: "Check a date" request form that hands off to WhatsApp. */
export default function BookingRequestForm({
  request,
  submitted,
  onChange,
  onSubmit,
}: BookingRequestFormProps) {
  return (
    <section id={BOOKING_SECTION_ID} className={styles.bookingSection}>
      <Container className={styles.container}>
        <div className={styles.bookingBox}>
          <div className={styles.bookingHeader}>
            <h2 className={styles.bookingTitle}>Check a date</h2>
            <p className={styles.bookingSubtitle}>
              Tell us the day and time you&apos;d like. We reply on WhatsApp with
              availability and terms.
            </p>
          </div>

          <Form onSubmit={onSubmit} className={styles.bookingForm}>
            <Row className="g-3 mb-3">
              <Col xs={12} sm={6} md={3}>
                <Form.Group controlId="fullName">
                  <Form.Label>Your name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    value={request.fullName}
                    onChange={onChange}
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
                    value={request.phone}
                    onChange={onChange}
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
                    value={request.date}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={3}>
                <Form.Group controlId="duration">
                  <Form.Label>Hours needed</Form.Label>
                  <Form.Select name="duration" value={request.duration} onChange={onChange}>
                    {RENTAL_DURATION_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
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
                value={request.purpose}
                onChange={onChange}
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
  );
}
