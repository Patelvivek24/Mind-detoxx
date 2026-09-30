import React from "react";
import type { Metadata } from "next";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import PillarCard from "@/components/common/PillarCard/PillarCard";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import styles from "./AboutUs.module.scss";
import {
  ABOUT_HERO,
  ABOUT_PILLARS,
  STUDIO_INFO,
} from "@/data/about";

export const metadata: Metadata = {
  title: "About Us — Mind Detoxx | Surat",
  description:
    "A room in Surat where the week gets put down. Mind Detoxx opened on VIP Road with release first, effort second.",
};

export default function AboutUsPage() {
  return (
    <>
      {/* Main navigation */}
      <Navbar />

      <main className={styles.pageWrapper}>
        {/* ───────── Section 1: Hero Philosophy (Shape 0 · Torus) ───────── */}
        <section className={styles.heroSection} data-shape="0">
          <Container className={styles.container}>
            <SectionTitle
              as="h1"
              eyebrow={ABOUT_HERO.eyebrow}
              title={ABOUT_HERO.headlineLine1}
              titleLine2={ABOUT_HERO.headlineLine2}
              subtitle={ABOUT_HERO.intro}
            />

            <Row className="g-4">
              {ABOUT_PILLARS.map((pillar) => (
                <Col key={pillar.title} xs={12} md={4}>
                  <PillarCard pillar={pillar} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
        {/* ───────── Section 2: The studio (Shape 1 · Wave) ───────── */}
        <section className={styles.studioSection} data-shape="1">
          <Container className={styles.container}>
            <Row className="g-4 g-lg-5 align-items-center">
              <Col xs={12} lg={6}>
                <div className={styles.studioPhotoBox}>
                  <span className={styles.photoLabel}>{STUDIO_INFO.photoLabel}</span>
                </div>
              </Col>

              <Col xs={12} lg={6}>
                <div className={styles.studioContent}>
                  <h2 className={styles.studioHeading}>{STUDIO_INFO.heading}</h2>
                  <p className={styles.studioDescription}>
                    {STUDIO_INFO.description}
                  </p>

                  <div className={styles.studioAddress}>
                    {STUDIO_INFO.addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>

                  <a
                    href={STUDIO_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directionsLink}
                  >
                    Get directions
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
