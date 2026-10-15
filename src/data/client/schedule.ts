import scheduleJson from "./schedule.json";
import { assertOneOf, fromJson } from "@/types/json";
import type { ScheduleData } from "@/types/content";

/** Schedule page: intro, weekday highlights, timetable and packages heading. */
export const SCHEDULE = fromJson<ScheduleData>(scheduleJson);

assertOneOf(
  SCHEDULE.weekdayHighlights.defaultDay,
  SCHEDULE.weekdayHighlights.items.map((x) => x.day),
  "weekdayHighlights.defaultDay"
);
