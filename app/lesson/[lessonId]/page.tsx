import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonLayout } from "../../../components/course/LessonLayout";
import { getJourney, journeys } from "../../../course";
import { assertJourneysValid } from "../../../course/validate";

type LessonPageProps = { params: Promise<{ lessonId: string }> };

// Only journeys in the registry exist; any other id is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  // Fails `next build` with a readable list if any journey's content is malformed.
  assertJourneysValid();

  return journeys
    .filter((journey) => journey.meta.status !== "coming-soon")
    .map((journey) => ({ lessonId: journey.meta.id }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const journey = getJourney(lessonId);

  return journey
    ? { title: `${journey.meta.title} · Mathematical Threads` }
    : { title: "Mathematical Threads" };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const journey = getJourney(lessonId);

  if (!journey || journey.meta.status === "coming-soon") notFound();

  return <LessonLayout journey={journey} />;
}
