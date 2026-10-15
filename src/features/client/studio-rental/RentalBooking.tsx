"use client";

import React, { useState } from "react";
import { STUDIO_WHATSAPP } from "@/data/client/contact";
import { openWhatsApp } from "@/lib/whatsapp";
import RateOptions from "./RateOptions";
import BookingRequestForm from "./BookingRequestForm";
import {
  EMPTY_RENTAL_REQUEST,
  rentalRequestMessage,
  type RentalRequest,
} from "./rentalRequest";
import { scrollToBooking } from "./scrollToBooking";

/**
 * Rates + "Check a date" form. They share the selected duration, so the request
 * state lives here and both sections stay presentational.
 */
export default function RentalBooking() {
  const [request, setRequest] = useState<RentalRequest>(EMPTY_RENTAL_REQUEST);
  const [submitted, setSubmitted] = useState(false);

  const handleSelectRate = (durationValue: string) => {
    setRequest((prev) => ({ ...prev, duration: durationValue }));
    scrollToBooking();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(STUDIO_WHATSAPP, rentalRequestMessage(request));
    setSubmitted(true);
  };

  return (
    <>
      <RateOptions selectedDuration={request.duration} onSelect={handleSelectRate} />
      <BookingRequestForm
        request={request}
        submitted={submitted}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}
