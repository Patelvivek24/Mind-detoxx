"use client";

import React, { useState } from "react";
import { openWhatsApp } from "@/lib/whatsapp";
import type { PhoneNumber, StudioRentalData } from "@/types/content";
import RateOptions from "./RateOptions";
import BookingRequestForm from "./BookingRequestForm";
import {
  emptyRentalRequest,
  rentalRequestMessage,
  type RentalRequest,
} from "./rentalRequest";
import { scrollToBooking } from "./scrollToBooking";

interface RentalBookingProps {
  rates: StudioRentalData["rates"];
  form: StudioRentalData["bookingForm"];
  whatsappNumber: string;
  callNumbers: PhoneNumber[];
}

/**
 * Rates + "Check a date" form. They share the selected duration, so the request
 * state lives here and both sections stay presentational.
 */
export default function RentalBooking({ rates, form, whatsappNumber, callNumbers }: RentalBookingProps) {
  const [request, setRequest] = useState<RentalRequest>(() =>
    emptyRentalRequest(form.durationOptions[0])
  );
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
    openWhatsApp(whatsappNumber, rentalRequestMessage(request));
    setSubmitted(true);
  };

  return (
    <>
      <RateOptions rates={rates} selectedDuration={request.duration} onSelect={handleSelectRate} />
      <BookingRequestForm
        form={form}
        callNumbers={callNumbers}
        request={request}
        submitted={submitted}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}
