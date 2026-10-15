import navigationJson from "./navigation.json";
import logoImg from "../../../public/images/mind-detoxx-logo.png";
import { fromJson } from "@/types/json";
import type { NavigationData } from "@/types/content";

const navigation = fromJson<NavigationData>(navigationJson);

/** Site header: brand, links and CTA. The logo is a static import so Next can size and optimise it. */
export const NAVIGATION = {
  ...navigation,
  brand: { ...navigation.brand, logo: { ...navigation.brand.logo, src: logoImg } },
};

export type SiteNavigation = typeof NAVIGATION;
