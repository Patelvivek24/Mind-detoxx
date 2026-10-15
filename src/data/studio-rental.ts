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

export const STUDIO_SPECS = {
  address: "207, 2nd Floor, International Business Center, VIP Road, Surat — 395007",
  whatsappNumber: "919979061803",
  whatsappUrl: "https://wa.me/919979061803",
  amenities: [
    "High ceiling with reinforced aerial silk rigging anchors",
    "Full acoustic sound system compatible with singing bowls & bluetooth",
    "Mats, bolsters, cork blocks, and meditation cushions provided",
    "Abundant natural indirect daylight from dual aspect windows",
    "Air conditioned with air filtration",
  ],
};

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
