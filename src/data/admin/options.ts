import type { ActivityCategory, EnquiryStatus } from '@/types/studio';

/** Shared by the activity form and the activities table filter. */
export const ACTIVITY_CATEGORIES: ActivityCategory[] = ['Movement', 'Healing', 'Stillness', 'Guidance'];

/** Shared by the enquiry form and the enquiries table filter. */
export const ENQUIRY_STATUSES: EnquiryStatus[] = ['New', 'Contacted', 'Resolved'];
