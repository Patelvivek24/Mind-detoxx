import React from "react";
import { RETREATS } from "@/data/client/retreats";
import { CONTACT } from "@/data/client/contact";
import FeaturedRetreat from "./FeaturedRetreat";
import UpcomingEvents from "./UpcomingEvents";
import StudioGallery from "./StudioGallery";
import FindUs from "./FindUs";
import styles from "./Retreats.module.scss";

/**
 * Retreats page body. Server Component; only the events list and gallery hydrate, and they
 * receive just their slice of the data so the rest of retreats.json stays out of the bundle.
 */
export default function RetreatsContent() {
  return (
    <div className={styles.pageWrapper}>
      <FeaturedRetreat />
      <UpcomingEvents data={RETREATS.upcomingEvents} whatsappNumber={CONTACT.whatsapp.secondary} />
      <StudioGallery data={RETREATS.gallery} whatsappNumber={CONTACT.whatsapp.secondary} />
      <FindUs />
    </div>
  );
}
