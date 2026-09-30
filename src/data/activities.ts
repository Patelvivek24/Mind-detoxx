export type ActivityCategory =
  | "All"
  | "Movement"
  | "Stillness"
  | "Healing"
  | "Guidance";

export interface ActivityItem {
  id: string;
  title: string;
  category: "Movement" | "Stillness" | "Healing" | "Guidance";
  metaTag: string;
  durationOrType: string;
  description: string;
  image?: string;
  placeholderLabel?: string;
}

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  "All",
  "Movement",
  "Stillness",
  "Healing",
  "Guidance",
];

export const ALL_PRACTICES: ActivityItem[] = [
  {
    id: "yoga",
    title: "Yoga",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "60 MIN",
    description:
      "Hatha and vinyasa. Strength, flexibility and a quieter head, taught at three levels at once.",
    image: "/images/yoga.jpg",
  },
  {
    id: "weight-loss-yoga",
    title: "Weight loss yoga",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "60 MIN",
    description:
      "Strength, sweat and breath in one progressive sequence you can grow into over a few weeks.",
    image: "/images/weight-loss-yoga.jpg",
  },
  {
    id: "aerial-yoga",
    title: "Aerial yoga",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "60 MIN",
    description:
      "Silks take the load off the spine and open the hips in ways the floor cannot. Beginners welcome.",
    image: "/images/aerial-yoga.jpg",
  },
  {
    id: "air-bungee",
    title: "Air bungee",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "45 MIN",
    description:
      "Suspension training that gets the heart rate up without putting it through the knees.",
    placeholderLabel: "[PHOTO — AIR BUNGEE]",
  },
  {
    id: "zumba",
    title: "Zumba",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "60 MIN",
    description:
      "Cardio that does not feel like cardio. Come for the hour, leave having forgotten the day.",
    placeholderLabel: "[PHOTO — ZUMBA]",
  },
  {
    id: "belly-dance",
    title: "Belly dance",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "60 MIN",
    description:
      "Core control learned through rhythm instead of repetition. No dance background needed.",
    placeholderLabel: "[PHOTO — BELLY DANCE]",
  },
  {
    id: "sound-healing",
    title: "Sound healing",
    category: "Healing",
    metaTag: "HEALING",
    durationOrType: "60 MIN",
    description:
      "Himalayan bowls played close enough to feel. The breath slows before you decide to slow it.",
    image: "/images/sound-healing.jpg",
  },
  {
    id: "osho-meditation",
    title: "Osho meditation",
    category: "Stillness",
    metaTag: "STILLNESS",
    durationOrType: "45 MIN",
    description:
      "Active, cathartic techniques that move the energy before asking you to be still.",
    image: "/images/meditation.jpg",
  },
  {
    id: "garbh-sanskar",
    title: "Garbh sanskar",
    category: "Healing",
    metaTag: "HEALING",
    durationOrType: "COURSE",
    description:
      "Prenatal practice for mother and child, guided week by week through the pregnancy.",
    placeholderLabel: "[PHOTO — GARBH SANSKAR]",
  },
  {
    id: "aqua-pilates-yoga",
    title: "Aqua pilates & yoga",
    category: "Movement",
    metaTag: "MOVEMENT",
    durationOrType: "EVENTS ONLY",
    description:
      "Floating mats in a pool. Low impact, high result — the water carries your joints while the core works.",
    image: "/images/aqua-pilates.jpg",
  },
  {
    id: "tarot-reading",
    title: "Tarot reading",
    category: "Guidance",
    metaTag: "GUIDANCE",
    durationOrType: "1 TO 1",
    description:
      "A structured conversation with what you already half-know. By appointment.",
    placeholderLabel: "[PHOTO — TAROT]",
  },
  {
    id: "vastu-interiors",
    title: "Vastu & interiors",
    category: "Guidance",
    metaTag: "GUIDANCE",
    durationOrType: "ON SITE",
    description:
      "Reading a space honestly, correcting what it does to the people in it, then designing it around how you want to feel.",
    placeholderLabel: "[PHOTO — VASTU]",
  },
];

export interface HomeActivityItem {
  title: string;
  image: string;
  description: string;
  meta: string;
}

export const HOME_ACTIVITIES: HomeActivityItem[] = [
  {
    title: "Yoga",
    image: "/images/yoga.jpg",
    description:
      "Traditional asana and breathwork for flexibility, strength and inner balance.",
    meta: "MON–FRI · 60 MIN SESSIONS",
  },
  {
    title: "Sound healing",
    image: "/images/sound-healing.jpg",
    description:
      "Vibrational therapy using Tibetan singing bowls to reduce stress and reset your nervous system.",
    meta: "SPECIAL SESSIONS & WORKSHOPS",
  },
  {
    title: "Aerial yoga",
    image: "/images/aerial-yoga.jpg",
    description:
      "Decompress the spine and build core strength suspended in soft, supportive aerial silks.",
    meta: "ALL LEVELS · 45 MIN SESSIONS",
  },
  {
    title: "Meditation",
    image: "/images/meditation.jpg",
    description:
      "Guided practice to quiet the mental chatter, reduce anxiety, and reconnect with your inner stillness.",
    meta: "DAILY · MORNING & EVENING",
  },
  {
    title: "Zumba & belly dance",
    image: "/images/zumba-belly-dance.jpg",
    description:
      "Joyful, high-energy movement combining aerobic dance with fluid, expressive body isolations.",
    meta: "WEEKLY · HIGH ENERGY",
  },
  {
    title: "Aqua pilates",
    image: "/images/aqua-pilates.jpg",
    description:
      "Core conditioning and low-impact resistance training performed on floating aquatic mats.",
    meta: "WEEKEND SESSIONS",
  },
];
