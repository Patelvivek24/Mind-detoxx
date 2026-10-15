export interface ScheduleSlot {
  time: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
}

export interface WeekdayHighlight {
  day: string;
  title: string;
  description: string;
}

export const SCHEDULE_TABLE_DATA: ScheduleSlot[] = [
  {
    time: "6:00 – 7:00 AM",
    mon: "Yoga",
    tue: "Yoga",
    wed: "Yoga",
    thu: "Yoga",
    fri: "Yoga",
    sat: "Meditation",
  },
  {
    time: "8:00 – 9:00 AM",
    mon: "Weight loss yoga",
    tue: "Aerial yoga",
    wed: "Weight loss yoga",
    thu: "Aerial yoga",
    fri: "Weight loss yoga",
    sat: "Garbh sanskar",
  },
  {
    time: "12:00 – 1:00 PM",
    mon: "Sound healing",
    tue: "Sound healing",
    wed: "Sound healing",
    thu: "Sound healing",
    fri: "Sound healing",
    sat: "Tarot (by appt.)",
  },
  {
    time: "8:00 – 9:00 PM",
    mon: "Zumba",
    tue: "Belly dance",
    wed: "Air bungee",
    thu: "Zumba",
    fri: "Belly dance",
    sat: "Open practice",
  },
];

export const WEEKDAY_HIGHLIGHTS: WeekdayHighlight[] = [
  {
    day: "MONDAY",
    title: "Yoga",
    description: "Strengthen the body, calm the mind.",
  },
  {
    day: "TUESDAY",
    title: "Sound healing",
    description: "Relax, release, restore.",
  },
  {
    day: "WEDNESDAY",
    title: "Aerial yoga",
    description: "Build strength, find balance.",
  },
  {
    day: "THURSDAY",
    title: "Sound healing",
    description: "Deep relaxation, inner harmony.",
  },
  {
    day: "FRIDAY",
    title: "Yoga",
    description: "Stretch, energise, feel the change.",
  },
];
