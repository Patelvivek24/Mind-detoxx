export interface PricingPlan {
  tier: string;
  price: string;
  description: string;
  buttonText: string;
  isFeatured?: boolean;
  buttonHref?: string;
}

export const HOME_PRICING_PLANS: PricingPlan[] = [
  {
    tier: "DROP-IN CLASS",
    price: "[YOUR PRICE]",
    description:
      "A single session whenever you need to recharge and reset. No commitment required.",
    buttonText: "Book a class",
    isFeatured: false,
    buttonHref: "#contact",
  },
  {
    tier: "MONTHLY MEMBERSHIP",
    price: "₹3,500",
    description:
      "The most popular choice for committed practitioners. Unlimited access to all regular weekday classes and sound healing workshops.",
    buttonText: "Get the monthly package",
    isFeatured: true,
    buttonHref: "#contact",
  },
  {
    tier: "SMALL GROUP (5 PACK)",
    price: "₹3,000",
    description:
      "Per person, per month, when five friends or colleagues commit to practice together.",
    buttonText: "Group inquiry / sign up",
    isFeatured: false,
    buttonHref: "#contact",
  },
];

export const SCHEDULE_PACKAGE_PLANS: PricingPlan[] = [
  {
    tier: "DROP-IN",
    price: "[YOUR PRICE]",
    description: "One session, any activity. Mat and props included.",
    buttonText: "Drop in today",
    isFeatured: false,
    buttonHref: "https://wa.me/919426581803?text=Hi%20Mind%20Detoxx%2C%20I%20would%20like%20to%20book%20a%20drop-in%20session.",
  },
  {
    tier: "MONTHLY",
    price: "₹3,500",
    description:
      "Per person, per month. Every session in your batch time, all four weeks.",
    buttonText: "Join monthly batch",
    isFeatured: true,
    buttonHref: "https://wa.me/919426581803?text=Hi%20Mind%20Detoxx%2C%20I%20would%20like%20to%20join%20the%20monthly%20membership.",
  },
  {
    tier: "GROUP OF FIVE",
    price: "₹3,000",
    description:
      "Per person, per month. Come with colleagues or friends and split the cost.",
    buttonText: "Inquire group rate",
    isFeatured: false,
    buttonHref: "https://wa.me/919426581803?text=Hi%20Mind%20Detoxx%2C%20we%20have%20a%20group%20of%205%20interested%20in%20joining.",
  },
];
