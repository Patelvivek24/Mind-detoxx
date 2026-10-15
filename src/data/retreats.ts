export interface UpcomingEvent {
  id: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  description: string;
  highlight: string;
}

export interface StudioPhoto {
  id: number;
  src: string;
  alt: string;
  tag: string;
  title: string;
  caption: string;
}

export interface FeaturedRetreat {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  intro: string;
  featuredEvent: {
    kicker: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    whenDate: string;
    whenTime: string;
    whereVenue: string;
    whereCity: string;
    bookingType: string;
    bookingPhone: string;
    tags: string[];
  };
  notice: {
    highlight: string;
    body: string;
  };
}

export const FEATURED_RETREAT_DATA: FeaturedRetreat = {
  eyebrow: "RETREATS, EVENTS & WORKSHOPS",
  headlineLine1: "A few times a year we take the",
  headlineLine2: "practice somewhere else.",
  intro:
    "Festivals, collaborations with studios in other cities, floating sound baths — first-come basis, an advance booking is always required. Check the details below.",
  featuredEvent: {
    kicker: "NEXT UP: IN THE AM/PM POOL",
    title: "Aqua pilates & aqua yoga",
    description:
      "Embrace the flow: strengthen your core / float, balance, transform — on mats in the pool, with floating sound healing included at no extra cost.",
    image: "/images/aqua-pilates.jpg",
    imageAlt: "Aqua pilates and aqua yoga session on floating pool mats",
    whenDate: "Saturday, 19 September",
    whenTime: "18:00 – 21:00 hrs",
    whereVenue: "Club Babylon",
    whereCity: "Ahmedabad",
    bookingType: "Advance only",
    bookingPhone: "+91 94265 81803",
    tags: [
      "Floating sound healing",
      "All levels · 16+ years",
      "First session: floating sound bath",
    ],
  },
  notice: {
    highlight: "IMPORTANT NOTE:",
    body: "Advance reservation is mandatory to reserve your mat. If you are arriving from out of town, we can recommend hotels within walking distance of the venue.",
  },
};

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: "event-1",
    name: "Desert Sound & Silence Retreat",
    date: "Saturday, 24 October 2026",
    venue: "White Desert Camp",
    city: "Rann of Kutch",
    description:
      "An overnight immersion under open desert starlight featuring continuous singing bowl soundscapes, salt plain walking meditations, and sunrise pranayama.",
    highlight: "Includes eco-stay, Sattvic meals, and all bowls equipment",
  },
  {
    id: "event-2",
    name: "Monsoon Forest Breathwork Journey",
    date: "Fri 13 – Sun 15 November 2026",
    venue: "Eco Nature Sanctuary",
    city: "Saputara Hills",
    description:
      "Three restorative days of somatic breathwork, cold stream dipping, forest bathing and deep resonance surrounded by misty Western Ghat peaks.",
    highlight: "Capped at 14 mats for intimate personal guidance",
  },
  {
    id: "event-3",
    name: "Himalayan Sound Healing Immersion",
    date: "Thu 10 – Sun 13 December 2026",
    venue: "Ganga Riverside Ashram",
    city: "Rishikesh",
    description:
      "Sacred riverbank sunrise meditations, Tibetan singing bowl resonance training, Kundalini kriyas and extended silent contemplation.",
    highlight: "Advance registration required · Certificate of completion provided",
  },
  {
    id: "event-4",
    name: "Sunset Coastal Flow & Cacao Ceremony",
    date: "Sat 16 – Sun 17 January 2027",
    venue: "Oceanfront Pavilions",
    city: "Diu Coast",
    description:
      "Vinyasa waves synchronized with the tide, heart-opening ceremonial cacao, sunset gong immersion, and barefoot grounding on the shoreline.",
    highlight: "All levels welcome · Sound baths included",
  },
];

export const STUDIO_GALLERY_PHOTOS: StudioPhoto[] = [
  {
    id: 1,
    src: "/images/sound-healing.jpg",
    alt: "Sound healing bowls at Mind Detoxx",
    tag: "[PHOTO]",
    title: "Sound Healing & Singing Bowls",
    caption: "Acoustic resonance to ease physical tension and settle the mind.",
  },
  {
    id: 2,
    src: "/images/meditation.jpg",
    alt: "Mindfulness and meditation practice",
    tag: "[PHOTO]",
    title: "Meditation & Mindfulness",
    caption: "Gentle breathwork and guided stillness for inner focus.",
  },
  {
    id: 3,
    src: "/images/aerial-yoga.jpg",
    alt: "Aerial yoga silks",
    tag: "[PHOTO]",
    title: "Aerial Yoga Silks",
    caption: "Weightless spinal decompression and fluid posture alignment.",
  },
  {
    id: 4,
    src: "/images/yoga.jpg",
    alt: "Traditional Ashtanga & Vinyasa yoga",
    tag: "[PHOTO]",
    title: "Traditional Asana Practice",
    caption: "Steady physical sequences rooted in classical breath control.",
  },
  {
    id: 5,
    src: "/images/weight-loss-yoga.jpg",
    alt: "Dynamic power flow",
    tag: "[PHOTO]",
    title: "Dynamic Power Flow",
    caption: "Core activation, stamina building, and metabolic vitality.",
  },
  {
    id: 6,
    src: "/images/zumba-belly-dance.jpg",
    alt: "Rhythmic movement and belly dance",
    tag: "[PHOTO]",
    title: "Rhythmic Movement & Dance",
    caption: "Expressive cardio release and joyful bodily rhythm.",
  },
  {
    id: 7,
    src: "/images/hero-chakra.jpg",
    alt: "Chakra alignment session",
    tag: "[PHOTO]",
    title: "Chakra Alignment",
    caption: "Harmonizing energetic centers through tonal vibration.",
  },
  {
    id: 8,
    src: "/images/aqua-pilates.jpg",
    alt: "Aqua pilates floating mats",
    tag: "[PHOTO]",
    title: "Aqua Floating Mat Practice",
    caption: "Core stability, water balance, and floating sound bath.",
  },
];
