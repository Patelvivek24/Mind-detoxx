import aboutJson from "./about.json";
import { fromJson } from "@/types/json";
import type { AboutData } from "@/types/content";

/** About page sections and the home page philosophy teaser. */
export const ABOUT = fromJson<AboutData>(aboutJson);
