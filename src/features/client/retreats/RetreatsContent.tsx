import React from "react";
import FeaturedRetreat from "./FeaturedRetreat";
import UpcomingEvents from "./UpcomingEvents";
import StudioGallery from "./StudioGallery";
import FindUs from "./FindUs";
import styles from "./Retreats.module.scss";

/** Retreats page body. Server Component; only the events list and gallery hydrate. */
export default function RetreatsContent() {
  return (
    <div className={styles.pageWrapper}>
      <FeaturedRetreat />
      <UpcomingEvents />
      <StudioGallery />
      <FindUs />
    </div>
  );
}
