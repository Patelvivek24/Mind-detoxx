import type { StaticImageData } from "next/image";
import logoImg from "../../public/images/mind-detoxx-logo.png";

export interface NavLinkItem {
  readonly href: string;
  readonly label: string;
  readonly aliases?: readonly string[];
}

export interface NavBrandConfig {
  readonly name: string;
  readonly href: string;
  readonly ariaLabel: string;
  readonly logo: {
    readonly src: StaticImageData | string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
    readonly sizes: string;
    readonly priority: boolean;
  };
}

export interface NavCtaConfig {
  readonly label: string;
  readonly href: string;
}

export const BRAND_CONFIG: NavBrandConfig = {
  name: "Mind Detoxx",
  href: "/",
  ariaLabel: "Mind Detoxx Home",
  logo: {
    src: logoImg,
    alt: "Mind Detoxx",
    width: 60,
    height: 60,
    sizes: "60px",
    priority: true,
  },
};

export const NAV_LINKS: readonly NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About us", aliases: ["/about"] },
  { href: "/activities", label: "Activities" },
  { href: "/schedule", label: "Schedule" },
  { href: "/retreats", label: "Retreats" },
  { href: "/studio-on-rent", label: "Studio on rent" },
] as const;

export const CTA_CONFIG: NavCtaConfig = {
  label: "Book now",
  href: "/#contact",
};
