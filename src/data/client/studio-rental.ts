import studioRentalJson from "./studio-rental.json";
import { assertOneOf, fromJson } from "@/types/json";
import type { StudioRentalData } from "@/types/content";

/** Studio on Rent page sections and the home page weekend-rent teaser. */
export const STUDIO_RENTAL = fromJson<StudioRentalData>(studioRentalJson);

// Selecting a rate card sets the form's "Hours needed" select, so each must be a valid option.
STUDIO_RENTAL.rates.options.forEach((rate) =>
  assertOneOf(rate.durationValue, STUDIO_RENTAL.bookingForm.durationOptions, `durationValue of rate "${rate.id}"`)
);
