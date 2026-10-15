import pricingJson from "./pricing.json";
import { fromJson } from "@/types/json";
import { whatsappUrl } from "@/lib/whatsapp";
import type { PricingData, PricingPlan } from "@/types/content";
import { CONTACT } from "./contact";

const pricing = fromJson<PricingData>(pricingJson);

/** Home page "Ways to join" heading and plans. */
export const HOME_PRICING = { heading: pricing.homeSection.heading, plans: pricing.homePlans };

/** Schedule page packages; each button opens a prefilled WhatsApp chat. */
export const SCHEDULE_PLANS: PricingPlan[] = pricing.schedulePlans.map(({ whatsappMessage, ...plan }) => ({
  ...plan,
  buttonHref: whatsappUrl(CONTACT.whatsapp.secondary, whatsappMessage),
}));
