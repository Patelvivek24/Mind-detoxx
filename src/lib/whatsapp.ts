/** Builds a wa.me deep link. The optional message is URL-encoded as the prefilled text. */
export function whatsappUrl(number: string, message?: string): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Opens a WhatsApp chat in a new tab. Browser-only: call from event handlers. */
export function openWhatsApp(number: string, message: string): void {
  window.open(whatsappUrl(number, message), "_blank");
}
