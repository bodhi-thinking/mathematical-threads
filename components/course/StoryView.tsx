"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import type {
  Story,
  StoryBlock,
} from "../../lib/story-types";

type StoryViewProps = {
  story: Story;
};

const SWIPE_THRESHOLD = 55;

function clampIndex(
  index: number,
  total: number
) {
  if (total <= 0) return 0;

  return Math.max(
    0,
    Math.min(index, total - 1)
  );
}

function getImageSources(
  blocks: StoryBlock[]
) {
  return blocks
    .filter(
      (
        block
      ): block is Extract<
        StoryBlock,
        { type: "image" }
      > =>
        block.type === "image"
    )
    .map((block) => block.src);
}

function StoryImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [hasError, setHasError] =
    useState(false);

  if (hasError) {
    return (
      <div
        className="story-image-fallback"
        role="img"
        aria-label={alt}
      >
        <span>
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      onError={() =>
        setHasError(true)
      }
    />
  );
}

function StoryBeatContent({
  blocks,
}: {
  blocks: StoryBlock[];
}) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "image":
            return (
              <figure
                className="story-beat-image"
                key={`image-${index}`}
              >
                <StoryImage
                  src={block.src}
                  alt={block.alt}
                />
              </figure>
            );

          case "highlight":
            return (
              <div
                className="story-beat-highlight"
                key={`highlight-${index}`}
              >
                {block.text}
              </div>
            );

          case "question":
            return (
              <div
                className="story-beat-question"
                key={`question-${index}`}
              >
                {block.text}
              </div>
            );

          case "list":
            return (
              <ol
                className="story-beat-list"
                key={`list-${index}`}
              >
                {block.items.map(
                  (item, itemIndex) => (
                    <li
                      key={`${index}-${itemIndex}`}
                    >
                      {item}
                    </li>
                  )
                )}
              </ol>
            );

          case "text":
            return (
              <p
                className="story-beat-text"
                key={`text-${index}`}
              >
                {block.text}
              </p>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

export function StoryView({
  story,
}: StoryViewProps) {
  const beats = Array.isArray(
    story?.beats
  )
    ? story.beats
    : [];

  const total = beats.length;

  const [current, setCurrent] =
    useState(0);

  const pointerStart = useRef<{
    x: number;
    y: number;
    pointerId: number;
  } | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;

      setCurrent(
        clampIndex(index, total)
      );
    },
    [total]
  );

  const goNext = useCallback(() => {
    setCurrent((index) => clampIndex(index + 1, total));
  }, [total]);

  const goPrevious = useCallback(() => {
    setCurrent((index) => clampIndex(index - 1, total));
  }, [total]);

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      const target =
        event.target as HTMLElement | null;

      const isFormElement =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (isFormElement) return;

      if (
        event.key === "ArrowRight"
      ) {
        event.preventDefault();
        goNext();
      }

      if (
        event.key === "ArrowLeft"
      ) {
        event.preventDefault();
        goPrevious();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [goNext, goPrevious]);

  /*
   * Preload the next section's images.
   * This keeps swiping/navigation feeling immediate
   * without loading every image in the story at once.
   */
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      total === 0
    ) {
      return;
    }

    const nextBeat =
      beats[current + 1];

    if (!nextBeat) return;

    const sources =
      getImageSources(
        nextBeat.blocks
      );

    sources.forEach((src) => {
      const image =
        new window.Image();

      image.src = src;
    });
  }, [beats, current, total]);

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLElement>
  ) => {
    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    };

    try {
      event.currentTarget.setPointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer capture is optional.
    }
  };

  const handlePointerUp = (
    event: ReactPointerEvent<HTMLElement>
  ) => {
    const start =
      pointerStart.current;

    if (!start) return;

    pointerStart.current = null;

    try {
      if (
        event.currentTarget.hasPointerCapture(
          start.pointerId
        )
      ) {
        event.currentTarget.releasePointerCapture(
          start.pointerId
        );
      }
    } catch {
      // Safe fallback.
    }

    const deltaX =
      event.clientX - start.x;

    const deltaY =
      event.clientY - start.y;

    const isHorizontalSwipe =
      Math.abs(deltaX) >=
        SWIPE_THRESHOLD &&
      Math.abs(deltaX) >
        Math.abs(deltaY);

    if (!isHorizontalSwipe) {
      return;
    }

    if (deltaX < 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  const handlePointerCancel =
    () => {
      pointerStart.current = null;
    };

  if (total === 0) {
    return (
      <section
        className="story-error"
        role="status"
      >
        <div className="eyebrow">
          Mathematical Threads
        </div>

        <h1>
          Story unavailable
        </h1>

        <p>
          This lesson does not contain
          any story sections yet.
        </p>
      </section>
    );
  }

  const activeIndex =
    clampIndex(current, total);

  const activeBeat =
    beats[activeIndex];

  if (!activeBeat) {
    return (
      <section
        className="story-error"
        role="status"
      >
        <div className="eyebrow">
          Mathematical Threads
        </div>

        <h1>
          Story unavailable
        </h1>

        <p>
          This story section could not
          be loaded.
        </p>
      </section>
    );
  }

  const isFirst =
    activeIndex === 0;

  const isLast =
    activeIndex === total - 1;

  return (
    <article
      className="story-experience"
      aria-label={story.title}
    >
      <header className="story-experience-header">
        <div className="eyebrow">
          Mathematical Threads
        </div>

        <div className="story-title-group">
          <h1>{story.title}</h1>

          {story.subtitle ? (
            <p className="story-subtitle">
              {story.subtitle}
            </p>
          ) : null}

        </div>
      </header>

      <div
        className="story-stage"
        key={activeBeat.id}
        aria-live="polite"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div className="story-beat">
          <StoryBeatContent
            blocks={
              activeBeat.blocks
            }
          />
        </div>
      </div>

      <nav
        className="story-navigation"
        aria-label="Story navigation"
      >
        <div className="story-navigation-row">
          <button
            type="button"
            className="story-nav-arrow"
            onClick={goPrevious}
            disabled={isFirst}
            aria-label="Previous story section"
          >
            ←
          </button>

          <span
            className="story-counter"
            aria-live="polite"
          >
            {activeIndex + 1} / {total}
          </span>

          <button
            type="button"
            className="story-nav-arrow"
            onClick={goNext}
            disabled={isLast}
            aria-label="Next story section"
          >
            →
          </button>
        </div>

        <div className="story-dots-navigation">
          {beats.map(
            (beat, index) => (
              <button
                key={beat.id}
                type="button"
                className={
                  index === activeIndex
                    ? "story-dot story-dot-active"
                    : "story-dot"
                }
                aria-label={`Go to story section ${
                  index + 1
                }`}
                aria-current={
                  index === activeIndex
                    ? "step"
                    : undefined
                }
                onClick={() =>
                  goTo(index)
                }
              >
                <span aria-hidden="true" />
              </button>
            )
          )}
        </div>
      </nav>

      <div className="story-swipe-hint">
        {isLast
          ? "End of story"
          : "Swipe or use the arrows to continue"}
      </div>
    </article>
  );
}