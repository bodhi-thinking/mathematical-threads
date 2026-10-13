import Link from 'next/link';
import { lessons } from '../../course';

/* Decorative icons for the four "How the journey works" cards. */

function IconTablet() {
  const gradientId = 'tablet-shade';

  return (
    <svg
      viewBox="0 0 120 80"
      className="journey-icon"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#5b3a1c" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      <rect
        x="8"
        y="10"
        width="104"
        height="62"
        rx="16"
        fill="#d7bd94"
        stroke="#8a6a44"
        strokeWidth="1.5"
      />

      <rect
        x="8"
        y="10"
        width="104"
        height="62"
        rx="16"
        fill={`url(#${gradientId})`}
      />

      <g
        stroke="#4a3320"
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        <path d="M24 26v14M31 26v14M38 26v14M45 26v14M52 26v14" />
        <path d="M66 26v14M73 26v14M80 26v14M87 26v14M94 26v14" />
        <path d="M24 48v14M31 48v14M38 48v14M45 48v14" />
        <path d="M60 48l10 14M70 48l-10 14M80 48v14M87 48v14" />
      </g>
    </svg>
  );
}

function IconBlocks() {
  const cube = (x: number, y: number, s: number) => (
    <g key={`${x}-${y}`}>
      <polygon
        points={`${x},${y} ${x + s},${y - s / 2} ${x + 2 * s},${y} ${x + s},${y + s / 2}`}
        fill="#e6c999"
        stroke="#8a6a44"
        strokeWidth="1"
      />
      <polygon
        points={`${x},${y} ${x + s},${y + s / 2} ${x + s},${y + s * 1.5} ${x},${y + s}`}
        fill="#c99d68"
        stroke="#8a6a44"
        strokeWidth="1"
      />
      <polygon
        points={`${x + s},${y + s / 2} ${x + 2 * s},${y} ${x + 2 * s},${y + s} ${x + s},${y + s * 1.5}`}
        fill="#b3844f"
        stroke="#8a6a44"
        strokeWidth="1"
      />
    </g>
  );

  return (
    <svg
      viewBox="0 0 120 80"
      className="journey-icon"
      aria-hidden="true"
      focusable="false"
    >
      {cube(30, 36, 14)}
      {cube(58, 36, 14)}
      {cube(44, 24, 14)}
      {cube(44, 48, 14)}
      {cube(86, 54, 10)}
      {cube(14, 56, 10)}
    </svg>
  );
}

