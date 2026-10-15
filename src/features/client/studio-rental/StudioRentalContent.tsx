import React from "react";
import RentalHero from "./RentalHero";
import RoomDetails from "./RoomDetails";
import RentalBooking from "./RentalBooking";
import styles from "./StudioRental.module.scss";

/** Studio on Rent page body. RoomDetails renders on the server; the rest is interactive. */
export default function StudioRentalContent() {
  return (
    <div className={styles.pageWrapper}>
      <RentalHero />
      <RoomDetails />
      <RentalBooking />
    </div>
  );
}
