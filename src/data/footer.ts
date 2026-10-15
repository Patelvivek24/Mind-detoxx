export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterData {
  brandName: string;
  addressLines: string[];
  links: FooterLink[];
  phone: string;
  phoneDisplay: string;
  instagramHandle: string;
  instagramUrl: string;
  slogan: string;
}

export const FOOTER_DATA: FooterData = {
  brandName: "MIND DETOXX",
  addressLines: [
    "207, 2nd Floor, International Business Center",
    "VIP Road, Surat — 395007",
  ],
  links: [
    { label: "About us", href: "/about-us" },
    { label: "Activities", href: "/activities" },
    { label: "Schedule & membership", href: "/schedule" },
    { label: "Retreats & workshops", href: "/retreats" },
    { label: "Studio on rent", href: "/studio-on-rent" },
  ],
  phone: "tel:+919979061803",
  phoneDisplay: "+91 99790 61803",
  instagramHandle: "@mind.detoxx.surat",
  instagramUrl: "https://instagram.com/mind.detoxx.surat",
  slogan: "FREE THE MIND. ELEVATE THE SOUL.",
};
