import contactJson from "./contact.json";
import { fromJson } from "@/types/json";
import type { ContactData } from "@/types/content";

/** Address, phone, WhatsApp, email, Instagram and map links — the single source for all pages. */
export const CONTACT = fromJson<ContactData>(contactJson);
