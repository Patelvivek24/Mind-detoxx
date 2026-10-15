import { RENTAL_DURATION_OPTIONS } from "@/data/client/studio-rental";

export interface RentalRequest {
  fullName: string;
  phone: string;
  date: string;
  duration: string;
  purpose: string;
}

export const EMPTY_RENTAL_REQUEST: RentalRequest = {
  fullName: "",
  phone: "",
  date: "",
  duration: RENTAL_DURATION_OPTIONS[0],
  purpose: "",
};

/** WhatsApp message sent when a visitor submits the "Check a date" form. */
export function rentalRequestMessage(request: RentalRequest): string {
  return `Hi Mind Detoxx Surat, I would like to check studio rental availability for weekends:\n\n• Name: ${
    request.fullName || "Not specified"
  }\n• WhatsApp: ${request.phone || "Not specified"}\n• Date: ${
    request.date || "Not specified"
  }\n• Hours Needed: ${request.duration}\n• What's it for: ${
    request.purpose || "Studio Practice / Workshop"
  }\n\nPlease let me know if this slot is available and share terms.`;
}
