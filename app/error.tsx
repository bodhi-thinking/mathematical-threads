"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="shell" role="alert">
      <div className="eyebrow">Mathematical Threads</div>
      <h1>Something snagged.</h1>
      <p>The page could not be displayed. You can try again.</p>
      <p>
        <button type="button" onClick={reset}>
          Try again
        </button>
      </p>
    </main>
  );
}
