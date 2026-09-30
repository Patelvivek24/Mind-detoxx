export interface HeroCta {
  readonly label: string;
  readonly href: string;
  readonly variant: "primary" | "secondary";
  readonly ariaLabel?: string;
}

export interface HeroVideoConfig {
  readonly src: string;
  readonly poster?: string;
  readonly type?: string;
  readonly fallbackMessage: string;
}

export interface HeroControlsLabels {
  readonly play: string;
  readonly pause: string;
  readonly mute: string;
  readonly unmute: string;
}

export interface HeroContent {
  readonly kicker: {
    readonly items: readonly string[];
    readonly separator?: string;
    readonly pulse: boolean;
  };
  readonly heading: {
    readonly line1: string;
    readonly line2: string;
  };
  readonly description: string;
  readonly ctas: readonly HeroCta[];
  readonly video: HeroVideoConfig;
  readonly controlsLabels: HeroControlsLabels;
}

export const HERO_DATA: HeroContent = {
  kicker: {
    items: ["YOGA", "BREATHWORK", "RETREATS"],
    separator: "•",
    pulse: true,
  },
  heading: {
    line1: "Detox the mind,",
    line2: "in motion",
  },
  description:
    "A calm space to slow down, unclutter your thoughts and come back to yourself — one breath at a time. A yoga & wellness studio on VIP Road, Surat.",
  ctas: [
    {
      label: "Book a Class",
      href: "/#contact",
      variant: "primary",
      ariaLabel: "Book a class at Mind Detoxx",
    },
    {
      label: "See Schedule",
      href: "/schedule",
      variant: "secondary",
      ariaLabel: "View class schedule",
    },
  ],
  video: {
    src: "/video/mind-detoxx-banner-video.mp4",
    poster: "/images/hero-chakra.jpg",
    type: "video/mp4",
    fallbackMessage: "Your browser does not support HTML5 video.",
  },
  controlsLabels: {
    play: "Play background video",
    pause: "Pause background video",
    mute: "Mute background video",
    unmute: "Unmute background video",
  },
} as const;
