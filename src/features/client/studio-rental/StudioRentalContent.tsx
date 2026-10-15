import React from "react";
import { STUDIO_RENTAL } from "@/data/client/studio-rental";
import { CONTACT } from "@/data/client/contact";
import RentalHero from "./RentalHero";
import RoomDetails from "./RoomDetails";
import RentalBooking from "./RentalBooking";
import styles from "./StudioRental.module.scss";

/**
 * Studio on Rent page body. RoomDetails renders on the server; the interactive sections
 * receive only their slice of studio-rental.json as props.
 */
export default function StudioRentalContent() {
  return (
    <div className={styles.pageWrapper}>
      <RentalHero hero={STUDIO_RENTAL.hero} />
      <RoomDetails />
      <RentalBooking
        rates={STUDIO_RENTAL.rates}
        form={STUDIO_RENTAL.bookingForm}
        whatsappNumber={CONTACT.whatsapp.primary}
        callNumbers={[CONTACT.phones.additional, CONTACT.phones.primary]}
      />
    </div>
  );
}