function IconWorksheet() {
  return (
    <svg
      viewBox="0 0 120 80"
      className="journey-icon"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="rotate(-6 50 42)">
        <rect
          x="18"
          y="8"
          width="64"
          height="62"
          fill="#f3e8d0"
          stroke="#8a6a44"
          strokeWidth="1.2"
        />

        <g stroke="#9c7f58" strokeWidth="0.9">
          <path d="M28 26h44M28 38h44M28 50h44M28 62h44" />
          <path d="M36 18v50M50 18v50M64 18v50" />
        </g>

        <path
          d="M24 14h50"
          stroke="#6a4f31"
          strokeWidth="1.6"
          strokeDasharray="3 2"
        />
      </g>

      <g transform="rotate(38 88 40)">
        <rect
          x="80"
          y="14"
          width="9"
          height="52"
          fill="#c07f3e"
          stroke="#7a4a1c"
          strokeWidth="1"
        />
        <polygon
          points="80,66 89,66 84.5,76"
          fill="#e6c999"
          stroke="#7a4a1c"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}

function IconStar() {
  return (
    <svg
      viewBox="0 0 120 80"
      className="journey-icon"
      aria-hidden="true"
      focusable="false"
    >
      <polygon
        points="60,6 70,28 92,20 82,40 104,48 80,54 80,74 64,58 46,74 46,54 18,50 40,40 28,20 50,28"
        fill="#d7ae77"
        stroke="#8a6a44"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />

      <polygon
        points="60,6 70,28 60,40 50,28"
        fill="#ecd1a2"
      />

      <polygon
        points="104,48 80,54 60,40 82,40"
        fill="#b88a55"
      />

      <polygon
        points="46,74 46,54 60,40 64,58"
        fill="#a67a47"
      />

      <polygon
        points="18,50 40,40 60,40 46,54"
        fill="#c79a63"
      />
    </svg>
  );
}

const journeyCards = [
  {
    title: 'History',
    Icon: IconTablet,
    top: [
      'We begin by going back. You will meet the questions people were trying to solve long before mathematics looked like the subject you see in school.',
    ],
    bottom: [
      'The stories help you see mathematics as something people figured out, not something that simply appeared in a textbook.',
    ],
  },
  {
    title: 'Playground',
    Icon: IconBlocks,
    top: [
      'Then you get to experiment. Move things. Change numbers. Build patterns. Try something completely different.',
    ],
    bottom: [
      'The Playground is where you can play with an idea and see what it does. Sometimes you will discover the rule before anyone tells you what the rule is.',
    ],
  },
  {
    title: 'Worksheets',
    Icon: IconWorksheet,
    top: [
      'This is where the investigation gets serious. The worksheets give you problems to solve, patterns to notice and things to figure out.',
    ],
    bottom: [
      "And hidden among them are Lilavati's clues. So keep your answers. You never know when one of them might become useful.",
    ],
  },
  {
    title: 'Classic Puzzles',
    Icon: IconStar,
    top: [
      'Finally, you meet some puzzles that have been around for a very long time.',
    ],
    bottom: [
      'Some are quick. Some are tricky. Some might completely fool you the first time. They are not there just to check whether you understood the lesson.',
      'They are there to make you think.',
    ],
  },
];

export function CourseHome() {
  return (
    <main className="landing-page">
      <div className="landing-shell">

        <section
          className="thread-hero"
          aria-labelledby="thread-title"
        >
          <div className="thread-hero-copy">
            <div className="landing-kicker">
              Mathematical Threads
            </div>

            <h1 id="thread-title">
              The Search for the
              <br />
              Missing Thread
            </h1>

            <div className="thread-opening">
              <p>
                Mathematics began with questions.
              </p>

              <p>
                Across centuries, people found ways to count, measure, recognise patterns and make sense of the world. 
                Each discovery opened the door to another.
              </p>

              <p>
                Follow Lilavati through this unfolding story. There are ideas to discover, puzzles to solve, and a missing thread waiting to be found.
              </p>
            </div>

            <a
              className="thread-cta"
              href="#course-entry"
            >
              Begin the Journey
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="thread-envelope-wrap">
            <svg
              className="thread-sketch"
              viewBox="0 0 220 220"
              aria-hidden="true"
              focusable="false"
            >
              <g
                fill="none"
                stroke="#a8916b"
                strokeWidth="0.8"
                opacity="0.7"
              >
                <circle cx="110" cy="110" r="90" />
                <circle cx="110" cy="110" r="62" />
                <circle cx="110" cy="110" r="30" />
                <path d="M20 110h180M110 20v180M46 46l128 128M174 46L46 174" />
                <path d="M110 20l78 135H32z" />
              </g>
            </svg>

            <svg
              className="thread-leaves"
              viewBox="0 0 200 200"
              aria-hidden="true"
              focusable="false"
            >
              <g
                fill="#8f8468"
                fillOpacity="0.55"
                stroke="#5f563f"
                strokeWidth="0.8"
              >
                <path
                  d="M20 190C60 150 100 110 170 20"
                  fill="none"
                  strokeWidth="1.6"
                />
                <path d="M60 150c-6-26 6-44 26-52 8 24 0 44-26 52z" />
                <path d="M90 120c-2-26 14-44 36-48 4 24-8 42-36 48z" />
                <path d="M118 92c4-24 22-38 44-38-2 24-18 38-44 38z" />
                <path d="M138 62c10-20 28-28 46-24-6 20-22 28-46 24z" />
                <path d="M72 138c-24-8-36-26-34-46 24 4 36 22 34 46z" />
              </g>
            </svg>

            <div
              className="thread-envelope"
              aria-label="An envelope marked For the Person Who Finds the Thread"
            >
              <div
                className="envelope-fold envelope-fold-left"
                aria-hidden="true"
              />
              <div
                className="envelope-fold envelope-fold-right"
                aria-hidden="true"
              />
              <div
                className="envelope-flap"
                aria-hidden="true"
              />

              <div className="envelope-writing">
                For the Person
                <br />
                Who Finds the Thread
                <span
                  className="envelope-flourish"
                  aria-hidden="true"
                />
              </div>
            </div>

            <svg
              className="envelope-thread"
              viewBox="0 0 260 200"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M70 40C20 40 -6 90 30 120C70 152 150 140 190 170C206 182 214 192 224 200"
                fill="none"
                stroke="#a98b60"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </section>

        <section
          className="letter-section"
          aria-labelledby="letter-title"
        >
          <div className="letter-paper">
            <div className="letter-heading">
              <div
                className="letter-kicker"
                id="letter-title"
              >
                An unfinished investigation
                <br />
                by Lilavati
              </div>
            </div>

            <div className="letter-columns">
              <div className="letter-main">
                <p>
                  If you have found this envelope, then you are
                  about to begin a journey that took me many years
                  to complete.
                </p>

                <p>
                  I was not always interested in mathematics.
                  When I was young, I thought mathematics was mostly
                  about getting answers right. Then, one day, I came
                  across a question I could not answer.
                </p>

                <p>
                  Before long, I was following a trail that had
                  begun thousands of years before I was born. I
                  followed it through old books, strange diagrams,
                  forgotten puzzles, astronomical tables, counting
                  systems and mathematical games.
                </p>

                <p>
                  And somewhere along the way, I found something I
                  had not been looking for.
                </p>

                <p>A thread.</p>

                <p>
                  I won&rsquo;t tell you what it is. Not yet. You
                  should discover that for yourself.
                </p>

                <p>
                  But I will tell you this:{' '}
                  <strong>The thread is real.</strong>
                </p>
              </div>

              <div className="letter-clue">
                <p>
                  The first clue is hidden in the most ordinary
                  place imaginable.
                </p>

                <div className="letter-numbers">
                  Numbers.
                </div>

                <p>
                  I have left you eight small problems. You may
                  find them in the worksheets as you travel through
                  the modules.
                </p>

                <p>
                  They are not there to test whether you are good
                  at mathematics. They are there because each
                  answer contains part of the next clue.
                </p>

                <p>Solve them carefully.</p>

                <p>Do not throw away your answers.</p>

                <p>
                  And when you have all the clues, you will know
                  where to look next.
                </p>

                <p>Why? That is for you to discover.</p>

                <p className="letter-signature">
                  Lilavati
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="journey-section"
          aria-labelledby="journey-title"
        >
          <div className="journey-heading">
            <div className="journey-rule-row">
              <span
                className="journey-rule"
                aria-hidden="true"
              />
              <div className="journey-kicker">
                How the journey works
              </div>
              <span
                className="journey-rule"
                aria-hidden="true"
              />
            </div>

            <h2 id="journey-title">
              You are not simply taking a mathematics course.
              <span className="journey-subheading">
                You are following a trail.
              </span>
            </h2>
          </div>

          <div className="journey-grid">
            {journeyCards.map(
              ({ title, Icon, top, bottom }) => (
                <article
                  className="journey-card"
                  key={title}
                >
                  <div className="journey-card-art">
                    <Icon />
                  </div>

                  <h3>{title}</h3>

                  {top.map((text) => (
                    <p key={text}>{text}</p>
                  ))}

                  <div
                    className="journey-divider"
                    aria-hidden="true"
                  />

                  {bottom.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </article>
              ),
            )}
          </div>
        </section>

        <section
          className="journey-closing"
          aria-label="The trail continues"
        >
          <p>
            And then you move on. A new question. A new
            mathematical idea.
            <br />
            Another piece of history. Another puzzle. Another clue.
          </p>

          <p className="closing-final">
            You may begin with numbers. But where the trail leads...
            <br />
            you will have to find out.
          </p>
        </section>

        <section
          className="course-entry"
          id="course-entry"
          aria-labelledby="course-entry-title"
        >
          <div className="landing-kicker">
            Mathematical Threads
          </div>

          <h2 id="course-entry-title">
            Begin the thread.
          </h2>

          <div
            className="lesson-grid"
            aria-label="Mathematical Threads modules"
          >
            {lessons.map((lesson, index) => {
              const isPlaceholder =
                lesson.subtitle
                  ?.toLowerCase()
                  .includes('placeholder');

              const subtitle = isPlaceholder
                ? 'A journey from sheep and pebbles to place value and zero.'
                : lesson.subtitle;

              return (
                <article
                  className="lesson-card"
                  key={lesson.id}
                >
                  <div className="lesson-card-top">
                    <div className="lesson-number">
                      Series {String(index + 1).padStart(2, '0')}
                    </div>

                    <div
                      className="lesson-mark"
                      aria-hidden="true"
                    >
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
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}