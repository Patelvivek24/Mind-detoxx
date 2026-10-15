import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WhatsAppButton from "@/components/client/ui/WhatsAppButton/WhatsAppButton";
import { RETREATS } from "@/data/client/retreats";
import { CONTACT } from "@/data/client/contact";
import { retreatEnquiry } from "./retreatEnquiry";
import styles from "./Retreats.module.scss";

const copy = RETREATS.findUs;
const phone = CONTACT.phones.secondary;

/** Section 4: studio address, contact details and the embedded map. */
export default function FindUs() {
  return (
    <section className={styles.findUsSection} data-shape="3">
      <Container className={styles.container}>
        <h2 className={styles.sectionHeading}>{copy.heading}</h2>

        <Row className="g-4 align-items-stretch">
          {/* Left Column: Contact details */}
          <Col xs={12} lg={5} className={styles.findUsInfo}>
            <div className={styles.infoBlock}>
              <span className={styles.blockLabel}>{copy.studioLabel}</span>
              <p className={styles.blockText}>
                {CONTACT.address.lines.map((line, idx) => (
                  <React.Fragment key={line}>
                    {idx > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </p>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.blockLabel}>{copy.contactLabel}</span>
              <a href={`tel:${phone.tel}`} className={styles.blockLink}>
                {phone.display}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className={styles.blockLink}
              >
                {CONTACT.email}
              </a>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.blockLabel}>{copy.firstVisitLabel}</span>
              <p className={styles.blockText}>{copy.firstVisitText}</p>
            </div>

            <WhatsAppButton
              number={CONTACT.whatsapp.secondary}
              message={retreatEnquiry(copy.whatsappMessage)}
              className={styles.whatsappButton}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM9.14 7.42C8.98 7.42 8.72 7.48 8.5 7.72C8.28 7.96 7.66 8.54 7.66 9.72C7.66 10.9 8.52 12.03 8.64 12.19C8.76 12.35 10.33 14.78 12.75 15.82C13.33 16.07 13.78 16.22 14.13 16.33C14.71 16.51 15.24 16.49 15.66 16.43C16.13 16.36 17.11 15.84 17.31 15.28C17.51 14.72 17.51 14.24 17.45 14.14C17.39 14.04 17.23 13.98 16.99 13.86C16.75 13.74 15.57 13.16 15.35 13.08C15.13 13 14.97 12.96 14.81 13.2C14.65 13.44 14.19 13.98 14.05 14.14C13.91 14.3 13.77 14.32 13.53 14.2C13.29 14.08 12.51 13.83 11.59 13.01C10.88 12.37 10.4 11.58 10.26 11.34C10.12 11.1 10.25 10.97 10.37 10.85C10.48 10.74 10.62 10.56 10.74 10.42C10.86 10.28 10.9 10.18 10.98 10.02C11.06 9.86 11.02 9.72 10.96 9.6C10.9 9.48 10.42 8.3 10.22 7.82C10.02 7.34 9.82 7.41 9.68 7.41C9.53 7.41 9.35 7.42 9.14 7.42Z" />
              </svg>
              <span>{copy.whatsappLabel}</span>
            </WhatsAppButton>
          </Col>

          {/* Right Column: Interactive Map Box */}
          <Col xs={12} lg={7} className={styles.mapFrameContainer}>
            <div className={styles.mapHeaderWireframe}>
              <span className={styles.mapTag}>{copy.mapTag}</span>
              <a
                href={CONTACT.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "11px",
                  color: "#2fe3c6",
                  textDecoration: "underline",
                }}
              >
                {copy.mapLinkLabel}
              </a>
            </div>

            <iframe
              title={copy.mapTitle}
              src={CONTACT.maps.embedUrl}
              className={styles.mapIframe}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
