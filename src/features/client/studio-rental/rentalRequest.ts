export interface RentalRequest {
  fullName: string;
  phone: string;
  date: string;
  duration: string;
  purpose: string;
}

/** Blank form state; `defaultDuration` is the first "Hours needed" option. */
export function emptyRentalRequest(defaultDuration: string): RentalRequest {
  return { fullName: "", phone: "", date: "", duration: defaultDuration, purpose: "" };
}

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
