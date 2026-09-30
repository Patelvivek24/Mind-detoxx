import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Footer.module.scss";
import { FOOTER_DATA } from "@/data/footer";

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <Container fluid="lg" className="px-0">
        <Row className="g-4 g-lg-5">
          <Col xs={12} md={4} className={styles.colBrand}>
            <span className={styles.brandName}>{FOOTER_DATA.brandName}</span>
            <address className={styles.address}>
              {FOOTER_DATA.addressLines.map((line, idx) => (
                <React.Fragment key={line}>
                  {line}
                  {idx < FOOTER_DATA.addressLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </address>
          </Col>

          <Col xs={12} md={4} className={styles.colLinks}>
            {FOOTER_DATA.links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </Col>

          <Col xs={12} md={4} className={styles.colContact}>
            <a href={FOOTER_DATA.phone} className={styles.contactItem}>
              {FOOTER_DATA.phoneDisplay}
            </a>
            <a
              href={FOOTER_DATA.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              {FOOTER_DATA.instagramHandle}
            </a>
            <div className={styles.slogan}>{FOOTER_DATA.slogan}</div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
