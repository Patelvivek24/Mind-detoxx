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
  Image as ImageIcon,
  Settings2,
  type LucideIcon,
} from 'lucide-react';

export type AdminNavKey =
  | 'dashboard'
  | 'schedule'
  | 'bookings'
  | 'plans'
  | 'activities'
  | 'events'
  | 'rentals'
  | 'enquiries'
  | 'payments'
  | 'home'
  | 'about'
  | 'retreatsContent'
  | 'rentalContent'
  | 'media'
  | 'settings';

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

export const navGroupsData: NavGroupDef[] = [
  {
    group: 'Overview',
    items: [
      {
        key: 'dashboard',
        label: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
        title: 'Dashboard',
        description: 'Your studio at a glance',
        eyebrow: 'MIND DETOXX / DASHBOARD',
      },
      {
        key: 'schedule',
        label: 'Class calendar',
        href: '/admin/schedule',
        icon: CalendarDays,
        title: 'Class calendar',
        description: 'Build recurring weeks and manage individual dates',
        eyebrow: 'MIND DETOXX / SCHEDULE',
      },
      {
        key: 'bookings',
        label: 'Bookings',
        href: '/admin/bookings',
        icon: BookOpen,
        title: 'Bookings',
        description: 'Class, membership, event and rental requests',
        eyebrow: 'MIND DETOXX / BOOKINGS',
      },
      {
        key: 'plans',
        label: 'Plans & memberships',
        href: '/admin/plans',
        icon: UsersRound,
        title: 'Plans & memberships',
        description: 'Manage drop-in and subscription offerings',
        eyebrow: 'MIND DETOXX / PLANS',
      },
    ],
  },
  {
    group: 'Manage',
    items: [
      {
        key: 'activities',
        label: 'Activities',
        href: '/admin/activities',
        icon: Sparkles,
        title: 'Activities catalogue',
        description: 'The public catalogue of studio practices',
        eyebrow: 'MIND DETOXX / ACTIVITIES',
      },
      {
        key: 'events',
        label: 'Events & retreats',
        href: '/admin/events',
        icon: PartyPopper,
        title: 'Events & retreats',
        description: 'Publish events and manage ticket capacity',
        eyebrow: 'MIND DETOXX / EVENTS',
      },
      {
        key: 'rentals',
        label: 'Studio rentals',
        href: '/admin/rentals',
        icon: Building2,
        title: 'Studio rentals',
        description: 'Availability and studio rental enquiries',
        eyebrow: 'MIND DETOXX / RENTALS',
      },
      {
        key: 'enquiries',
        label: 'Enquiries',
        href: '/admin/enquiries',
        icon: MessageCircle,
        title: 'Enquiries',
        description: 'All incoming requests in one place',
        eyebrow: 'MIND DETOXX / ENQUIRIES',
      },
      {
        key: 'payments',
        label: 'Payments',
        href: '/admin/payments',
        icon: WalletCards,
        title: 'Payments',
        description: 'A demonstration ledger of payment status',
        eyebrow: 'MIND DETOXX / PAYMENTS',
      },
    ],
  },
  {
    group: 'Website content',
    items: [
      {
        key: 'home',
        label: 'Home page',
        href: '/admin/content/home',
        icon: House,
        title: 'Home page',
        description: 'Edit the content visitors see on the home page',
        eyebrow: 'MIND DETOXX / CONTENT / HOME',
      },
      {
        key: 'about',
        label: 'About us',
        href: '/admin/content/about',
        icon: Info,
        title: 'About us',
        description: 'Studio story, team and location',
        eyebrow: 'MIND DETOXX / CONTENT / ABOUT',
      },
      {
        key: 'retreatsContent',
        label: 'Retreats page',
        href: '/admin/content/retreats',
        icon: PartyPopper,
        title: 'Retreats page',
        description: 'Introduction to retreats and workshops',
        eyebrow: 'MIND DETOXX / CONTENT / RETREATS',
      },
      {
        key: 'rentalContent',
        label: 'Rental page',
        href: '/admin/content/rental',
        icon: Building2,
        title: 'Rental page',
        description: 'Rental page copy and facilities',
        eyebrow: 'MIND DETOXX / CONTENT / RENTAL',
      },
      {
        key: 'media',
        label: 'Media library',
        href: '/admin/media',
        icon: ImageIcon,
        title: 'Media library',
        description: 'Upload images and video for public pages',
        eyebrow: 'MIND DETOXX / MEDIA',
      },
    ],
  },
  {
    group: 'System',
    items: [
      {
        key: 'settings',
        label: 'Settings',
        href: '/admin/settings',
        icon: Settings2,
        title: 'Settings',
        description: 'Contact details, publishing and access',
        eyebrow: 'MIND DETOXX / SETTINGS',
      },
    ],
  },
];

export const ADMIN_HOME_HREF = '/admin';

const navItems: NavItemDef[] = navGroupsData.flatMap((group) => group.items);

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
