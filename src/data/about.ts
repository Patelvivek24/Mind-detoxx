export interface AboutPillar {
  title: string;
  text: string;
}


export interface StudioInfo {
  heading: string;
  description: string;
  addressLines: string[];
  mapsUrl: string;
  photoLabel: string;
}

export interface HomePhilosophyData {
  headingLine1: string;
  headingLine2: string;
  paragraphs: string[];
  linkText: string;
  linkHref: string;
}

export const HOME_PHILOSOPHY_DATA: HomePhilosophyData = {
  headingLine1: "Small steps.",
  headingLine2: "Big changes.",
  paragraphs: [
    "Mind Detoxx is not about fitness trends or pushing your body to exhaustion. It's about slowing down, tuning into your breath, and cultivating deep, sustainable inner peace in an increasingly noisy world.",
    "Whether you are stepping onto a yoga mat for the first time or returning after years, our mindful classes and experienced instructors create a safe, welcoming container for your personal journey.",
  ],
  linkText: "Read our story →",
  linkHref: "/about-us",
};

export const ABOUT_HERO = {
  eyebrow: "ABOUT MIND DETOXX",
  headlineLine1: "A room in Surat where the week gets",
  headlineLine2: "put down.",
  intro:
    "Mind DetoxX opened in [YEAR] on VIP Road with one singing bowl and a handful of mats. It now runs twelve practices across four batch times a day, and the idea behind it has not moved: release first, effort second.",
};

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    title: "Release before effort",
    text: "Sound and breath settle the nervous system before anyone is asked to hold a posture. It is why beginners last here.",
  },
  {
    title: "Small batches",
    text: "Capped at [N] mats so the teacher can correct you by name rather than shout over a room.",
  },
  {
    title: "Nobody keeps up",
    text: "Every sequence is taught in three levels at once. You work at yours, not at the pace of the next mat.",
  },
];


export const STUDIO_INFO: StudioInfo = {
  heading: "The studio",
  description:
    "[SQ FT] on the second floor of the International Business Center, with daylight on two sides and rigging points for the silks. Mats, bolsters, blocks and bowls are all here — bring nothing.",
  addressLines: [
    "207, 2nd Floor, International Business Center",
    "VIP Road, Surat — 395007",
  ],
  mapsUrl:
    "https://maps.google.com/?q=International+Business+Center+VIP+Road+Surat",
  photoLabel: "[PHOTO — THE MAIN STUDIO ROOM]",
};
