import retreatsJson from "./retreats.json";
import { fromJson } from "@/types/json";
import type { RetreatsData } from "@/types/content";

/** Retreats page: featured retreat, upcoming events, gallery and "Find us". */
export const RETREATS = fromJson<RetreatsData>(retreatsJson);
