/**
 * Journey registry — the single place that knows which journeys exist.
 *
 * To add a journey:
 *   1. Copy course/_template/ to course/NNN-your-slug/ and fill it in.
 *   2. Import it below and add it to `journeys`.
 * The homepage, the lesson route and the worksheet route pick it up from here.
 */
import type { Journey, JourneyMeta } from "../lib/course-types";
import { journey as counting } from "./001-counting";

export const journeys: Journey[] = [counting];

export function getJourney(id: string): Journey | undefined {
  return journeys.find((journey) => journey.meta.id === id);
}

export function getJourneyMetas(): JourneyMeta[] {
  return journeys.map((journey) => journey.meta);
}
