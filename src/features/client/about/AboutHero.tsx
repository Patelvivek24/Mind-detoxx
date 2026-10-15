import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PillarCard from "@/components/client/ui/PillarCard/PillarCard";
import SectionTitle from "@/components/client/ui/SectionTitle/SectionTitle";
import { ABOUT } from "@/data/client/about";
import styles from "./AboutUs.module.scss";

/** Section 1: philosophy heading and the three pillars (Shape 0 · Torus). */
export default function AboutHero() {
  return (
    <section className={styles.heroSection} data-shape="0">
      <Container className={styles.container}>
        <SectionTitle
          as="h1"
          eyebrow={ABOUT.hero.eyebrow}
          title={ABOUT.hero.headlineLine1}
          titleLine2={ABOUT.hero.headlineLine2}
          subtitle={ABOUT.hero.intro}
        />

        <Row className="g-4">
          {ABOUT.pillars.map((pillar) => (
            <Col key={pillar.id} xs={12} md={4}>
              <PillarCard pillar={pillar} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
