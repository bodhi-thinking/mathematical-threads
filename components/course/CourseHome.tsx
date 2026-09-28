import Link from 'next/link';
import { lessons } from '../../course';

export function CourseHome() {
  return (
    <main className="landing-page">
      <div className="landing-shell">

        <header className="landing-header">
          <div className="landing-kicker">
            Mathematical Thinking
          </div>

          <h1 className="landing-title">
            Learning to think mathematically.
          </h1>

          <p className="landing-subtitle">
            Stories → playgrounds → puzzles → the next question.
          </p>
        </header>

        <div className="landing-divider" />

        <section className="lesson-grid" aria-label="Mathematical Threads">
          {lessons.map((lesson, index) => {
            const isPlaceholder =
              lesson.subtitle?.toLowerCase().includes('placeholder');

            const subtitle = isPlaceholder
              ? 'A journey from sheep and pebbles to place value and zero.'
              : lesson.subtitle;

            return (
              <article className="lesson-card" key={lesson.id}>
                <div className="lesson-card-top">
                  <div className="lesson-number">
                    Series {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="lesson-mark" aria-hidden="true">
                    {index + 1}
                  </div>
                </div>

                <div className="lesson-card-content">
                  <h2>{lesson.title}</h2>

                  {subtitle && (
                    <p className="lesson-description">
                      {subtitle}
                    </p>
                  )}
                </div>

                <div className="lesson-card-footer">
                  <Link
                    className="lesson-button"
                    href={`/lesson/${lesson.id}`}
                  >
                    Begin the thread
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

      </div>
    </main>
  );
}