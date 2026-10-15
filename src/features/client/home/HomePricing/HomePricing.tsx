import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./HomePricing.module.scss";
import { HOME_PRICING_PLANS } from "@/data/client/pricing";
import PricingCard from "@/components/client/ui/PricingCard/PricingCard";

export default function HomePricing() {
  return (
    <section id="pricing" className={styles.section} aria-label="Membership and Pricing">
      <Container fluid="lg" className="px-0">
        <h2 className={styles.heading}>Ways to join</h2>
        <Row className="g-4 align-items-stretch">
          {HOME_PRICING_PLANS.map((plan) => (
            <Col key={plan.tier} xs={12} lg={4}>
              <PricingCard plan={plan} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
