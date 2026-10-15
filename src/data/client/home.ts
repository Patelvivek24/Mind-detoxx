import homeJson from "./home.json";
import { assertOneOf, fromJson } from "@/types/json";
import type { HomeData } from "@/types/content";

/** Home page: hero banner, mantra ticker and closing call-to-action. */
export const HOME = fromJson<HomeData>(homeJson);

HOME.hero.ctas.forEach((cta) => assertOneOf(cta.variant, ["primary", "secondary"], "hero CTA variant"));
