import activitiesJson from "./activities.json";
import { assertOneOf, fromJson } from "@/types/json";
import type { ActivitiesData, PracticeCategory } from "@/types/content";

/** Activities page catalogue and the home page highlights. */
export const ACTIVITIES = fromJson<ActivitiesData>(activitiesJson);

// A practice whose category has no filter pill would only ever show under "All".
const practiceCategories = ACTIVITIES.categories.filter((c): c is PracticeCategory => c !== "All");
ACTIVITIES.practices.forEach((p) => assertOneOf(p.category, practiceCategories, `category of practice "${p.id}"`));
