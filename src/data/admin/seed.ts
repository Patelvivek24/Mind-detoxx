import seedJson from './seed.json';
import { fromJson } from '@/types/json';
import type { StudioDB } from '@/types/studio';

/**
 * Starting dataset for the admin demo (and the GET /api/studio response).
 * Admin edits are kept in the browser by StudioProvider and never written back here,
 * so this file is only the fixture a fresh browser starts from.
 */
export const initialStudioData = fromJson<StudioDB>(seedJson);
