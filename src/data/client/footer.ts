import footerJson from "./footer.json";
import { fromJson } from "@/types/json";
import type { FooterData } from "@/types/content";

/** Footer brand, links and slogan; contact details come from CONTACT. */
export const FOOTER = fromJson<FooterData>(footerJson);
