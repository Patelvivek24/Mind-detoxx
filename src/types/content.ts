/**
 * Shapes of the public website's static content (src/data/client/*.json).
 * Each `…Data` interface describes one JSON file; the rest are its parts.
 */

// ── contact.json ────────────────────────────────────────────────────────────
export interface PhoneNumber {
  /** As shown to visitors, e.g. "+91 99790 61803". */
  display: string;
  /** For tel: links, e.g. "+919979061803". */
  tel: string;
}

export interface ContactData {
  address: { lines: string[] };
  /**
   * wa.me numbers (country code, no "+"). `primary` handles activities, membership, rentals
   * and the home CTA; `secondary` is used on the Retreats page and the schedule-page plans.
   */
  whatsapp: { primary: string; secondary: string };
  /** `primary`/`secondary` are the same lines as above; `additional` appears on the rental form. */
  phones: { primary: PhoneNumber; secondary: PhoneNumber; additional: PhoneNumber };
  email: string;
  instagram: { handle: string; url: string };
  maps: { directionsUrl: string; embedUrl: string };
}

// ── home.json ───────────────────────────────────────────────────────────────
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

export interface CallToActionData {
  headingLine1: string;
  headingLine2: string;
  subtitle: string;
  /** Button text prefix; the studio phone number is appended. */
  whatsappLabel: string;
  scheduleText: string;
  scheduleHref: string;
}

export interface HomeData {
  hero: HeroContent;
  mantras: string[];
  callToAction: CallToActionData;
}

// ── about.json ──────────────────────────────────────────────────────────────
export interface AboutPillar {
  id: string;
  title: string;
  text: string;
}

export interface HomePhilosophyData {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  paragraphs: string[];
  linkText: string;
  linkHref: string;
}

export interface AboutData {
  homePhilosophy: HomePhilosophyData;
  hero: { eyebrow: string; headlineLine1: string; headlineLine2: string; intro: string };
  pillars: AboutPillar[];
  studio: {
    heading: string;
    description: string;
    photoLabel: string;
    directionsLabel: string;
  };
}

// ── activities.json ─────────────────────────────────────────────────────────
export type PracticeCategory = "Movement" | "Stillness" | "Healing" | "Guidance";
/** Filter pill value on /activities ("All" shows every practice). */
export type ActivityCategory = "All" | PracticeCategory;

export interface ActivityItem {
  id: string;
  title: string;
  category: PracticeCategory;
  metaTag: string;
  durationOrType: string;
  description: string;
  image?: string;
  placeholderLabel?: string;
}

export interface HomeActivityItem {
  id: string;
  title: string;
  image: string;
  description: string;
  meta: string;
}

export interface ActivitiesData {
  categories: ActivityCategory[];
  page: {
    eyebrow: string;
    title: string;
    titleLine2: string;
    subtitle: string;
    guidance: { title: string; text: string; buttonLabel: string; whatsappMessage: string };
  };
  practices: ActivityItem[];
  homeSection: { heading: string; viewAllLabel: string; viewAllHref: string };
  homeHighlights: HomeActivityItem[];
}

// ── footer.json ─────────────────────────────────────────────────────────────
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterData {
  brandName: string;
  links: FooterLink[];
  slogan: string;
}

// ── navigation.json ─────────────────────────────────────────────────────────
export interface NavLinkItem {
  readonly href: string;
  readonly label: string;
  /** Other paths that should highlight this link (e.g. "/about" → "/about-us"). */
  readonly aliases?: readonly string[];
}

export interface NavigationData {
  /** Logo image itself is a static import in data/client/navigation.ts. */
  brand: {
    name: string;
    href: string;
    ariaLabel: string;
    logo: { alt: string; width: number; height: number; sizes: string; priority: boolean };
  };
  links: NavLinkItem[];
  cta: { label: string; href: string };
}

// ── pricing.json ────────────────────────────────────────────────────────────
/** A plan as rendered by PricingCard. */
export interface PricingPlan {
  id: string;
  tier: string;
  price: string;
  description: string;
  buttonText: string;
  isFeatured?: boolean;
  buttonHref?: string;
}

/** Schedule-page plans link to a prefilled WhatsApp message instead of a fixed href. */
export interface WhatsAppPricingPlan extends Omit<PricingPlan, "buttonHref"> {
  whatsappMessage: string;
}

export interface PricingData {
  homeSection: { heading: string };
  homePlans: PricingPlan[];
  schedulePlans: WhatsAppPricingPlan[];
}

// ── retreats.json ───────────────────────────────────────────────────────────
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
    tags: string[];
    reserveLabel: string;
  };
  notice: {
    highlight: string;
    body: string;
  };
}

export interface RetreatsData {
  featured: FeaturedRetreat;
  upcomingEvents: { heading: string; enquireLabel: string; events: UpcomingEvent[] };
  gallery: { heading: string; photos: StudioPhoto[] };
  findUs: {
    heading: string;
    studioLabel: string;
    contactLabel: string;
    firstVisitLabel: string;
    firstVisitText: string;
    whatsappLabel: string;
    whatsappMessage: string;
    mapTag: string;
    mapLinkLabel: string;
    mapTitle: string;
  };
}

// ── schedule.json ───────────────────────────────────────────────────────────
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

export interface ScheduleData {
  page: { eyebrow: string; headlineLine1: string; headlineLine2: string; intro: string };
  weekdayHighlights: { defaultDay: string; items: WeekdayHighlight[] };
  timetable: { title: string; badge: string; timeColumnLabel: string; rows: ScheduleSlot[] };
  packages: { heading: string; subtitle: string };
}

// ── studio-rental.json ──────────────────────────────────────────────────────
export interface RentalRateOption {
  id: string;
  tag: string;
  price: string;
  period: string;
  description: string;
  /** Must match one of bookingForm.durationOptions; selecting the rate sets the form. */
  durationValue: string;
}

export interface RentalAudience {
  id: string;
  title: string;
  description: string;
}

export interface HomeWeekendRentData {
  kicker: string;
  title: string;
  description: string;
  price: string;
  period: string;
  buttonText: string;
  buttonHref: string;
}

export interface StudioRentalData {
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    intro: string;
    price: string;
    priceUnit: string;
    buttonLabel: string;
    auraTag: string;
  };
  room: {
    featuresHeading: string;
    features: string[];
    audiencesHeading: string;
    audiences: RentalAudience[];
  };
  rates: {
    heading: string;
    options: RentalRateOption[];
    selectedLabel: string;
    selectLabel: string;
    finePrint: string[];
  };
  bookingForm: {
    heading: string;
    subtitle: string;
    /** The first option is the form's default. */
    durationOptions: string[];
    submitLabel: string;
    orCallLabel: string;
    successMessage: string;
  };
  homeTeaser: HomeWeekendRentData;
}
