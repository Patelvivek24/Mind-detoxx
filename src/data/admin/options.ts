import optionsJson from './options.json';
import { fromJson } from '@/types/json';

/** Option lists for admin dropdowns and table filters, in display order. */
export interface AdminOptions {
  activityCategories: string[];
  activityModes: string[];
  planTypes: string[];
  bookingTypes: string[];
  bookingPaymentStates: string[];
  bookingStatuses: string[];
  /** Bookings table filter order (differs from the form's status order). */
  bookingStatusFilters: string[];
  rentalStatuses: string[];
  rentalPaymentStates: string[];
  sessionStatuses: string[];
  enquiryTypes: string[];
  enquiryStatuses: string[];
}

export const ADMIN_OPTIONS = fromJson<AdminOptions>(optionsJson);
