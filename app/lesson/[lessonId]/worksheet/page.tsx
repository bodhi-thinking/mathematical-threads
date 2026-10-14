import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorksheetView } from "../../../../components/worksheet/WorksheetView";
import { getJourney, journeys } from "../../../../course";

type WorksheetPageProps = { params: Promise<{ lessonId: string }> };

// Only journeys that define a worksheet get this route.
export const dynamicParams = false;

export function generateStaticParams() {
  return journeys
    .filter((journey) => journey.worksheet && journey.meta.status !== "coming-soon")
    .map((journey) => ({ lessonId: journey.meta.id }));
}

export async function generateMetadata({ params }: WorksheetPageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const journey = getJourney(lessonId);

  return journey
    ? { title: `Worksheet · ${journey.meta.title} · Mathematical Threads` }
    : { title: "Mathematical Threads" };
}

export default async function WorksheetPage({ params }: WorksheetPageProps) {
  const { lessonId } = await params;
  const journey = getJourney(lessonId);

  if (!journey?.worksheet || journey.meta.status === "coming-soon") notFound();

  return (
    <WorksheetView worksheet={journey.worksheet} backHref={`/lesson/${journey.meta.id}`} />
  );
}
