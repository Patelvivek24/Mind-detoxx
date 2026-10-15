/** Id of the "Check a date" section that rate buttons and the hero CTA scroll to. */
export const BOOKING_SECTION_ID = "check-date";

export function scrollToBooking(): void {
  document.getElementById(BOOKING_SECTION_ID)?.scrollIntoView({ behavior: "smooth" });
}
