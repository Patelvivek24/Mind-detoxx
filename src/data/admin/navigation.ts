import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  UsersRound,
  Sparkles,
  PartyPopper,
  Building2,
  MessageCircle,
  WalletCards,
  House,
  Info,
  Image,
  Settings2,
  type LucideIcon,
} from 'lucide-react';
import navigationJson from './navigation.json';
import { assertOneOf } from '@/types/json';

/** Icons the nav JSON may reference by name. Add an icon here before using it in navigation.json. */
const NAV_ICONS = {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  UsersRound,
  Sparkles,
  PartyPopper,
  Building2,
  MessageCircle,
  WalletCards,
  House,
  Info,
  Image,
  Settings2,
} satisfies Record<string, LucideIcon>;

/** Every admin screen; each must have exactly one entry in navigation.json. */
export const ADMIN_NAV_KEYS = [
  'dashboard',
  'schedule',
  'bookings',
  'plans',
  'activities',
  'events',
  'rentals',
  'enquiries',
  'payments',
  'home',
  'about',
  'retreatsContent',
  'rentalContent',
  'media',
  'settings',
] as const;

export type AdminNavKey = (typeof ADMIN_NAV_KEYS)[number];

export interface NavItemDef {
  key: AdminNavKey;
  label: string;
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  eyebrow: string;
}

export interface NavGroupDef {
  group: string;
  items: NavItemDef[];
}

/** Sidebar groups, loaded from navigation.json with icon names resolved to components. */
export const navGroupsData: NavGroupDef[] = navigationJson.map((group) => ({
  group: group.group,
  items: group.items.map((item) => ({
    ...item,
    key: assertOneOf(item.key, ADMIN_NAV_KEYS, 'admin nav key'),
    icon: NAV_ICONS[assertOneOf(item.icon, Object.keys(NAV_ICONS) as (keyof typeof NAV_ICONS)[], 'admin nav icon')],
  })),
}));

export const ADMIN_HOME_HREF = '/admin';

const navItems: NavItemDef[] = navGroupsData.flatMap((group) => group.items);

// Every screen's PageHeading reads its nav entry, so a missing key would crash that page.
ADMIN_NAV_KEYS.forEach((key) => {
  if (navItems.filter((x) => x.key === key).length !== 1) {
    throw new Error(`navigation.json must contain exactly one entry for "${key}"`);
  }
});

/** Heading/metadata source for an admin screen; every screen has exactly one nav entry. */
export function getAdminNavItem(key: AdminNavKey): NavItemDef {
  const item = navItems.find((x) => x.key === key);
  if (!item) throw new Error(`Unknown admin nav key: ${key}`);
  return item;
}

/** The dashboard matches only exactly; every other section also matches its sub-routes. */
export function isNavItemActive(href: string, pathname: string): boolean {
  return href === ADMIN_HOME_HREF ? pathname === ADMIN_HOME_HREF : pathname.startsWith(href);
}

/** The nav item for the current route, if any. */
export function findActiveNavItem(pathname: string): NavItemDef | undefined {
  return navItems.find((x) => isNavItemActive(x.href, pathname));
}
