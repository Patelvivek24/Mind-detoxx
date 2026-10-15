export interface RentalRateOption {
  id: string;
  tag: string;
  price: string;
  period: string;
  description: string;
  durationValue: string;
}

export const RENTAL_RATE_OPTIONS: RentalRateOption[] = [
  {
    id: "hourly",
    tag: "WEEKEND HOURLY",
    price: "₹1,500",
    period: "PER HOUR",
    description: "Saturday and Sunday, minimum 2 hours per booking.",
    durationValue: "2 Hours (Minimum)",
  },
  {
    id: "half-day",
    tag: "HALF DAY / 4 HOURS",
    price: "₹5,500",
    period: "4 CONSECUTIVE HOURS",
    description: "Outside our regular batch times, subject to the studio calendar.",
    durationValue: "Half Day (4 Hours)",
  },
  {
    id: "full-day",
    tag: "FULL DAY / 8+ HOURS",
    price: "₹9,500",
    period: "FULL DAY ACCESS",
    description:
      "For immersive workshops, teacher trainings and shoots that need the room all day.",
    durationValue: "Full Day (8+ Hours)",
  },
];

export interface HomeWeekendRentData {
  kicker: string;
  title: string;
  description: string;
  price: string;
  period: string;
  buttonText: string;
  buttonHref: string;
}

export const HOME_WEEKEND_RENT_DATA: HomeWeekendRentData = {
  kicker: "OUR SPACE IS ALSO YOURS",
  title: "Rent the space on weekends",
  description:
    "A peaceful venue for retreats, workshops, sound baths and private wellness events. The full studio and sound system is at your disposal.",
  price: "₹1,500",
  period: "PER HOUR, MIN 4 HOURS",
  buttonText: "Rent the studio",
  buttonHref: "/studio-on-rent",
};

/** "What's in the room" checklist on the Studio on Rent page. */
export const ROOM_FEATURES: string[] = [
  "10 aerial silk rigging points with tested carabiners",
  "Tibetan singing bowls, gong, chimes & sound instruments",
  "Premium high-density yoga mats, organic cotton bolsters, blocks",
  "Dual aspect natural light with privacy sheer shades",
  "Full studio Bluetooth sound system and ambient dimmers",
];

export interface RentalAudience {
  title: string;
  description: string;
}

/** "Who rents it" list on the Studio on Rent page. */
export const RENTAL_AUDIENCES: RentalAudience[] = [
  {
    title: "Visiting teachers and therapists",
    description: "From Mumbai, Ahmedabad, Delhi, or abroad holding weekend workshops.",
  },
  {
    title: "Weekend and one-day events",
    description: "Sound healing, meditation, art & therapy, flower mandalas.",
  },
  {
    title: "Corporate wellness sessions",
    description: "Bring a team for an afternoon. We can supply the teacher too.",
  },
  {
    title: "Photo and video shoots",
    description: "Daylight on two sides, neutral walls, no fixed signage in room.",
  },
];

/** Options of the "Hours needed" select; the first is the form default. */
export const RENTAL_DURATION_OPTIONS: string[] = [
  "2 Hours (Minimum)",
  "3 Hours",
  "Half Day (4 Hours)",
  "Full Day (8+ Hours)",
  "Custom Duration",
];
